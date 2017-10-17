let express = require('express');
let router = express.Router();
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
  Events.create(req.body, function(err, event) {
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
    let id = req.params.id;
    Events.deleteEvent(id, function(err, result) {
        console.log('error', err);
        res.send();
    });
});

module.exports = router;
