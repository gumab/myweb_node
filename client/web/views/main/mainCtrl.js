
// angular controller.
// bind model <-> html
app.controller('WebCtrl', function ($scope, webService) {
  var self = this;

  this.test = function () {
    console.log($scope.testparam);
    $scope.testparam2 = $scope.testparam;
    webService.test();
  };
});


// angular config.
// initialize app when rendering page
app.config(function (webServiceProvider) {
  webServiceProvider.init('initValue');
});