'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
const errorHandler = require(path.resolve('./modules/core/server/errors/errors.controller'));
const _ = require('lodash');

/**
 * Create a Contact
 */
exports.create = function(req, res) {
  var contact = new Contact(req.body);
  contact.user = req.user;

  contact.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.jsonp(contact);
  });
};

/**
 * Show the current Contact
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var contact = req.contact ? req.contact.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  contact.isCurrentUserOwner = req.user && contact.user && contact.user._id.toString() === req.user._id.toString();

  res.jsonp(contact);
};

/**
 * Update a Contact
 */
exports.update = function(req, res) {
  var contact = req.contact;

  contact = _.extend(contact, req.body);

  contact.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.jsonp(contact);
  });
};

/**
 * Delete an Contact
 */
exports.delete = function(req, res) {
  var contact = req.contact;

  contact.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.jsonp(contact);
  });
};

/**
 * List of Contacts
 */
exports.list = function(req, res) {
  Contact.find()
    .sort('-created')
    .populate('user')
    .exec(function(err, contacts) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }

      res.jsonp(contacts);
    });
};

/**
 * Contact middleware
 */
exports.contactByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Contact is invalid'
    });
  }

  Contact.findById(id)
    .populate('user')
    .exec(function(err, contact) {
      if (err) {
        return next(err);
      }
      if (!contact) {
        return res.status(404).send({
          message: 'No Contact with that identifier has been found'
        });
      }
      req.contact = contact;
      next();
    });
};
