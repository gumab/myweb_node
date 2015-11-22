'use strict';

var config = require('../../config/config');
var router = require('express').Router();


// render page
router.get('/', function (req, res, next) {
  var url = req.query.url || '';
  res.render('views/ko/partials/login.html', {
    title: 'Login',
    layout: 'views/ko/index.html',
    data: { user: req.user, returnUrl: url }
  });
});

module.exports = router;
