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
        err.status = 409;
        err.message = 'The username or email already exists';
        next(err);
      }
      if (err.name === 'ValidationError') {
        err.status = 400;
        next(err);
      }
      next(err);
    }
    else {
      res.status(201).send(user);
    }
  });
});

module.exports = router;
