(function (myWeb, angular) {
  'use strict';

  var app = angular.module('loginApp', [
    'loginApp.services',
    'loginApp.controllers',
    'ngRoute',
    'ngCookies'
  ]);

  angular.module('loginApp.services', [])
    .provider('loginService', myWeb.services.LoginServiceProvider);


  function LoginCtrl(loginService, $scope){
    var self = this;
    self.scope_ = $scope;
    self.loginService_ = loginService;
  }

  LoginCtrl.prototype.login = function(){
    var self = this;
    var $scope = self.scope_;
    var testService = self.testService_;

    $scope.testparam2 = $scope.testparam;
    testService.test();
  };

  angular.module('loginApp.controllers', [])
    .controller('LoginCtrl', LoginCtrl);

})(window.myWeb, window.angular);
