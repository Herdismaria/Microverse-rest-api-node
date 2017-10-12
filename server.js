const express = require('express');
var bodyParser = require('body-parser');
var index = require('./controllers/index');
var events = require('./controllers/events');
var db = require('./db');
const app = express();

var url = 'mongodb://localhost:27017/microverse';
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/events', events);
app.use('/', index);

db.connectToDb(url, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    if (!module.parent) {
      app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
      });
    }
  }
});

module.exports = app; // for testing
