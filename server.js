const express = require('express');
let bodyParser = require('body-parser');
let index = require('./controllers/index');
let events = require('./controllers/events');
let users = require('./controllers/users');
const app = express();
let mongoose = require('mongoose');
let middleware = require('./middleware/middleware');


let config = require('config');//'mongodb://localhost:27017/microverse';
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/events', events);
app.use('/users', users);
app.use('/', index);

// error middlewares
app.use(middleware.notFound);
app.use(middleware.errorHandler);

mongoose.connect(config.DBHost);
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

module.exports = app; // for testing
