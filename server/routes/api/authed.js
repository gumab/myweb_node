'use strict';

var config = require('../../config/config');
var router = require('express').Router();
var requestHelper = require('../request-helper')();
var deviceService = require('../../services/deviceService');


router.get('/profile', function (req, res, next) {
  res.send(JSON.stringify(req.user));
});

router.get('/diskInfo', function (req, res, next) {
  var R = requestHelper(req);
  deviceService.getDiskInfo(function(err,data){
    if (err) {
      next(err);
    } else {
      res.json(R.getJSONResponse('000', '', data));
    }
  });
});


module.exports = router;
