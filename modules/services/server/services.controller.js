'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const mongoose = require('mongoose');
const Service = mongoose.model('Service');
const errorHandler = require(path.resolve('./modules/core/server/errors/errors.controller'));
const _ = require('lodash');

/**
 * Create a Service
 */
exports.create = function(req, res) {
  let service = new Service(req.body);
  service.user = req.user;

  service.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(service);
  });
};

/**
 * Show the current Service
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  let service = req.service ? req.service.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  service.isCurrentUserOwner = req.user && service.user && service.user._id.toString() === req.user._id.toString();

  res.jsonp(service);
};

/**
 * Update a Service
 */
exports.update = function(req, res) {
  let service = req.service;

  console.log(req.body);

  service = _.extend(service, req.body);


  service.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(service);
  });
};

/**
 * Delete an Service
 */
exports.delete = function(req, res) {
  var service = req.service;

  service.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(service);
  });
};

/**
 * List of Services
 */
exports.list = function(req, res) {
  Service.find().sort('-created')
    // .populate('user', 'displayName')
    .exec(function(err, services) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(services);
    });
};

/**
 * Service middleware
 */
exports.serviceByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Service is invalid'
    });
  }

  Service.findById(id)
    // .populate('user', 'displayName')
    .exec(function(err, service) {
      if (err) {
        return next(err);
      }
      if (!service) {
        return res.status(404).send({
          message: 'No Service with that identifier has been found'
        });
      }
      req.service = service;
      next();
    });
};
