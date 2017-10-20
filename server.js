const express = require('express');
var bodyParser = require('body-parser');
var index = require('./controllers/index');
var events = require('./controllers/events');
const app = express();
var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/microverse';
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/events', events);
app.use('/', index);

mongoose.connect(url);
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

module.exports = app; // for testing
