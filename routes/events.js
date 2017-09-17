let express = require('express');
let router = express.Router();
let events = require('../data')

/* GET events listing. */
router.get('/', (req, res, next) => res.send(events))

router.post('/', (req, res, next ) => {
  res.send(req.body)
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
