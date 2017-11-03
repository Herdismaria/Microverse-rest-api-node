let express = require('express');
let router = express.Router();
var Events = require('../models/events');

/* get all events */
router.get('/', (req, res, next) => {
  Events.getAllEvents((err, docs) => {
    if(err) {
      next(err);
    } else if (!docs) {
      next();
    } else {
      res.send(docs);
    }
  });
});

/* search events */
router.get('/search', (req, res, next) => {
  let title = req.query.title;
  Events.findByTitle(title, (err, docs) => {
    if(err) {
      err.status = 404;
      next(err);
    } else if(!docs) {
      next();
    } else {
      res.send(docs);
    }
  });
});

/* get one specific event */
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Events.getOneEvent(id, (err, event) => {
    if(err) {
      next(err);
    } else if (!event) {
      next();
    } else {
      res.send(event);
    }
  });
});

/* create an event */
router.post('/', (req, res, next) => {
  Events.create(req.body, (err, event) => {
    if(err) {
      next(err);
    } else if(!event) {
      next();
    } else {
      res.status(201).send(event);
    }
  });
});

/* update an event */
router.patch('/:id', (req, res, next) => {
  let id = req.params.id;
  Events.updateEvent(id, req.body, (err, event) => {
    if(err) {
      next(err);
    } else if (!event) {
      next();
    } else {
      res.send(event);
    }
  });
});

/* delete one event */
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Events.deleteEvent(id, (err, result) => {
    if(err) {
      next(err);
    } else if (!result) {
      next();
    } else {
      res.send();
    }
  });
});

module.exports = router;
