'use strict';

var userService = require('../../services/userService');
var allowAnonymousUrl = [
  '/api/', '/login', '/signup', '/yeojoon', '/IMG_3137.jpg', '/test', 'loading.gif', '/'
];
var authUrl = [
  '/api/auth/', '/admin'
];

module.exports = function (app) {
  // 기본적인 쿠키 파싱
  // => 쿠키 없으면 pass
  // => static contents는 쿠키 파싱 안 함
  app.use(function (req, res, next) {
    req.myWeb = req.myWeb || {};
    //req.myWeb.cookies = req.myWeb.cookies || {};
    //console.log(req);
    var isAjax = isAjaxRequest(req);

    var targetUrl = req.url.toString();

    if (isAuthNeeded(targetUrl)) {
      if (!req.isAuthenticated()) {
        if (isAjax) {
          return res.send('error!! you need to login');
        } else {
          return res.redirect('/admin/login?url=' + targetUrl || '');
        }
      }
    }

    if (req.isAuthenticated()) {
      var encryptedId = userService.encryptId(req.user.id.toString());
      req.myWeb.isLogOn = true;
      req.myWeb.user = {
        encryptedId: encryptedId,
        profileUrl: '/admin/profileimg?id=' + encryptedId,
        email: req.user.local.email,
        name: req.user.local.name,
        registerDate: req.user.local.registerDate
      };
    } else {
      req.myWeb.isLogOn = false;
    }

    next();
  });
};


/**
 * @private
 * @param request
 * @returns {Boolean}
 * @description
 * ajax request 여부
 */
function isAjaxRequest(request) {
  if (request && request.headers['content-type']) {
    return (request.headers['content-type'].match('json') || '').length > 0;
  } else if (request && request.headers['accept']) {
    return (request.headers['accept'].match('json') || '').length > 0;
  } else {
    return false;
  }
}


function isAuthNeeded(url) {
  var targetUrl = url.split('?')[0];
  var result = true;
  var i = 0;
  for (i = 0; i < allowAnonymousUrl.length; i++) {
    if (targetUrl.indexOf(allowAnonymousUrl[i]) >= 0) {
      result = false;
    }
  }
  for (i = 0; i < authUrl.length; i++) {
    if (targetUrl.indexOf(authUrl[i]) >= 0) {
      result = true;
    }
  }
  return result;
}
