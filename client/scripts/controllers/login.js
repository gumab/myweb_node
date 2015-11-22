(function (myWeb, angular) {
  'use strict';

  var app = angular.module('loginApp', [
    'loginApp.services',
    'loginApp.controllers'
  ]);

  angular.module('loginApp.services', [])
    .provider('memberService', myWeb.services.MemberServiceProvider);


  function LoginCtrl(memberService, $scope, $window) {
    var self = this;
    self.scope_ = $scope;
    self.window_ = $window;
    self.memberService_ = memberService;
  }

  LoginCtrl.prototype.login = function () {
    var self = this;
    var $scope = self.scope_;
    var $window = self.window_;
    var memberService = self.memberService_;

    var email = $scope.email;
    var pwd = $scope.passwd;

    if (loginValidation($window, email, pwd)) {
      //var form = document.loginForm;
      //form.action = '/ko/api/login';
      //form.method = 'POST';
      //form.submit();
      memberService.login(email, pwd, function (response) {
        $window.console.log(response);
        if (response.result === '000') {
          $window.location.href = myWeb.data.returnUrl || '/ko/page1';
        } else{
          $window.alert(response.message);
        }
      });
    }
  };


  function loginValidation($window, mail, pwd) {
    var result = false;
    if (!mail || mail.length < 3) {
      $window.alert('이메일 입력!!');
    }
    else if (!pwd) {
      $window.alert('비밀번호를 입력하세요');
    } else if (pwd.length < 3) {
      $window.alert('3자 이상의 비밀번호를 입력하세요');
    }
    else {
      result = true;
    }
    return result;
  }


  angular.module('loginApp.controllers', [])
    .controller('LoginCtrl', LoginCtrl);

})(window.myWeb, window.angular);
