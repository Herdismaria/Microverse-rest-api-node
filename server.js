const express = require('express');
var bodyParser = require('body-parser');
var index = require('./controllers/index');
var events = require('./controllers/events');
var users = require('./controllers/users');
const app = express();
var mongoose = require('mongoose');

let config = require('config');//'mongodb://localhost:27017/microverse';
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/events', events);
app.use('/users', users);
app.use('/', index);


mongoose.connect(config.DBHost);
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

module.exports = app; // for testing
