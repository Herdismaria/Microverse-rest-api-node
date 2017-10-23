var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the title of the event',
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model('Event', EventSchema);

exports.create = function(params, callback) {
  let new_event = new Event(params);
  new_event.save(function(err, event) {
    callback(err, event);
  });
};

exports.getAllEvents = function(callback) {
  Event.find(function(err, docs) {
    callback(err, docs);
  });
};

exports.getOneEvent = function(id, callback) {
  Event.findById(id, function(err, doc) {
    callback(err, doc);
  });
};

exports.updateEvent = function(id, params, callback) {
  Event.findByIdAndUpdate(id, { $set: params }, { new: true }, function(
    err,
    event
  ) {
    callback(err, event);
  });
};

exports.deleteEvent = function(id, callback) {
  Event.findByIdAndRemove(id, function(err, result) {
    callback(err, result);
  });
};
