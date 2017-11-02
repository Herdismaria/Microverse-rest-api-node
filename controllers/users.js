let express = require('express');
let router = express.Router();
var Users = require('../models/users');

router.get('/', (req, res, next) => {
  Users.getUsers((err, users) => {
    res.send(users);
  });
});

router.post('/', (req, res, next) => {
  Users.create(req.body, (err, user) => {
    if(err) {
      if (err.code === 11000) {
        res.status(409).send({'errors': {'message': 'The username or email already exists'}});
      }
      if (err.name === 'ValidationError') {
        res.status(400).send(err)
      }
      res.status(500).send(err);
    }
    res.status(201).send(user);
  });
});

module.exports = router;
