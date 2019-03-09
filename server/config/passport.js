const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');

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

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      database
        .select('*')
        .from('users') // the id in jwt token is from table users, so we should fetch data from users here!
        .where('id', '=', jwt_payload.id)
        .then(data => {
          if (data.length > 0) {
            return done(null, data[0]);
          } else {
            return done(null, false);
          }
        });
    })
  );
};
