const express = require('express')

var index = require('./routes/index');
var events = require('./routes/events');

const app = express()

app.use('/events', events);
app.use('/', index);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
