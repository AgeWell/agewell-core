'use strict';

/**
 * Module dependencies
 */
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const errorHandler = require(path.resolve('./modules/core/server/errors/errors.controller'));
const mongoose = require('mongoose');
const multer = require('multer');
const config = require(path.resolve('./config/config'));
const User = mongoose.model('User');
const validator = require('validator');

var whitelistedFields = ['firstName', 'lastName', 'email', 'username'];

/**
 * Update user details
 */
exports.update = function(req, res) {
  // Init Variables
  var user = req.user;

  if (user) {
    // Update whitelisted fields only
    user = _.extend(user, _.pick(req.body, whitelistedFields));

    user.updated = Date.now();
    user.displayName = user.firstName + ' ' + user.lastName;

    user.save(function(err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      }

      req.login(user, function(err) {
        if (err) {
          return res.status(400).send(err);
        }

        res.json(user);
      });
    });
  } else {
    res.status(401).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Update profile picture
 */
exports.changeProfilePicture = function(req, res) {
  var user = req.user;
  var existingImageUrl;

  // Filtering to upload only images
  var multerConfig = config.uploads.profile.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;
  var upload = multer(multerConfig).single('newProfilePicture');

  if (user) {
    existingImageUrl = user.profileImageURL;
    uploadImage()
      .then(updateUser)
      .then(deleteOldImage)
      .then(login)
      .then(function() {
        res.json(user);
      })
      .catch(function(err) {
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'User is not signed in'
    });
  }

  function uploadImage() {
    return new Promise(function(resolve, reject) {
      upload(req, res, function(uploadError) {
        if (uploadError) {
          return reject(errorHandler.getErrorMessage(uploadError));
        }
        resolve();
      });
    });
  }

  function updateUser() {
    return new Promise(function(resolve, reject) {
      user.profileImageURL = '/uploads/users/profile/' + req.file.filename;
      user.save(function(err, theuser) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  function deleteOldImage() {
    return new Promise(function(resolve, reject) {
      if (existingImageUrl !== User.schema.path('profileImageURL').defaultValue) {
        fs.unlink(existingImageUrl, function(unlinkError) {
          if (unlinkError) {
            console.log(unlinkError);
            reject({
              message: 'Error occurred while deleting old profile picture'
            });
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  function login() {
    return new Promise(function(resolve, reject) {
      req.login(user, function(err) {
        if (err) {
          return res.status(400).send(err);
        }
        resolve();
      });
    });
  }
};

/**
 * Send User
 */
exports.me = function(req, res) {
  // Sanitize the user - short term solution. Copied from core.server.controller.js
  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName)
    };
  }

  res.json(safeUserObject || null);
};
