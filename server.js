const express = require('express')
var bodyParser = require('body-parser');

var index = require('./routes/index');
var events = require('./routes/events');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/events', events);
app.use('/', index);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
