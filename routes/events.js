let express = require('express');
let router = express.Router();
const uuidv4 = require('uuid/v4');
let events = require('../data')

/* GET events listing. */
router.get('/', (req, res, next) => res.send(events))

router.post('/', (req, res, next ) => {
  const id = uuidv4()
  const newEvent = {
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    id: id
  }
  events[id] = newEvent
  res.statusCode = 201
  res.send(newEvent)
})

router.get('/:id', (req, res, next) =>
{
  const event = events[req.params.id]
  if (!event) {
    return res.sendStatus(404)
  }
  res.statusCode = 200
  res.send(event)
})

router.patch('/:id', (rec, res, next) => {
  /* get the event to change */
  let event = events[rec.params.id]
  if (!event) {
    return res.sendStatus(404)
  }
  /* create a new event with the changes */
  let newEvent = {
    ...event,
    ...req.body
  }
  /* update events */
  events[rec.params.id] = newEvent
  /* send respons */
  res.statusCode = 201
  res.send(newEvent)
})

router.delete('/:id', (rec, res, next) => {
  let event = events[rec.params.id]
  if (!event) {
    return res.sendStatus(404)
  }

  delete events[rec.params.id]
  res.statusCode = 200
  res.send()
})

module.exports = router;
