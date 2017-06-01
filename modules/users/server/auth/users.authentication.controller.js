'use strict';

/**
 * Module dependencies
 */
const path = require('path');
const errorHandler = require(path.resolve('./modules/core/server/errors/errors.controller'));
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const Volunteer = mongoose.model('Volunteer');
const Contact = mongoose.model('Contact');

// URLs for which user can't be redirected on signin
var noReturnUrls = [
  '/authentication/signin',
  '/authentication/signup'
];

/**
 * Signup
 */
exports.signup = function(req, res) {
  let roles = ['user'];
  let role = '';

  if (req.body.roles === 'volunteer') {
    role = 'volunteer';
    roles.push(role);
  } else if (req.body.roles === 'client') {
    role = 'client';
    roles.push(role);
  } else if (req.body.roles === 'admin') {
    role = 'admin';
    roles.push(role);
  }

  // For security measurement we remove the roles from the req.body object
  delete req.body.roles;


  let contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });

  // Init user and add missing fields
  var user = new User(req.body);
  user.provider = 'local';
  user.displayName = user.firstName + ' ' + user.lastName;
  user.roles = roles;

  contact.save(function(err, contact) {
    if (err) {
      console.error('This is the error');
      return res.status(400).send(err);
    }

    contact = contact._id;

    // Then save the user
    user.save(function(err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function(err) {
        if (err) {
          return res.status(400).send(err);
        }

        res.json(user);
      });
    });
  });
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      return res.status(422).send(info);
    }
    // Remove sensitive data before login
    user.password = undefined;
    user.salt = undefined;

    req.login(user, function(err) {
      if (err) {
        return res.status(400).send(err);
      }

      res.json(user);
    });
  })(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};
