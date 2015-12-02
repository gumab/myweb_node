'use strict';

var configDB = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(configDB.mysql);
var User = require('../models/user');

module.exports = {

  insertUser: function (name, email, pwd, callback) {
    var newUser = {
      'user_mail': email || '',
      'user_name': name || '',
      'user_pwd': pwd || ''
    };
    connection.query('insert into users set ?', newUser, function (err, result) {
      if (err) {
        callback(err);
      } else {
        var user = new User(result.insertId, email, name, pwd);
        callback(null, user);
      }
    });
  },

  selectUser: function (email, callback) {
    connection.query('select seq,user_mail,user_name,user_pwd,reg_dt,profile_img_path from users where user_mail=' +
      mysql.escape(email), function (err, result) {
      if (err) {
        callback(err);
      } else {
        if (result && result.length > 0) {
          result = result[0];
          var user = new User(result.seq,
            result.user_mail,
            result.user_name,
            result.user_pwd,
            result.reg_dt,
            result.profile_img_path);
          callback(null, user);
        } else {
          callback(null, null);
        }
      }
    });
  },

  selectUserBySeq: function (seq, callback) {
    connection.query('select seq,user_mail,user_name,user_pwd,reg_dt,profile_img_path from users where seq=' +
      mysql.escape(seq), function (err, result) {
      if (err) {
        callback(err);
      } else {
        if (result && result.length > 0) {
          result = result[0];
          var user = new User(result.seq,
            result.user_mail,
            result.user_name,
            result.user_pwd,
            result.reg_dt,
            result.profile_img_path);
          callback(null, user);
        } else {
          callback(null, null);
        }
      }
    });
  },

  updateUser: function (user, callback) {
    var userT = {
      user_name: user.local.name,
      user_pwd: user.local.password,
      profile_img_path: user.local.profileImgPath
    };
    var data = [userT, user.id];
    connection.query('update users set ? where seq = ?', data, function (err, result) {
      if (err) {
        callback(err);
      } else {
        callback(null, user);
      }
    });
  }
};
