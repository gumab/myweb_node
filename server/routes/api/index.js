'use strict';

var config = require('../../config/config');
var router = require('express').Router();


// render page
router.get('/login', function (req, res, next) {
  var mail = req.body.mail;
  var pwd = req.body.pwd;

});

module.exports = router;
