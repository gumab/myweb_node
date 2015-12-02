'use strict';

var User = require('../models/user');
var MyWebError = require('../lib/middlewares/error-handler').MyWebError;
var userDac = require('../dac/userDac');
var crypto = require('crypto');
var config = require('../config/config');

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
  },

  encryptId: function (id) {
    return encrypt(id, config.cryptoKey);
  },

  decryptId: function (encryptedId) {
    return decrypt(encryptedId, config.cryptoKey);
  },

  getProfileImagePath: function (id, callback) {
    var defaultPath = config.root + '/client/assets/img/user3-128x128.jpg';
    var reqUser = {
      id: id
    };
    this.getUser(reqUser, function (err, user) {
      if (err) {
        callback(err);
      } else {
        callback(null, user.profileImgPath || defaultPath);
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

function encrypt(text, key) {
  /* 알고리즘과 암호화 key 값으로 셋팅된 클래스를 뱉는다 */
  var cipher = crypto.createCipher('aes-256-cbc', key);

  /* 컨텐츠를 뱉고 */
  var encipheredContent = cipher.update(text, 'utf8', 'hex');

  /* 최종 아웃풋을 hex 형태로 뱉게 한다*/
  encipheredContent += cipher.final('hex');

  return encipheredContent;
}

/*암호화나 복호화나 자세히 보면 비슷함*/
function decrypt(text, key) {

  var decipher = crypto.createDecipher('aes-256-cbc', key);

  var decipheredPlaintext = decipher.update(text, 'hex', 'utf8');

  decipheredPlaintext += decipher.final('utf8');

  return decipheredPlaintext;
}
