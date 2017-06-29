'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const shortid = require('shortid');
const mongoose = require('mongoose');
const Action = mongoose.model('Action');
const errorHandler = require(path.resolve('./modules/core/server/errors/errors.controller'));
const _ = require('lodash');

/**
 * Create a Actions to go
 */
exports.create = function(req, res) {
  let action = new Action(req.body);
  action.createdBy = req.user;

  action.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(action);
  });
};

/**
 * Show the current Actions to go
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  let action = req.action ? req.action.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // action.isCurrentUserOwner = req.user && action.user && action.user._id.toString() === req.user._id.toString();

  res.jsonp(action);
};

/**
 * Update a Actions to go
 */
exports.update = function(req, res) {
  let action = req.action;

  action = _.extend(action, req.body);

  action.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(action);
  });
};

/**
 * Delete an Actions to go
 */
exports.delete = function(req, res) {
  var action = req.action;

  action.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(action);
  });
};

/**
 * List of Actions to gos
 */
exports.list = function(req, res) {
  Action.find(req.query)
    .sort('-created')
    .populate('contact')
    .populate('createdBy', 'firstName lastName roles volunteerId')
    .exec(function(err, actions) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(actions);
    });
};

/**
 * Actions to go middleware
 */
exports.actionByID = function(req, res, next, id) {

  if (!shortid.isValid(id)) {
    return res.status(400).send({
      message: 'Actions is invalid'
    });
  }

  Action.findById(id)
    .populate('contact')
    .populate('createdBy', 'firstName lastName roles volunteerId')
    .exec(function(err, action) {
      if (err) {
        return next(err);
      }
      if (!action) {
        return res.status(404).send({
          message: 'No Actions with that identifier has been found'
        });
      }
      req.action = action;
      next();
    });
};
