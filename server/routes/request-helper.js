'use strict';

////////////////////////////////
// Requires
////////////////////////////////


////////////////////////////////
// Exports
////////////////////////////////

module.exports = function () {
  return function (req) {
    var headers = req.headers;
    var query = req.query;
    var body = req.body;
    var params = req.params;
    var rpc = req.rpc;

    return {
      getHeader: function (key, defaultValue) {
        return parseValue(headers[key], defaultValue);
      },
      getQueryData: function (key, defaultValue) {
        return parseValue(query[key], defaultValue);
      },
      getPostData: function (key, defaultValue) {
        return parseValue(body[key], defaultValue);
      },
      getBodyData: function () {
        return body;
      },
      getParamData: function (key, defaultValue) {
        return parseValue(params[key], defaultValue);
      },
      getJSONResponse: function (result, message, data) {
        return {
          result: result,
          message: message,
          data: data
        };
      }
    };
  };
};

////////////////////////////////
// Helpers
////////////////////////////////

function parseValue(value, defaultValue) {
  var toString = {}.toString;
  if (toString.call(value) === '[object Boolean]') {
    return value;
  } else if (value === 'true' || value === 'false') {
    return value === 'true';
  } else {
    return value || (defaultValue ? defaultValue : '');
  }
}
