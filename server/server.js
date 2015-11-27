'use strict';

// get modules
var config = require('./config/config');
var express = require('express');
var app = express();


//require('./config/passport')(app);

// set express config
require('./config/express')(app);
require('./lib/middlewares/cookie-parser')(app);

// use routing rules
require('./routes')(app);

require('./lib/middlewares/error-handler')(app);


// start listening
app.listen(config.webServer.port, config.webServer.ip, function () {
  console.log('Express server listening on %s:%d', config.webServer.ip, config.webServer.port);
});
