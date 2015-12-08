'use strict';

var config = require('../../config/config');
var router = require('express').Router();
var userService = require('../../services/userService');
var deviceService = require('../../services/deviceService');

router.get('/', function (req, res, next) {
  res.render('views/admin/test2.html', {
    title: 'home',
    layout: 'views/admin/layouts/_nav.html',
    data: {user: req.myWeb.user}
  });
});


// render page
router.get('/login', function (req, res, next) {
  var url = req.query.url || req.headers.referer || '';
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('views/admin/login.html', {
      page: 4,
      title: 'Login',
      data: {user: req.myWeb.user, returnUrl: url}
    });
  }
});


router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/admin');
});


// render page
router.get('/signup', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('views/admin/signup.html', {
      page: 5,
      title: 'Register',
      data: {user: req.myWeb.user}
    });
  }
});

router.get('/profile', function (req, res, next) {
  res.render('views/admin/profile.html', {
    page: 2,
    title: 'Profile',
    layout: 'views/admin/layouts/_nav.html',
    data: {user: req.myWeb.user}
  });
});

router.get('/test2', function (req, res, next) {
  res.render('views/admin/test2.html', {
    page: 2,
    title: 'test2',
    layout: 'views/admin/layouts/_nav.html',
    data: {user: req.myWeb.user}
  });
});

router.get('/diskinfo', function (req, res, next) {
  deviceService.getDiskInfo(function (err, data) {
    if (err) {
      next(err);
    } else {
      res.render('views/admin/diskinfo.html', {
        page: 1,
        title: 'Disk usage info',
        layout: 'views/admin/layouts/_nav.html',
        data: {user: req.myWeb.user, disks: data}
      });
    }
  });
});


router.get('/profileimg', function (req, res, next) {
  var id = userService.decryptId(req.query.id);
  userService.getProfileImagePath(id, function (err, path) {
    if (err) {
      next(err);
    } else {
      res.sendFile(path);
    }
  });
});

router.post('/uploadprofile', function (req, res, next) {
  userService.changeUserProfileImage(req.myWeb.user.encryptedId, req.files.upload, function (err) {
    if (err) {
      next(err);
    } else {
      res.redirect('back');
    }
  });
});

module.exports = router;
