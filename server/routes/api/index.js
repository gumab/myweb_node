'use strict';

var config = require('../../config/config');
var router = require('express').Router();
var userService = require('../../services/userServices');
var requestHelper = require('../request-helper')();


router.get('/isauth', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.send('authed!!');
  } else {
    res.send('not authed!!');
  }
});

// process the signup form
router.post('/signup', function (req, res, next) {
  var R = requestHelper(req);
  var name = req.body.name;
  var email = req.body.email;
  var pwd = req.body.password;

  var newUser = {
    name: name,
    email: email,
    password: pwd
  };

  userService.signUp(newUser, function (err) {
    if (err) {
      next(err);
    } else {
      res.json(R.getJSONResponse('000', '', 'success'));
    }
  });
});


router.get('/profile', function (req, res, next) {
  res.send(JSON.stringify(req.user));
});

router.post('/login', function (req, res, next) {
  var R = requestHelper(req);
  var email = req.body.email;
  var pwd = req.body.password;

  userService.loginCheck(email, pwd, function (err, user) {
    if (!err) {
      req.login(user, function (loginErr) {
        if (loginErr) {
          next(loginErr);
        } else {
          res.json(R.getJSONResponse('000', '', 'success'));
        }
      });
    } else {
      next(err);
    }
  });
});


module.exports = router;
