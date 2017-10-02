let express = require('express');
let router = express.Router();
const uuidv4 = require('uuid/v4');
let events = require('../data');

/* GET */
router.get('/', (req, res, next) => res.send(events));

router.get('/:id', (req, res, next) => {
  let event = events[req.params.id];
  if (!event) {
    return res.sendStatus(404);
  }
  res.send(event);
});

router.post('/', (req, res, next) => {
  const id = uuidv4();
  let newEvent = {
    id,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
  };

  events[id] = newEvent;
  res.status(201).send(newEvent);
});

router.patch('/:id', (req, res, next) => {
  let event = events[req.params.id];
  if (!event) {
    return res.sendStatus(404);
  }

  let modEvent = {
    id: event.id,
    title: req.body.title ? req.body.title : event.title,
    description: req.body.description
      ? req.body.description
      : event.description,
    date: req.body.date ? req.body.date : event.date,
  };

  events[req.params.id] = modEvent;
  res.send(modEvent);
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
