'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const mongoose = require('mongoose');
const Ride = mongoose.model('Ride');
const errorHandler = require(path.resolve(
  './modules/core/server/errors/errors.controller'
));
const _ = require('lodash');

/**
 * Create a Rides to go
 */
exports.create = function(req, res) {
  req.body.date = new Date();
  let ride = new Ride(req.body);
  ride.user = req.user;

  ride.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(ride);
  });
};

/**
 * Show the current Rides to go
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  let ride = req.ride ? req.ride.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // ride.isCurrentUserOwner = req.user && ride.user && ride.user._id.toString() === req.user._id.toString();

  res.jsonp(ride);
};

/**
 * Update a Rides to go
 */
exports.update = function(req, res) {
  let ride = req.ride;

  ride = _.extend(ride, req.body);

  ride.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(ride);
  });
};

/**
 * Delete an Rides to go
 */
exports.delete = function(req, res) {
  var ride = req.ride;

  ride.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(ride);
  });
};

/**
 * List of Rides
 */
exports.list = function(req, res) {
  let query = req.query;

  if (req.user.roles.includes('volunteer')) {
    query = {
      $and: [
        query,
        { assignedTo: req.user._id }
      ]
    };
  }

  Ride.find(query)
    .sort('-created')
    .populate('user', 'displayName')
    .populate('volunteer')
    .exec(function(err, rides) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(rides);
    });
};

/**
 * Rides middleware
 */
exports.rideByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Rides is invalid'
    });
  }

  Ride.findById(id)
    .populate('user', 'displayName')
    .exec(function(err, ride) {
      if (err) {
        return next(err);
      }
      if (!ride) {
        return res.status(404).send({
          message: 'No Rides with that identifier has been found'
        });
      }
      req.ride = ride;
      next();
    });
};
