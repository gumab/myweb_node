'use strict';

var MyWebError = require('../lib/middlewares/error-handler').MyWebError;
var ndjs;

try {
  ndjs = require('nodejs-disks');
} catch(e) {
  ndjs = '';
}

module.exports = {

  getDiskInfo: function (callback) {
    if (ndjs) {
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
    } else {
      callback(null, []);
    }
  }
};
