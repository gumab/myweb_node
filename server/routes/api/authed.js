'use strict';

var config = require('../../config/config');
var router = require('express').Router();
var requestHelper = require('../request-helper')();
var storage = require('storage-device-info');


router.get('/profile', function (req, res, next) {
  res.send(JSON.stringify(req.user));
});

router.get('/diskInfo', function (req, res, next) {
  var R = requestHelper(req);
  var path = req.query.path || '/';
  storage.getPartitionSpace(path, function (error, space) {
    if (error) {
      next(error);
    } else {
      res.json(R.getJSONResponse('000', '', space));
    }
  });
});


module.exports = router;
