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

    $scope.checkedEmail = '';
    $scope.duplicatedEmail = '';

    $scope.FormStatus = {
      name: {
        class1: '',
        class2: '',
        message: '',
        status: 0
      },
      email: {
        class1: '',
        class2: '',
        message: '',
        status: 0
      },
      passwd: {
        class1: '',
        class2: '',
        message: '',
        status: 0
      },
      cpasswd: {
        class1: '',
        class2: '',
        message: '',
        status: 0
      }
    };
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

    if (signUpValidation($scope, $window)) {
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

  SignUpCtrl.prototype.getFormStatus = function () {
    var self = this;
    var $scope = self.scope_;

    return $scope.FormStatus;
  };

  SignUpCtrl.prototype.updateFormStatus = function () {
    var self = this;
    var $scope = self.scope_;
    var status = $scope.FormStatus;
    var name = status.name;
    var email = status.email;
    var password = status.passwd;
    var cPassword = status.cpasswd;

    if (!$scope.email || ($scope.checkedEmail !== $scope.email && $scope.duplicatedEmail !== $scope.email)) {
      if ($scope.email) {
        if (validateEmail($scope.email)) {
          email.class1 = 'has-warning';
          email.class2 = 'fa-ellipsis-h';
          email.message = 'You need duplication check';
          email.status = -1;
        } else {
          email.class1 = 'has-error';
          email.class2 = 'fa-times-circle-o';
          email.message = 'It\'s not an e-mail format.';
          email.status = -2;
        }
      } else {
        email.class1 = '';
        email.class2 = '';
        email.message = '';
        email.status = 0;
      }
    } else {
      if ($scope.checkedEmail === $scope.email) {
        email.class1 = 'has-success';
        email.class2 = 'fa-check';
        email.message = 'It\'s available!';
        email.status = 1;
      } else if ($scope.duplicatedEmail === $scope.email) {
        email.class1 = 'has-error';
        email.class2 = 'fa-times-circle-o';
        email.message = 'This email is already joined.';
        email.status = -2;
      }
    }

    if ($scope.name) {
      if ($scope.name.length > 1) {
        name.class1 = 'has-success';
        name.class2 = 'fa-check';
        name.message = 'OK';
        name.status = 1;
      } else {
        name.class1 = 'has-error';
        name.class2 = 'fa-times-circle-o';
        name.message = 'It\'s too short';
        name.status = -2;
      }
    } else {
      name.class1 = '';
      name.class2 = '';
      name.message = '';
      name.status = 0;

    }

    if ($scope.passwd) {
      if ($scope.passwd.length > 6) {
        password.class1 = 'has-success';
        password.class2 = 'fa-check';
        password.message = 'OK';
        password.status = 1;
      } else {
        password.class1 = 'has-error';
        password.class2 = 'fa-times-circle-o';
        password.message = 'It\'s weak.';
        password.status = -2;
      }
    } else {
      password.class1 = '';
      password.class2 = '';
      password.message = '';
      password.status = 0;
    }

    if ($scope.confirmPasswd) {
      if ($scope.passwd === $scope.confirmPasswd) {
        cPassword.class1 = 'has-success';
        cPassword.class2 = 'fa-check';
        cPassword.message = 'OK';
        cPassword.status = 1;
      } else {
        cPassword.class1 = 'has-error';
        cPassword.class2 = 'fa-times-circle-o';
        cPassword.message = 'It\'s different with password';
        cPassword.status = -2;
      }
    } else {
      cPassword.class1 = '';
      cPassword.class2 = '';
      cPassword.message = '';
      cPassword.status = 0;
    }
  };

  SignUpCtrl.prototype.emailCheck = function () {
    var self = this;
    var memberService = self.memberService_;
    var $scope = self.scope_;
    var $window = self.window_;
    var emailStatus = $scope.FormStatus.email;
    if (emailStatus.status === -1) {
      memberService.emailDupCheck($scope.email, function (response) {
        if (response.result === '000') {
          if (response.data.isDuplicated) {
            $scope.duplicatedEmail = response.data.email;
            $scope.checkedEmail = '';
          } else {
            $scope.duplicatedEmail = '';
            $scope.checkedEmail = response.data.email;
          }
          self.updateFormStatus();
        } else {
          $window.alert(response.message);
        }
      });
    }
  };

  function signUpValidation($scope, $window) {
    var result = false;
    var status = $scope.FormStatus;

    if (status.email.status !== 1 || status.name.status !== 1 ||
      status.passwd.status !== 1 || status.cpasswd.status !== 1) {
      $window.alert('check your form!!');
    } else {
      result = true;
    }
    return result;
  }

  function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }


  angular.module('signUpApp.controllers', [])
    .controller('SignUpCtrl', SignUpCtrl);

})(window.myWeb, window.angular);
