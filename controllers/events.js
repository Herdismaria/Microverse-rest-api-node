let express = require('express');
let router = express.Router();
const uuidv4 = require('uuid/v4');
var Events = require('../models/events');

/* GET */
router.get('/', (req, res, next) => {
  Events.getAllEvents(function(err, docs) {
    res.send(docs);
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Events.getOneEvent(id, function(err, event) {
    console.log('error', err);
    res.send(event);
  });
});

router.post('/', (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const date = req.body.date;

  Events.create(title, description, date, function(err, event) {
    res.status(201).send(event);
  });
});

router.patch('/:id', (req, res, next) => {
  let id = req.params.id;
  Events.updateEvent(id, req.body, function(event) {
    res.send(event);
  });
});

router.delete('/:id', (req, res, next) => {
  let event = events[req.params.id];
  if (!event) {
    return res.sendStatus(404);
  }

  delete events[req.params.id];
  res.send();
});

module.exports = router;
