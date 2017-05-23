'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const errorHandler = require(path.resolve('./modules/core/server/errors/errors.controller'));
const upload = require(path.resolve('./config/lib/multer.js'));


/**
 * Create a Groceries to go
 */
exports.create = function(req, res) {
  let order = new Order(req.body);
  order.user = req.user;

  order.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(order);
  });
};

/**
 * Show the current Groceries to go
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  let order = req.order ? req.order.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  // order.isCurrentUserOwner = req.user && order.user && order.user._id.toString() === req.user._id.toString();

  res.jsonp(order);
};

/**
 * Update a Groceries to go
 */
exports.update = function(req, res) {
  let order = req.order;

  order = _.extend(order, req.body);
  console.log(order.items[0].inCart);

  order.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    console.log(order.items[0].inCart);
    res.jsonp(order);
  });
};

/**
 * Delete an Groceries to go
 */
exports.delete = function(req, res) {
  var order = req.order;

  order.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(order);
  });
};

/**
 * List of Groceries to gos
 */
exports.list = function(req, res) {
  Order.find()
    .sort('requestNumber')
    .populate('contact')
    .exec(function(err, orders) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(orders);
    });
};

exports.reciept = function(req, res) {
  upload.putObject(req, function(err, data) {
    if (err) {
      return res.status(400).send(err);
    }

    console.log('data', data);
    res.jsonp(data);
  });

  // Order.find()
  //   .sort('requestNumber')
  //   .populate('contact')
  //   .exec(function(err, orders) {
  //     if (err) {
  //       return res.status(400).send({
  //         message: errorHandler.getErrorMessage(err)
  //       });
  //     }
  //     res.jsonp(orders);
  //   });
};

/**
 * Groceries to go middleware
 */
exports.orderByID = function(req, res, next, id) {

  if (!shortid.isValid(id)) {
    return res.status(400).send({
      message: 'Groceries to go is invalid'
    });
  }

  Order.findById(id)
    // .populate('user', 'displayName')
    .populate('contact')
    .exec(function(err, order) {
      if (err) {
        return next(err);
      }
      if (!order) {
        return res.status(404).send({
          message: 'No Groceries to go with that identifier has been found'
        });
      }
      req.order = order;
      next();
    });
};
