'use strict';

var configDB = require('../config/database'),
  mysql = require('mysql'),
  connection = mysql.createConnection(configDB.mysql),
  User = require('../models/user');
var MyWebError = require('../lib/middlewares/error-handler').MyWebError;

module.exports = {

  insertUser: function (user, callback) {
    if (!validateUser(user)) {
      return callback(new MyWebError('user validation failed', '', '201'));
    }
    var newUser = {
      'user_mail': user.email || '',
      'user_name': user.name || '',
      'user_pwd': user.password || ''
    };
    var query = connection.query('insert into users set ?', newUser, function (err, result) {
      if (err) {
        //console.error(err);
        callback(err);
      }
      else {
        //console.log(query);
        user.id = result.insertId;
        callback(null, user);
      }
    });

  },

  selectUser: function (email, callback) {

    var query = connection.query('select seq,user_mail,user_name,user_pwd from users where user_mail=' +
      mysql.escape(email), function (err, result) {
      if (err) {
        callback(err);
      }
      //console.log(query);
      else {
        if (result && result.length > 0) {
          result = result[0];
          var user = new User(result.seq, result.user_mail, result.user_name, result.user_pwd);
          callback(null, user);
        } else {
          callback(null, null);
        }
      }
    });
  },

  selectUserBySeq: function (seq, callback) {
    var query = connection.query('select seq,user_mail,user_name,user_pwd from users where seq=' +
      mysql.escape(seq), function (err, result) {
      if (err) {
        callback(err);
      }
      //console.log(query);
      else {
        //console.log(result);

        if (result && result.length > 0) {
          result = result[0];
          var user = new User(result.seq, result.user_mail, result.user_name, result.user_pwd);
          callback(null, user);
        } else {
          callback(null, null);
        }
      }
    });
  }
};

function validateUser(user) {
  var result = false;
  if (user) {
    if (user.email && user.email.length >= 3) {
      if (user.password && user.password.length >= 3) {
        result = true;
      }
    }
  }
  return result;
}
