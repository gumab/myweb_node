'use strict';

var config = require('../../config/config');
var router = require('express').Router();
var requestHelper = require('../request-helper')();
var ndjs = require('nodejs-disks');


router.get('/profile', function (req, res, next) {
  res.send(JSON.stringify(req.user));
});

router.get('/diskInfo', function (req, res, next) {
  var R = requestHelper(req);

  ndjs.drives(function (err, driveNames) {
    var drives = driveNames.filter(function (value, index, arr) {
      if (value.indexOf('/dev/sd') < 0 && value.indexOf('/dev/root') < 0) {
        return false;
      } else {
        return true;
      }
    });

    ndjs.drivesDetail(drives, function (err, driveDetails) {
      if (err) {
        next(err);
      } else {
        res.json(R.getJSONResponse('000', '', driveDetails))
      }
    });
  });
});


module.exports = router;
