'use strict';

var User = require('../models/user');
var MyWebError = require('../lib/middlewares/error-handler').MyWebError;
var userDac = require('../dac/userDac');
var fs = require('fs');
var path = require('path');
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

  changeUserProfileImage: function (encryptedId, file, callback) {
    var self = this;
    var userId = self.decryptId(encryptedId);
    fs.readFile(file.path, function (err, data) {
      var filePath = path.join(config.imageFolder, getProfileImageName(userId, file.name));
      var reSizedData = '';
      try {
        reSizedData = require('imagemagick-native').convert({
          srcData: data,
          width: 200,
          height: 200,
          resizeStyle: 'aspectfill', // is the default, or 'aspectfit' or 'fill'
          gravity: 'Center' // optional: position crop area when using 'aspectfill'
        });
      } catch (e) {
        reSizedData = data;
      }
      fs.writeFile(filePath, reSizedData, function (err) {
        if (err) {
          callback(err);
        } else {
          var user = new User(userId, '', '', '', '', filePath);
          self.setUserProfileImagePath(user, function (err, data) {
            if (err) {
              callback(err);
            } else {
              console.log(data.originPath);
              if (data.originPath && fs.existsSync(data.originPath)) {
                fs.rename(data.originPath, path.join(config.retentionImageFolder, path.basename(data.originPath)));
              }
              callback();
            }
          });
        }
      });
    });
  },

  setUserProfileImagePath: function (user, callback) {
    var result = {originPath: ''};
    var cb = function (err, resultUser) {
      if (err) {
        callback(err);
      } else {
        if (!resultUser) {
          callback(new MyWebError('no user', '', '101'));
        } else {
          result.originPath = resultUser.local.profileImgPath;
          resultUser.local.profileImgPath = user.local.profileImgPath;
          userDac.updateUser(resultUser, function (err, data) {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
        }
      }
    };
    if (user && ((user.local && user.local.email) || user.id)) {
      if (!user.id) {
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
    var self = this;
    var defaultPath = config.root + '/client/assets/img/user2-160x160.jpg';
    var reqUser = {
      id: id
    };
    self.getUser(reqUser, function (err, user) {
      if (err) {
        callback(err);
      } else {
        if (user.local.profileImgPath && fs.existsSync(user.local.profileImgPath)) {
          callback(null, user.local.profileImgPath);
        } else {
          callback(null, defaultPath);
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


function getProfileImageName(userId, originName) {

  return userId + '_' + getNowTimeString() + '.' + getFileType(originName);
}

function getNowTimeString() {
  var now = new Date();
  var yyyy = now.getFullYear().toString();
  var mm = (now.getMonth() + 1).toString(); // getMonth() is zero-based
  var dd = now.getDate().toString();
  var hh = now.getHours().toString();
  var MM = now.getMinutes().toString();
  var ss = now.getSeconds().toString();
  var milsec = now.getMilliseconds().toString();
  return yyyy + getDigit(mm) + getDigit(dd) + getDigit(hh) + getDigit(MM) + getDigit(ss) + getDigit(milsec, 3);
}

function getDigit(input, digitNo) {
  if (digitNo && digitNo > 2) {
    return input[digitNo - 1] ? input : '0' + getDigit(input, digitNo - 1);
  } else {
    return input[1] ? input : '0' + input[0];
  }
}

function getFileType(filename) {
  var list = filename.split('.');
  return list[list.length - 1];
}

