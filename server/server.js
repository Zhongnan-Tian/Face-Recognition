const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/api/user');
const image = require('./routes/api/image');

const app = express();

app.use(cors());

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//DB Config
//  const db = require('knex')({
//   client: 'pg',
//   connection: {
//     host: '127.0.0.1',
//     user: 'postgres',
//     password: '9089',
//     database: 'facedetector'
//   }
// });

//user Routes
app.use('/api/users', users);
//image Routes
app.use('/api/image', image);

app.get('/', (req, res) => {
  res.json({ msg: 'This is homepage.' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
