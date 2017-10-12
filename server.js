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

const insertDocument = function(db) {
    const eventsRef = db.collection('events');
    eventsRef.insertOne(
        {title: 'Test event', description: 'Test event description', date: Date.now()}
        , function (err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Inserted 1 document into the collection 'events'");
        });
};

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  insertDocument(db);
  db.close();
});

if (!module.parent) {
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
}

module.exports = app; // for testing
