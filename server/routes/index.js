'use strict';

module.exports = function (app) {
  //app.use('/ko/page1', require('./page/page1'));
  //app.use('/ko/page2', require('./page/page2'));
  //app.use('/ko/login', require('./page/login'));
  app.get('/', function (req, res, next) {
    res.redirect('/test');
  });

  app.get('/yeojoon', function (req, res, next) {
    res.render('views/admin/test3.html', {
      title: '여준의 나이',
      data: { user: {} }
    });
  });

  app.get('/test', function (req, res, next) {
    res.render('views/admin/test4_1.html', {
      title: 'TEST page',
      data: { user: {} }
    });
  });

  app.get('/test4', function (req, res, next) {
    res.render('views/admin/test4_1.html', {
      title: 'TEST page',
      data: { user: {} }
    });
  });

  app.get('/test4_2', function (req, res, next) {
    res.render('views/admin/test4_2.html', {
      title: 'TEST page',
      data: { user: {} }
    });
  });

  app.get('/test4_3', function (req, res, next) {
    res.render('views/admin/test4_3.html', {
      title: 'TEST page',
      data: { user: {} }
    });
  });

  app.get('/test5', function (req, res, next) {
    res.render('views/admin/test5.html', {
      title: 'TEST page',
      data: { user: {} }
    });
  });

  app.get('/test5_1', function (req, res, next) {
    var addr = req.query.addr;
    res.render('views/admin/test5_1.html', {
      title: 'TEST page',
      data: { user: {}, addr: addr || '' }
    });
  });

  app.get('/test5_2', function (req, res, next) {
    var addr = {
      postcode: req.query.postcode,
      address: req.query.address,
      details: req.query.details,
      extra_info: req.query.extra_info
    };
    res.render('views/admin/test5_2.html', {
      title: 'TEST page',
      data: { user: {}, addrInfo: addr || '' }
    });
  });

  app.get('/test6', function (req, res, next) {
    var addr = {
      postcode: req.query.postcode,
      address: req.query.address,
      details: req.query.details,
      extra_info: req.query.extra_info,
      ship_name: req.query.ship_name
    };
    res.render('views/admin/test6.html', {
      title: 'TEST page',
      data: { user: {}, addrInfo: addr || '' }
    });
  });

  app.use('/admin', require('./page'));

  app.use('/admin/api', require('./api'));
  app.use('/admin/api/auth', require('./api/authed'));
};
