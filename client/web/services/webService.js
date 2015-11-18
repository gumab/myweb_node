

// angular service.
// UI independent logic
app.provider('webService', function () {

  function WebService(initValue) {
    this.test = function () {
      console.log('service test \n'+initValue);
    };
  }

  return {
    $get: function () {
      return new WebService(this.initValue);
    },

    init: function (initValue) {
      this.initValue = initValue;
    }
  }
});