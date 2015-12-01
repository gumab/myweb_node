'use strict';

var config = require('../../config/config');
var router = require('express').Router();

router.get('/', function (req, res, next) {
  res.render('views/admin/test2.html', {
    title: 'home',
    layout: 'views/admin/layouts/_nav.html',
    data: { user: req.myWeb.user }
  });
});


// render page
router.get('/login', function (req, res, next) {
  var url = req.query.url || req.headers.referer || '';
  res.render('views/admin/login.html', {
    page: 4,
    title: 'Login',
    data: { user: req.myWeb.user, returnUrl: url }
  });
});


router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/admin');
});


// render page
router.get('/signup', function (req, res, next) {
  res.render('views/admin/signup.html', {
    page: 5,
    title: 'Register',
    data: { user: req.myWeb.user }
  });
});

// render page
router.get('/page1', function (req, res, next) {
  res.render('views/admin/partials/page1.html', {
    page: 2,
    title: 'Page1',
    layout: 'views/admin/index.html',
    data: { user: req.myWeb.user }
  });
});

router.get('/page2', function (req, res, next) {
  res.render('views/admin/partials/page2.html', {
    page: 3,
    title: 'Page2',
    layout: 'views/admin/index.html',
    data: { user: req.myWeb.user }
  });
});

router.get('/test2', function (req, res, next) {
  res.render('views/admin/test2.html', {
    title: 'test2',
    layout: 'views/admin/layouts/_nav.html',
    data: { user: req.myWeb.user }
  });
});

module.exports = router;
