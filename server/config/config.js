'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  root: rootPath,
  webServer: {
    ip: '127.0.0.1',
    port: '8080'
  }
};
