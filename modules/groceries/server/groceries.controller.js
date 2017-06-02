'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const mongoose = require('mongoose');
const Grocery = mongoose.model('Grocery');
const errorHandler = require(path.resolve('./modules/core/server/errors/errors.controller'));
const _ = require('lodash');

/**
 * Create a Groceries to go
 */
exports.create = function(req, res) {
  let groceriesToGo = new Grocery(req.body);
  groceriesToGo.user = req.user;

  groceriesToGo.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(groceriesToGo);
  });
};

/**
 * Show the current Groceries to go
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  let groceriesToGo = req.groceriesToGo ? req.groceriesToGo.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  groceriesToGo.isCurrentUserOwner = req.user && groceriesToGo.user && groceriesToGo.user._id.toString() === req.user._id.toString();

  res.jsonp(groceriesToGo);
};

/**
 * Update a Groceries to go
 */
exports.update = function(req, res) {
  let groceriesToGo = req.groceriesToGo;

  groceriesToGo = _.extend(groceriesToGo, req.body);

  groceriesToGo.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(groceriesToGo);
  });
};

/**
 * Delete an Groceries to go
 */
exports.delete = function(req, res) {
  var groceriesToGo = req.groceriesToGo;

  groceriesToGo.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(groceriesToGo);
  });
};

/**
 * List of Groceries to gos
 */
exports.list = function(req, res) {
  Grocery.find()
    .sort('-created')
    .populate('user', 'displayName')
    .exec(function(err, groceriesToGos) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(groceriesToGos);
    });
};

/**
 * Groceries to go middleware
 */
exports.groceriesToGoByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Groceries to go is invalid'
    });
  }

  Grocery.findById(id)
    .populate('user', 'displayName')
    .exec(function(err, groceriesToGo) {
      if (err) {
        return next(err);
      }
      if (!groceriesToGo) {
        return res.status(404).send({
          message: 'No Groceries to go with that identifier has been found'
        });
      }
      req.groceriesToGo = groceriesToGo;
      next();
    });
};
