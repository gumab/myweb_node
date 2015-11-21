'use strict';

var config = require('../../config/config');
var router = require('express').Router();
var userService = require('../../services/userServices');
var passport = require('passport');


// render page
router.get('/login', function (req, res, next) {
  var mail = req.body.mail;
  var pwd = req.body.pwd;
});

router.get('/select', function (req, res, next) {
  var mail = req.query.mail;
  userService.selectUser(mail, function (err, data) {
    if (!err) {
      res.send(JSON.stringify(data));
    } else {
      res.send(err.toString());
    }
  });
});

router.get('/isauth', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.send('authed!!');
  } else {
    res.send('not authed!!');
  }
});

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/api/isauth');
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/ko/page1', // redirect to the secure profile section
  failureRedirect: '/ko/page2', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/ko/page1', // redirect to the secure profile section
  failureRedirect: '/ko/page2', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));


module.exports = router;
