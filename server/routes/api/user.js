const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//DB Config
const database = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '9089',
    database: 'facedetector'
  }
});

//@route  GET api/users/test
//@desc   Tests users route
//@access Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Users Works' });
});

// @route  POST api/users/login
// @desc   Login user/ Returning JWT Token
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  database
    .select('*')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      if (!data.length) {
        //console.log(data);
        errors.email = 'User not found';
        return res.status(404).json(errors);
      } else {
        bcrypt.compare(password, data[0].password).then(isMatch => {
          if (!isMatch) {
            errors.password = 'Incorrect Password';
            return res.status(400).json(errors);
          } else {
            database
              .select('*')
              .from('users')
              .where('email', '=', email)
              .then(data => {
                const payload = {
                  id: data[0].id, //this is the id from table users
                  name: data[0].name,
                  email: data[0].email,
                  records: data[0].records
                };

                //Sign Token
                jwt.sign(
                  payload, //the id from table users is signed to jwt token
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    });
                  }
                );
              });
          }
        });
      }
    });
});

//@route  GET api/users/register
//@desc   Register user
//@access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  database
    .select('email')
    .from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      if (data.length) {
        // note: data is an array
        //console.log('data:' + data);
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const { name, email, password } = req.body;
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            database.transaction(trx => {
              trx
                .insert({
                  password: hash,
                  email: email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                  return trx('users')
                    .returning('*')
                    .insert({
                      email: loginEmail[0],
                      name: name,
                      joined: new Date()
                    })
                    .then(user => {
                      res.json(user[0]);
                    });
                })
                .then(trx.commit)
                .catch(trx.rollback);
            });
          });
        });
      }
    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      records: req.user.records
    });
  }
);

router.put(
  '/current/increase',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = {};
    const { id } = req.body;
    database
      .select('*')
      .from('users')
      .where('id', '=', id)
      .increment('records', 1)
      .returning('*')
      .then(user => {
        res.json(user[0]);
      })
      .catch(err => {
        errors.records = 'Not Found';
        return res.status(404).json(errors);
      });
  }
);

module.exports = router;
