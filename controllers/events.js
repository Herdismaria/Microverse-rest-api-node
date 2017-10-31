let express = require('express');
let router = express.Router();
var Events = require('../models/events');

/* GET */
router.get('/', (req, res, next) => {
  Events.getAllEvents(function(err, docs) {
    res.send(docs);
  });
});

router.get('/search', (req, res, next) => {
  let title = req.query.title;
  Events.findByTitle(title, function(err, docs) {
    res.send(docs);
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Events.getOneEvent(id, function(err, event) {
    if (!event) {
      res.statusCode = 404;
      res.send(err);
    }
    res.send(event);
  });
});

router.post('/', (req, res, next) => {
  Events.create(req.body, function(err, event) {
    res.status(201).send(event);
  });
});

router.patch('/:id', (req, res, next) => {
  let id = req.params.id;
  Events.updateEvent(id, req.body, function(err, event) {
    if (!event) {
      res.statusCode = 404;
      res.send(err);
    } else {
      res.send(event);
    }
  });
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Events.deleteEvent(id, function(err, result) {
    if (!result) {
      res.statusCode = 404;
      res.send(err);
    }
    res.send();
  });
});

module.exports = router;
