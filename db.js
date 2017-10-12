var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
// Connection URL

var state = {
  db: null,
};
// Use connect method to connect to the server
exports.connectToDb = function(url, done) {
  if (state.db) {
    return done();
  }

  MongoClient.connect(url, function(err, db) {
    if (err) {
      return done(err);
    }
    state.db = db;
    assert.equal(null, err);
    console.log('Connected successfully to server');
    done();
  });
};

exports.dbRef = function() {
  return state.db;
};

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};

exports.insertDocument = function(db) {
  const eventsRef = db.collection('events');
  eventsRef.insertOne({
    title: 'Test event',
    description: 'Test event description',
    date: Date.now(),
  });
};

exports.getDocuments = function() {
  const eventsRef = state.db.collection('events');
  eventsRef.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log('Found the following records');
    console.log(docs);
  });
};
