let express = require('express');
let router = express.Router();
var Events = require('../models/events');

/* get all events */
router.get('/', (req, res, next) => {
  Events.getAllEvents((err, docs) => {
    res.send(docs);
  });
});

/* search events */
router.get('/search', (req, res, next) => {
  let title = req.query.title;
  Events.findByTitle(title, (err, docs) => {
    res.send(docs);
  });
});

/* get one specific event */
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Events.getOneEvent(id, (err, event) => {
    if (!event) {
      res.statusCode = 404;
      res.send(err);
    }
    res.send(event);
  });
});

/* create an event */
router.post('/', (req, res, next) => {
  Events.create(req.body, (err, event) => {
    res.status(201).send(event);
  });
});

/* update an event */
router.patch('/:id', (req, res, next) => {
  let id = req.params.id;
  Events.updateEvent(id, req.body, (err, event) => {
    if (!event) {
      res.statusCode = 404;
      res.send(err);
    } else {
      res.send(event);
    }
  });
});

/* delete one event */
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Events.deleteEvent(id, (err, result) => {
    if (!result) {
      res.statusCode = 404;
      res.send(err);
    }
    res.send();
  });
});

module.exports = router;
