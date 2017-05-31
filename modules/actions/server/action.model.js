'use strict';

/**
 * Module dependencies.
 */
const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Actions to go Schema
 */
let ActionSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  created: Date,
  clientId: {
    type: Schema.ObjectId,
    ref: 'Client'
  },
  completed: Boolean,
  notes: String
});

module.exports = mongoose.model('Action', ActionSchema);
