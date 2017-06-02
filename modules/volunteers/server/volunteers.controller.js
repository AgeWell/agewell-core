'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const mongoose = require('mongoose');
const Volunteer = mongoose.model('Volunteer');
const Contact = mongoose.model('Contact');
const errorHandler = require(path.resolve('./modules/core/server/errors/errors.controller'));
const _ = require('lodash');

/**
 * Create a Volunteer
 */
exports.create = function(req, res) {
  let contact = new Contact(req.body.contact);

  var volunteer = new Volunteer(req.body);
  volunteer.user = req.user;

  volunteer.save(function(err, volunteer) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    contact.volunteer = volunteer._id;
    contact.save(function(err, contact) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      volunteer.contact = contact;
      res.jsonp(volunteer);
    });
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
  volunteer.canEdit = req.user.roles.includes('admin');

  console.log(volunteer);

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
    }

    req.body.contact.updated = new Date();

    Contact.findOneAndUpdate({
      volunteer: volunteer._id
    }, req.body.contact, function(err, contact) {
      res.jsonp(volunteer);
    });
  });
};

/**
 * Delete an Volunteer
 */
exports.delete = function(req, res) {
  var volunteer = req.volunteer;

  Contact.remove({
    volunteer: volunteer._id
  }).exec(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    volunteer.remove(function(err) {
      res.jsonp(volunteer);
    });
  });
};

/**
 * List of Volunteers
 */
exports.list = function(req, res) {
  Volunteer.find()
    .sort('-created')
    .populate('contact')
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
    .populate('contact')
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
