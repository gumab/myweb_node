var config = require('../../config/config');
var router = require('express').Router();


// render page
router.get('/', function (req, res, next) {
  res.render('web/views/main/main.html', {
    data: {
      root: config.root
    }
  });
});

module.exports = router;