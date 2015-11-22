'use strict';

var config = require('../../config/config');
var router = require('express').Router();


// render page
router.get('/', function (req, res, next) {
  if(req.isAuthenticated()) {
    res.render('views/ko/page1.html', {
      data: {
        root: config.root
      }
    });
  }else{
    res.redirect('/ko/login?url=/ko/page1');
  }
});

module.exports = router;
