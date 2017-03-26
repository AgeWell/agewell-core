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
  let grocery = new Grocery(req.body);
  grocery.user = req.user;

  grocery.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(grocery);
  });
};

/**
 * Show the current Groceries to go
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  let grocery = req.grocery ? req.grocery.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  // grocery.isCurrentUserOwner = req.user && grocery.user && grocery.user._id.toString() === req.user._id.toString();

  res.jsonp(grocery);
};

/**
 * Update a Groceries to go
 */
exports.update = function(req, res) {
  let grocery = req.grocery;

  grocery = _.extend(grocery, req.body);

  grocery.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(grocery);
  });
};

/**
 * Delete an Groceries to go
 */
exports.delete = function(req, res) {
  var grocery = req.grocery;

  grocery.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(grocery);
  });
};

/**
 * List of Groceries to gos
 */
exports.list = function(req, res) {
  Grocery.find().sort('-created')
    // .populate('user', 'displayName')
    .exec(function(err, grocerys) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(grocerys);
    });
};

/**
 * Groceries to go middleware
 */
exports.groceryByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Groceries to go is invalid'
    });
  }

  Grocery.findById(id)
    // .populate('user', 'displayName')
    .exec(function(err, grocery) {
      if (err) {
        return next(err);
      }
      if (!grocery) {
        return res.status(404).send({
          message: 'No Groceries to go with that identifier has been found'
        });
      }
      req.grocery = grocery;
      next();
    });
};
