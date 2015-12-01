'use strict';

var MyWebError = require('../lib/middlewares/error-handler').MyWebError;
var ndjs = require('nodejs-disks');

module.exports = {

  getDiskInfo: function (callback) {

    ndjs.drives(function (err, driveNames) {
      if (err) {
        callback(err);
      } else {
        var drives = driveNames.filter(function (value, index, arr) {
          if (value.indexOf('/dev/sd') < 0 && value.indexOf('/dev/root') < 0) {
            return false;
          } else {
            return true;
          }
        });

        ndjs.drivesDetail(drives, function (err, driveDetails) {
          if (err) {
            callback(err);
          } else {
            callback(null, driveDetails);
          }
        });
      }
    });
  }
};
