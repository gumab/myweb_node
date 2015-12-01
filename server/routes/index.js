'use strict';

module.exports = function (app) {
  //app.use('/ko/page1', require('./page/page1'));
  //app.use('/ko/page2', require('./page/page2'));
  //app.use('/ko/login', require('./page/login'));
  app.get('/', function(req,res,next){
    res.redirect('/admin');
  });

  app.use('/admin', require('./page'));

  app.use('/admin/api', require('./api'));
  app.use('/admin/api/auth', require('./api/authed'));
};
