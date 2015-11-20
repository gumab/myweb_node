(function (myWeb, angular) {
  'use strict';

  function LoginService($http) {
    var self = this;
    self.http_ = $http;
  }

  LoginService.prototype.login = function (mail, pwd) {
    var self = this;
    var $http = self.http_;
  };

  function TestServiceProvider() {
  }

  TestServiceProvider.prototype.$get = function ($http) {
    var self = this;
    return new LoginService($http);
  };

  myWeb.services.TestServiceProvider = TestServiceProvider;
})(window.myWeb, window.angular);
