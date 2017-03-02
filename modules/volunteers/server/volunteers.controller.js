'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Volunteer = mongoose.model('Volunteer'),
  errorHandler = require(path.resolve('./modules/core/server/errors/errors.controller')),
  _ = require('lodash');

/**
 * Create a Volunteer
 */
exports.create = function(req, res) {
  var volunteer = new Volunteer(req.body);
  volunteer.user = req.user;

  volunteer.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(volunteer);
    }
  });
};

/**
 * Show the current Volunteer
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var volunteer = req.volunteer ? req.volunteer.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  volunteer.isCurrentUserOwner = req.user && volunteer.user && volunteer.user._id.toString() === req.user._id.toString();

  res.jsonp(volunteer);
};

/**
 * Update a Volunteer
 */
exports.update = function(req, res) {
  var volunteer = req.volunteer;

  volunteer = _.extend(volunteer, req.body);

  volunteer.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(volunteer);
    }
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
    } else {
      res.jsonp(volunteer);
    }
  });
};

/**
 * List of Volunteers
 */
exports.list = function(req, res) {
  Volunteer.find().sort('-created').populate('user', 'displayName').exec(function(err, volunteers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(volunteers);
    }
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

  Volunteer.findById(id).populate('user', 'displayName').exec(function (err, volunteer) {
    if (err) {
      return next(err);
    } else if (!volunteer) {
      return res.status(404).send({
        message: 'No Volunteer with that identifier has been found'
      });
    }
    req.volunteer = volunteer;
    next();
  });
};
