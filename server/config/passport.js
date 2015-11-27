'use strict';
// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../models/user');
var userService = require('../services/userServices');

// load the auth variables
var configAuth = require('./auth');

module.exports = function (passport) {

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (seq, done) {
    var user = new User(seq);
    userService.getUser(user, function (err, user) {
      done(err, user);
    });
  });

  // code for login (use('local-login', new LocalStategy))
  // code for signup (use('local-signup', new LocalStategy))

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, callback) {

      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function () {


        // if there is no user with that email
        // create the user
        var newUser = new User();

        // set the user's local credentials
        newUser.local.email = email;
        newUser.local.password = password;

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        userService.getUser(newUser, function (err, user) {
          // if there are any errors, return the error
          if (err) {
            return callback(err);
          }

          // check to see if theres already a user with that email
          if (user) {
            return callback(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {
            userService.signUp(newUser, function (err, data) {
              if (err) {
                return callback(err);
              } else {
                return callback(null, data);
              }
            });
          }
        });
      });
    }));

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      userService.selectUser(email, function (err, user) {
        // if there are any errors, return the error before anything else
        if (err) {
          return done(err);
        }

        // if no user is found, return the message
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No user found.'));
           // req.flash is the way to set flashdata using connect-flash
        }

        // if the user is found but the password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
           // create the loginMessage and save it to session as flashdata
        }

        // all is well, return successful user
        return done(null, user);
      });

    }));


};
