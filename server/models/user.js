'use strict';

// app/models/user.js
// load the things we need
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model

function User(id, email, name, password, registerDate) {
  this.id = id;
  this.local = {
    name: name,
    email: email,
    password: password,
    registerDate: registerDate
  };
}

User.prototype.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = User;
