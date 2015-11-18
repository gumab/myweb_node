'use strict';

var config = require('../config/config');
var router = require('express').Router();
var web = require('./web');

module.exports = function (app) {

  function sendDataCallback(res, next) {
    return function (err, data) {
      if (!err) {
        res.status(200).send(data);
      } else {
        next(err);
      }
    }
  }

  // render page
  router.get('/', function (req, res, next) {
    res.send('hello');
  });

  // use router
  app.use(router);
  app.use('/web', web);
};