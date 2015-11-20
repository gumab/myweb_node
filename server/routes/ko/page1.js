'use strict';

var config = require('../../config/config');
var router = require('express').Router();


// render page
router.get('/', function (req, res, next) {
  res.render('page1/index.html', {
    data: {
      root: config.root
    }
  });
});

module.exports = router;
