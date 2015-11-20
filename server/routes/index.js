'use strict';

module.exports = function (app) {
  app.use('/ko/page1', require('./ko/page1'));
  app.use('/ko/page2', require('./ko/page2'));

  app.use('/api', require('./api'));
};
