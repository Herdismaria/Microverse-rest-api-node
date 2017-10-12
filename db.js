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

exports.get = function() {
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
