'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const mongoose = require('mongoose');
const Client = mongoose.model('Client');
const Contact = mongoose.model('Contact');
const errorHandler = require(path.resolve('./modules/core/server/errors/errors.controller'));
const _ = require('lodash');

/**
 * Create a Client
 */
exports.create = function(req, res) {
  let contact = new Contact(req.body.contact);
  let client = new Client(req.body);
  client.save(function(err, client) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    contact.client = client._id;
    contact.save(function(err, contact) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      client.contact = contact;
      res.jsonp(client);
    });
  });
};

/**
 * Show the current Client
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  let client = req.client ? req.client.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // client.canEdit = req.user.roles.includes('admin');

  res.jsonp(client);
};

/**
 * Update a Client
 */
exports.update = function(req, res) {
  let client = req.client;

  client = _.extend(client, req.body);

  client.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    req.body.contact.updated = new Date();

    Contact.findOneAndUpdate({
      client: client._id
    }, req.body.contact, function(err, contact) {

      client.canEdit = req.user.roles.includes('admin');

      res.jsonp(client);
    });
  });
};

/**
 * Delete an Client
 */
exports.delete = function(req, res) {
  let client = req.client;

  Contact.remove({
    client: client._id
  }).exec(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    client.remove(function(err) {
      res.jsonp(client);
    });
  });
};

/**
 * List of Clients
 */
exports.list = function(req, res) {
  if (req.query.lastSkip) {
    req.query.lastSkip = {
      $ne: new Date(req.query.lastSkip)
    };
  }

  if (req.query.lastOrder) {
    req.query.lastOrder = {
      $ne: new Date(req.query.lastOrder)
    };
  }

  Client.find(req.query)
    .sort('-created')
    .populate('contact')
    .exec(function(err, clients) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(clients);
    });
};

/**
 * Client middleware
 */
exports.clientByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Client is invalid'
    });
  }

  Client.findById(id)
    .populate('contact')
    .exec(function(err, client) {
      if (err) {
        return next(err);
      }
      if (!client) {
        return res.status(404).send({
          message: 'No Client with that identifier has been found'
        });
      }
      req.client = client;
      next();
    });
};
