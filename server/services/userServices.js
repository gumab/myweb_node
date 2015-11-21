'use strict';

var configDB = require('../config/database'),
  mysql = require('mysql'),
  connection = mysql.createConnection(configDB.mysql);

module.exports = {

  insertUser: function (email, name, pwd, cCode, callback) {
    var user = {
      'user_mail': email,
      'user_name': name,
      'user_pwd': pwd,
      'c_code': cCode
    };
    var query = connection.query('insert into users set ?', user, function (err, result) {
      if (err) {
        //console.error(err);
        callback(err);
      }
      else {
        //console.log(query);
        callback(null, result);
      }
    });

  },

  selectUser: function (email, callback) {

    var query = connection.query('select user_mail,user_name,user_pwd from users where user_mail=' +
      mysql.escape(email), function (err, result) {
      if (err) {
        callback(err);
      }
      //console.log(query);
      else {
        //console.log(result);
        callback(null, result);
      }
    });
  }
};
