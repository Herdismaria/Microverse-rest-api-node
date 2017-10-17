var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

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

exports.getOneEvent = function(id, callback) {
  const ref = db.get().collection('events');
  ref.find({ _id: ObjectID(id) }).toArray(function(err, doc) {
    callback(err, doc);
  });
};

exports.updateEvent = function(id, params, callback) {
    console.log(params);
    const ref = db.get().collection('events');
    ref.updateOne(
        { _id: ObjectID(id)},
        { $set: { params } }
        )
};
