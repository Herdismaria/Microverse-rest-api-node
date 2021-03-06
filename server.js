const express = require('express');
let bodyParser = require('body-parser');
let index = require('./controllers/index');
let events = require('./controllers/events');
let users = require('./controllers/users');
const app = express();
let mongoose = require('mongoose');
let middleware = require('./middleware/middleware');
let passport = require('passport');
let BasicStrategy = require('passport-http').BasicStrategy;
let User = mongoose.model('User');
let bcrypt = require('bcrypt');

let config = require('config'); //'mongodb://localhost:27017/microverse';
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/events', events);
app.use('/users', users);
app.use('/', index);

passport.use(
  new BasicStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      /* compare hashed password */
      let passwordCheck = async () => {
        return await user.comparePassword(password);
      };
      if (!passwordCheck) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  })
);

// error middlewares
app.use(middleware.notFound);
app.use(middleware.errorHandler);

mongoose.connect(config.DBHost);
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

module.exports = app; // for testing
