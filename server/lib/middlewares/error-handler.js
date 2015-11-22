'use strict';

var util = require('util');

/**
 * @param app
 */
var errorHandler = module.exports = function (app) {
  app.use(function (err, req, res, next) {

    // ================================================================
    // 1. 에러 처리
    // ================================================================
    var isAjax = isAjaxRequest(req);

    console.log(err);
    console.log(isAjax);

    if (!err.msg) {
      err.msg = 'unknown error';
    }
    // ajax
    if (isAjax) {
      res.json(500, { result: err.code, message: err.msg, action: err.action });
    }
    // not ajax
    else {
      if (err.action === 'AlertAndRedirect') {
        alertAndRedirect(res, err.msg, err.url);
      } else {
        res.redirect(err.url);
      }
    }

  });
};


function MyWebError(message, domain, code, value) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.action = 'AlertAndRedirect';
  this.message = message || '';
  this.domain = domain || '';
  this.code = code || '-1';
  this.value = value || '';
  this.msg = message || ''; // message랑 뭐가 다르지 ?
  this.url = '/ko/error';
}
util.inherits(MyWebError, Error);
errorHandler.MyWebError = MyWebError;


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


/**
 * @private
 * @param res
 * @param msg
 * @param url
 * @description
 * alert & redirect response
 */
function alertAndRedirect(res, msg, url) {
  var template = '<script>alert($1);window.location.href=\'$2\';</script>';

  template = template.replace('$1', JSON.stringify(msg));
  template = template.replace('$2', url);

  res.send(template);
}

