let express = require('express');
let router = express.Router();
let events = require('../data')

/* GET */
router.get('/', (req, res, next) => res.send(events))

module.exports = router;
