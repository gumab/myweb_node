'use strict';

var config = require('../../config/config');
var router = require('express').Router();


// render page
router.get('/', function (req, res, next) {
  if(req.isAuthenticated()) {
    res.render('page2/index.html', {
      data: {
        root: config.root
      }
    });
  }else{
    res.redirect('/ko/page2');
  }
});

module.exports = router;
