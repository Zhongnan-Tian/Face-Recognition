const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/api/user');

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

//User Routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
