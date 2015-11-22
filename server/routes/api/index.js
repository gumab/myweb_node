'use strict';

var config = require('../../config/config');
var router = require('express').Router();
var userService = require('../../services/userServices');
var passport = require('passport');
var requestHelper = require('../request-helper')();
var MyWebError = require('../../lib/middlewares/error-handler').MyWebError;


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

// process the signup form
router.post('/signup', function (req, res, next) {
  var R = requestHelper(req);
  var email = req.body.email;
  var pwd = req.body.password;
  var newUser = {
    email: email,
    password: pwd
  };

  userService.selectUser(email, function (err, user) {
    if (err) {
      next(err);
    } else {
      if (user) {
        next(new MyWebError('이미 가입한 사용자입니다.', '', '103'));
      } else {
        userService.insertUser(newUser, function (err, data) {
          if (err) {
            next(err);
          } else {
            res.json(R.getJSONResponse('000', '', 'success'));
          }
        });
      }
    }
  });
});

//// process the login form
//router.post('/login', passport.authenticate('local-login',
//  function (req, res) {
//    // If this function gets called, authentication was successful.
//    // `req.user` contains the authenticated user.
//    res.redirect('/users/' + req.user.username);
//  }));

router.get('/profile', function (req, res, next) {
  res.send(JSON.stringify(req.user));
});

router.post('/login', function (req, res, next) {
  var R = requestHelper(req);
  var email = req.body.email;
  var pwd = req.body.password;

  userService.selectUser(email, function (err, user) {
    if (err) {
      next(err);
    } else {
      if (!user) {
        next(new MyWebError('no user', '', '101'));
      } else {
        if (user.validPassword(pwd)) {
          req.login(user, function (err) {
            if (err) {
              next(err);
            } else {
              console.log(res.json);
              console.log(R.getJSONResponse);
              res.json(R.getJSONResponse('000', '', 'success'));
            }
          });
        } else {
          next(new MyWebError('wrong passwd', '', '102'));
        }
      }
    }
  });
});


module.exports = router;
