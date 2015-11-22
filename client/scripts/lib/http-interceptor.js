(function (angular) {
  'use strict';

  /**
   * @namespace Order.httpInterceptor
   */
  angular
    .module('loginApp.lib.httpInterceptor', [])
    .factory('httpInterceptor', function ($q, $window) {
      return {
        request: function (config) {
          // cache only GET method
          // do not cache when cache option is set
          if (config.method === 'GET' && !config.cache && !/html$/.test(config.url)) {
            var separator = config.url.indexOf('?') === -1 ? '?' : '&';
            config.url = config.url + separator + 'nocache=' + new Date().getTime();
          }
          return config;
        },
        responseError: function (rejection) {
          if(rejection.status) {
            var error = rejection.data || {};
            if (error.action === 'Alert') {
              $window.alert(error.message);
            }
          }
          return $q.reject(rejection);
        }
      };
    });

})(window.angular);
