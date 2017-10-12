const express = require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var events = require('./routes/events');
var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/microverse';
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/events', events);
app.use('/', index);

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  const eventsRef = db.collection('events');
  db.close();
});

if (!module.parent) {
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
}

module.exports = app; // for testing
