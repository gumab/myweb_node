'use strict';

module.exports = function (app) {
  //app.use('/ko/page1', require('./page/page1'));
  //app.use('/ko/page2', require('./page/page2'));
  //app.use('/ko/login', require('./page/login'));
  app.use('/ko', require('./page'));

  app.use('/ko/api', require('./api'));
};
