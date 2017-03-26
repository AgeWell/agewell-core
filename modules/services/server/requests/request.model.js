'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Request Schema
 */
let RequestSchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    default: mongoose.Types.ObjectId
  },
  service: {
    type: Schema.ObjectId,
    ref: 'Service'
  },
  date: {
    type: Date,
    required: 'Please select a Request date'
  },
  notes: String,
  payment: {
    status: Boolean,
    date: Date
  },
  fullfilled: {
    type: Boolean,
    date: Date
  },
  canceled: {
    type: Boolean,
    date: Date
  },
  clientId: {
    type: Schema.ObjectId,
    ref: 'Client'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Request', RequestSchema);
