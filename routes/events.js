let express = require('express');
let router = express.Router();
const uuidv4 = require('uuid/v4');
let events = require('../data')

/* GET events listing. */
router.get('/', (req, res, next) => res.send(events))

router.post('/', (req, res, next ) => {
  const id = uuidv4()
  console.log(req)
  const newEvent = {
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    id: id
  }
  events[id] = newEvent

  res.send(newEvent)
})

router.get('/:id', (req, res, next) =>
{
  const event = events[req.params.id]
  if (!event) {
    return res.sendStatus(404)
  }
  res.send(event)
})

module.exports = router;
