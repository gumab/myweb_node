'use strict';

var locDac = require('../dac/locDac');
var config = require('../config/config');

module.exports = {
  updateLocation: function (lat, lng, callback) {
    locDac.insertLocation(lat,lng, function (insertErr, data) {
      if (insertErr) {
        callback(insertErr);
      } else {
        callback(null, 'success');
      }
    });
  }
};


