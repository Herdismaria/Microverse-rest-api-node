var db = require('../db');
var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema = new Schema({
    title: {
        type: String,
        required: 'Kindly enter the title of the event'
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('Event', EventSchema);

exports.create = function(params, callback) {
  let new_event = new Event(params);
  new_event.save(function(err, event) {
    console.log(err);
    console.log(event);
    callback(err, event);
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
  const ref = db.get().collection('events');
  ref
    .findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: params },
      { returnOriginal: false },
    )
    .then(doc => callback(doc.value));
};

exports.deleteEvent = function (id, callback) {
    const ref = db.get().collection('events');
    ref.deleteOne({_id: ObjectID(id)}, function(err, result) {
      callback(err, result)
    })
};
