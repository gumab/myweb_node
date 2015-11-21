'use strict';

var config = require('../../config/config');
var router = require('express').Router();
var userService = require('../../services/userServices');


// render page
router.post('/login', function (req, res, next) {
  var mail = req.body.mail;
  var pwd = req.body.pwd;

});

router.get('/select', function (req, res, next) {
  var mail = req.query.mail;
  userService.selectUser(mail, function (err, data) {
    if (!err) {
      res.send(data.toString());
    } else {
      res.send(err.toString());
    }
  });
});

module.exports = router;
