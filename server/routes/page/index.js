'use strict';

var config = require('../../config/config');
var router = require('express').Router();


// render page
router.get('/login', function (req, res, next) {
  var url = req.query.url || '';
  res.render('views/ko/partials/login.html', {
    page: 4,
    title: 'Login',
    layout: 'views/ko/index.html',
    data: {user: req.user, returnUrl: url}
  });
});


router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/ko/page1');
});


// render page
router.get('/signup', function (req, res, next) {
  res.render('views/ko/partials/signup.html', {
    page: 5,
    title: 'Register',
    layout: 'views/ko/index.html',
    data: {user: req.user}
  });
});

// render page
router.get('/page1', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('views/ko/partials/page1.html', {
      page: 2,
      title: 'Page1',
      layout: 'views/ko/index.html',
      data: {user: req.user}
    });
  } else {
    res.redirect('/ko/login?url=/ko/page1');
  }
});

router.get('/page2', function (req, res, next) {
  res.render('views/ko/partials/page2.html', {
    page: 3,
    title: 'Page2',
    layout: 'views/ko/index.html',
    data: {user: req.user}
  });
});

router.get('/test', function (req, res, next) {
  res.render('views/ko/test.html');
});

module.exports = router;
