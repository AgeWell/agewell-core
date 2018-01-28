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
const Client = mongoose.model('Client');
const errorHandler = require(path.resolve('./modules/core/server/errors/errors.controller'));
const upload = require(path.resolve('./config/lib/multer.js'));


/**
 * Create a Rides to go
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
    Client.findByIdAndUpdate(order.clientId, {
      lastOrdered: new Date(req.options.Order.order[0]),
      lastOrder: order._id
    }, function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(order);
    });
  });
};

/**
 * Show the current Rides to go
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  let order = req.order ? req.order.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // order.isCurrentUserOwner = req.user && order.user && order.user._id.toString() === req.user._id.toString();

  res.jsonp(order);
};

/**
 * Update a Rides to go
 */
exports.update = function(req, res) {
  let order = req.order;

  order = _.extend(order, req.body);

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
 * Delete an Rides to go
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
 * List of Rides
 */
exports.list = function(req, res) {
  let query = req.query;

  if (req.user.roles.includes('volunteer')) {
    query = {
      $and: [
        query,
        {
          $or: [
            { assignedTo: req.user._id },
            { assignedTo: { $exists: false } }
          ]
        }
      ]
    };
  }

  Order.find(query)
    .sort('requestNumber')
    .populate('contact')
    .populate('assignedTo')
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

    let order = req.order;

    order.recieptImage = data.key;

    order.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }

      res.jsonp(order);
    });
  });
};

/**
 * Rides middleware
 */
exports.orderByID = function(req, res, next, id) {

  if (!shortid.isValid(id)) {
    return res.status(400).send({
      message: 'Rides is invalid'
    });
  }

  Order.findById(id)
    .populate('contact')
    .populate('volunteer')
    .exec(function(err, order) {
      if (err) {
        return next(err);
      }
      if (!order) {
        return res.status(404).send({
          message: 'No Rides with that identifier has been found'
        });
      }
      req.order = order;
      next();
    });
};
