var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => res.send('Hello World!'))

router.post('/', (req, res, next) => res.send('post request'))

module.exports = router;
