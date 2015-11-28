(function (myWeb, angular) {
  'use strict';

  var app = angular.module('signUpApp', [
    'signUpApp.services',
    'signUpApp.controllers'
  ]);

  angular.module('signUpApp.services', [])
    .provider('memberService', myWeb.services.MemberServiceProvider);


  function SignUpCtrl(memberService, $scope, $window) {
    var self = this;
    self.scope_ = $scope;
    self.window_ = $window;
    self.memberService_ = memberService;
  }

  SignUpCtrl.prototype.signUp = function () {
    var self = this;
    var $scope = self.scope_;
    var $window = self.window_;
    var memberService = self.memberService_;

    var name = $scope.name;
    var email = $scope.email;
    var pwd = $scope.passwd;
    var cPwd = $scope.confirmPasswd;

    if (signUpValidation($window, name, email, pwd, cPwd)) {
      memberService.signUp(name, email, pwd, function (response) {
        $window.console.log(response);
        if (response.result === '000') {
          $window.location.href = myWeb.data.returnUrl || '/admin/login';
        } else {
          $window.alert(response.message);
        }
      });
    }
  };


  function signUpValidation($window, name, mail, pwd, cPwd) {
    var result = false;
    if (!name || name.length < 3) {
      $window.alert('이름 입력!');
    } else if (!mail || mail.length < 3) {
      $window.alert('이메일 입력!!');
    } else if (!pwd) {
      $window.alert('비밀번호를 입력하세요');
    } else if (pwd !== cPwd) {
      $window.alert('비밀번호가 일치하지 않습니다');
    } else if (pwd.length < 3) {
      $window.alert('3자 이상의 비밀번호를 입력하세요');
    } else {
      result = true;
    }
    return result;
  }


  angular.module('signUpApp.controllers', [])
    .controller('SignUpCtrl', SignUpCtrl);

})(window.myWeb, window.angular);
