(function (myWeb, angular) {
    'use strict';

    function TestService(initValue) {
        var self = this;
        self.initValue_ = initValue;
    }

    TestService.prototype.test = function () {
        var self = this;
        var initValue = self.initValue_;
        window.console.log('service test \n' + initValue);
    };

    function TestServiceProvider() {
    }

    TestServiceProvider.prototype.setInitValue = function (initValue) {
        var self = this;
        self.initValue_ = initValue;
    };

    TestServiceProvider.prototype.$get = function () {
        var self = this;
        return new TestService(self.initValue_);
    };

    myWeb.services.TestServiceProvider = TestServiceProvider;
})(window.myWeb, window.angular);
