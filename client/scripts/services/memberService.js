(function (myWeb, angular) {
  'use strict';

  function MemberService($q, $http) {
    var self = this;
    self.http_ = $http;
    self.q_ = $q;
  }

  MemberService.prototype.login = function (mail, pwd, callback) {
    var self = this;
    var $http = self.http_;
    var $q = self.q_;

    return $http({
      method: 'POST',
      url: '/admin/api/login',
      data: {
        'email': mail,
        'password': pwd
      }
    }).then(function (response) {
      callback(response.data);
    }, function (rejection) {
      callback(rejection.data);
    });
  };

  MemberService.prototype.signUp = function (name, mail, pwd, callback) {
    var self = this;
    var $http = self.http_;
    var $q = self.q_;

    return $http({
      method: 'POST',
      url: '/admin/api/signup',
      data: {
        'name': name,
        'email': mail,
        'password': pwd
      }
    }).then(function (response) {
      callback(response.data);
    }, function (rejection) {
      callback(rejection.data);
    });
  };

  MemberService.prototype.emailDupCheck = function (mail, callback) {
    var self = this;
    var $http = self.http_;
    return $http({
      method: 'POST',
      url: '/admin/api/emailDupCheck',
      data: {
        'email': mail
      }
    }).then(function (response) {
      callback(response.data);
    }, function (rejection) {
      callback(rejection.data);
    });
  };


  /**
   * Helper
   */


  /**
   *
   */
  function MemberServiceProvider() {
  }

  MemberServiceProvider.prototype.$get = function ($q, $http) {
    var self = this;
    return new MemberService($q, $http);
  };

  myWeb.services.MemberServiceProvider = MemberServiceProvider;
})(window.myWeb, window.angular);
