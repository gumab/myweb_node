'use strict';

var configDB = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(configDB.mysql);

module.exports = {
  insertLocation: function (lat, lng, callback) {
    var newRow = {
      'latitude': lat || '',
      'longitude': lng || ''
    };
    connection.query('insert into location set ?', newRow, function (err, result) {
      if (err) {
        callback(err);
      } else {
        callback(null, 'success');
      }
    });
  }
};
