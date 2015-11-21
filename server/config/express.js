'use strict';

var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  path = require('path'),
  config = require('./config'),
  session= require('express-session'),
  passport = require('passport'),
  flash = require('connect-flash');

// Express configuration
module.exports = function (app) {
  var env = process.env.NODE_ENV;

  // Common configuration
  //app.disable('x-powered-by');
  app.use(express.static(path.join(config.root, 'client')));
  app.set('views', path.join(config.root, 'client'));

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  //require('./passport')(passport);

  app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash());
};
