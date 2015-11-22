(function (myWeb, angular) {
  'use strict';

  var app = angular.module('page2App', [
    'page2App.services',
    'page2App.controllers'
  ]);

  angular.module('page2App.services', [])
    .provider('testService', myWeb.services.TestServiceProvider);


  function Page2Ctrl(testService, $scope){
    var self = this;
    self.scope_ = $scope;
    self.testService_ = testService;
  }

  Page2Ctrl.prototype.test = function(){
    var self = this;
    var $scope = self.scope_;
    var testService = self.testService_;

    $scope.testparam2 = $scope.testparam;
    testService.test();
  };

  angular.module('page2App.controllers', [])
    .controller('Page2Ctrl', Page2Ctrl);

})(window.myWeb, window.angular);
