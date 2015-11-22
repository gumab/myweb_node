(function (myWeb, angular) {
  'use strict';

  var app = angular.module('page1App', [
    'page1App.services',
    'page1App.controllers'
  ]);

  angular.module('page1App.services', [])
    .provider('testService', myWeb.services.TestServiceProvider);


  function Page1Ctrl(testService, $scope){
    var self = this;
    self.scope_ = $scope;
    self.testService_ = testService;
  }

  Page1Ctrl.prototype.test = function(){
    var self = this;
    var $scope = self.scope_;
    var testService = self.testService_;

    $scope.testparam2 = $scope.testparam;
    testService.test();
  };

  angular.module('page1App.controllers', [])
    .controller('Page1Ctrl', Page1Ctrl);

})(window.myWeb, window.angular);
