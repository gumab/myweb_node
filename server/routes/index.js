'use strict';

module.exports = function (app) {
  app.use('/ko/page1', require('./ko/page1'));
};
