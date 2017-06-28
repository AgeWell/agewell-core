'use strict';

/**
 * Module dependencies
 */
const path = require('path');
const config = require(path.resolve('./config/config'));
const mongoose = require('mongoose');
const User = mongoose.model('User');
const nodemailer = require('nodemailer');
const validator = require('validator');
const errorHandler = require(path.resolve('./modules/core/server/errors/errors.controller'));

const smtpTransport = nodemailer.createTransport(config.mailer.options);
/**
 * Show the current user
 */
exports.read = function(req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function(req, res) {
  var user = req.model;
  let activation = false;

  // For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.roles = req.body.roles;
  user.active = req.body.active;

  user.save(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    let safeUserObject = {
      displayName: validator.escape(user.displayName),
      provider: validator.escape(user.provider),
      created: user.created.toString(),
      volunteerId: user.volunteerId,
      roles: user.roles,
      isAdmin: user.isAdmin,
      active: user.active,
      profileImageURL: user.profileImageURL,
      email: validator.escape(user.email),
      lastName: validator.escape(user.lastName),
      firstName: validator.escape(user.firstName),
      additionalProvidersData: user.additionalProvidersData
    };

    res.json(safeUserObject);
  });
};

/**
 * Delete a user
 */
exports.delete = function(req, res) {
  var user = req.model;

  user.remove(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * List of Users
 */
exports.list = function(req, res) {
  User.find(req.query)
    .sort('lastName')
    .select('lastName firstName roles active')
    .populate('user', 'displayName')
    .exec(function(err, users) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      }

      res.json(users);
    });
};

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id).exec(function(err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load user ' + id));
    }

    req.model = user;
    next();
  });
};
