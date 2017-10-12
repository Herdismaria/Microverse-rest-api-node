var db = require('../db');

exports.create = function(title, description, date, callback) {
  const ref = db.get().collection('events');
  let event = {
    title,
    description,
    date,
  };
  ref.insertOne(event, function(err, event) {
    callback(err, event.ops);
  });
};

exports.getAllEvents = function(callback) {
  const ref = db.get().collection('events');

  ref.find({}).toArray(function(err, docs) {
    callback(err, docs);
  });
};
