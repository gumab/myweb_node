'use strict';

var config = require('../../config/config');
var router = require('express').Router();


router.get('/profile', function (req, res, next) {
  res.send(JSON.stringify(req.user));
});



module.exports = router;
