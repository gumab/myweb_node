'use strict';

var User = require('../models/user');
var MyWebError = require('../lib/middlewares/error-handler').MyWebError;
var userDac = require('../dac/userDac');

module.exports = {
  getUser: function (user, callback) {
    var cb = function (err, user) {
      if (err) {
        callback(err);
      } else {
        if (!user) {
          callback(new MyWebError('no user', '', '101'));
        } else {
          callback(null, user);
        }
      }
    };
    if (user && ((user.local && user.local.email) || user.id)) {
      if (user.local && user.local.email) {
        userDac.selectUser(user.local.email, cb);
      } else {
        userDac.selectUserBySeq(user.id, cb);
      }
    } else {
      callback(new MyWebError('user validation failed', '', '201'));
    }
  },

  loginCheck: function (email, pwd, callback) {
    userDac.selectUser(email, function (err, user) {
      if (err) {
        callback(err);
      } else {
        if (!user) {
          callback(new MyWebError('no user', '', '101'));
        } else {
          if (user.validPassword(pwd)) {
            callback(null, user);
          } else {
            callback(new MyWebError('wrong passwd', '', '102'));
          }
        }
      }
    });
  },

  signUp: function (newUser, callback) {
    userDac.selectUser(newUser.email, function (selectErr, user) {
      if (selectErr) {
        callback(selectErr);
      } else {
        if (user) {
          callback(new MyWebError('이미 가입한 사용자입니다.', '', '103'));
        } else {
          if (!validateUser(newUser)) {
            return callback(new MyWebError('user validation failed', '', '201'));
          }
          var pwd = new User().generateHash(newUser.password) || '';
          userDac.insertUser(newUser.name, newUser.email, pwd, function (insertErr, data) {
            if (insertErr) {
              callback(insertErr);
            } else {
              callback(null, 'success');
            }
          });
        }
      }
    });
  }
};

function validateUser(user) {
  var result = false;
  if (user) {
    if (user.name && user.name.length >= 3) {
      if (user.email && user.email.length >= 3) {
        if (user.password && user.password.length >= 3) {
          result = true;
        }
      }
    }
  }
  return result;
}
