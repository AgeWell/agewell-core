'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const mongoose = require('mongoose');
const Volunteer = mongoose.model('Volunteer');
const User = mongoose.model('User');
const errorHandler = require(path.resolve('./modules/core/server/errors/errors.controller'));
const _ = require('lodash');

/**
 * Create a Volunteer
 */
exports.create = function(req, res) {
  var volunteer = new Volunteer(req.body);
  volunteer.userId = req.user;

  volunteer.save(function(err, volunteer) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(volunteer);
  });
};

/**
 * Show the current Volunteer
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var volunteer = req.volunteer ? req.volunteer.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  volunteer.canEdit = req.user.roles.includes('admin');

  res.jsonp(volunteer);
};

/**
 * Update a Volunteer
 */
exports.update = function(req, res) {
  var volunteer = req.volunteer;

  volunteer = _.extend(volunteer, req.body);

  volunteer.contact.updated = new Date();

  volunteer.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    User.findOneAndUpdate({
      _id: volunteer.userId
    }, {
      firstName: req.body.contact.firstName,
      lastName: req.body.contact.lastName,
      email: req.body.contact.email
    }, function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(volunteer);
    });
  });
};

/**
 * Delete an Volunteer
 */
exports.delete = function(req, res) {
  var volunteer = req.volunteer;

  volunteer.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(volunteer);
  });
};

/**
 * List of Volunteers
 */
exports.list = function(req, res) {
  Volunteer.find(req.query)
    .sort('-created')
    .exec(function(err, volunteers) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(volunteers);
    });
};

/**
 * Volunteer middleware
 */
exports.volunteerByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Volunteer is invalid'
    });
  }

  Volunteer.findById(id)
    .exec(function(err, volunteer) {
      if (err) {
        return next(err);
      }
      if (!volunteer) {
        return res.status(404).send({
          message: 'No Volunteer with that identifier has been found'
        });
      }
      req.volunteer = volunteer;
      next();
    });
};
