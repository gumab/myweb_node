'use strict';

module.exports = function (app) {
  //app.use('/ko/page1', require('./page/page1'));
  //app.use('/ko/page2', require('./page/page2'));
  //app.use('/ko/login', require('./page/login'));
  app.get('/', function (req, res, next) {
    res.redirect('/admin');
  });

  app.get('/yeojoon', function(req,res,next){
    res.render('views/admin/test3.html',{
      title:'여준의 나이',
      data:{user:{}}
    });
  });

  app.get('/test', function(req,res,next){
    res.render('views/admin/test4.html',{
      title:'TEST page',
      data:{user:{}}
    });
  });

  app.use('/admin', require('./page'));

  app.use('/admin/api', require('./api'));
  app.use('/admin/api/auth', require('./api/authed'));
};
