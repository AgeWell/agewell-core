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
  created: {
    type: Date,
    default: Date.now
  },
  requestService: {
    type: Schema.ObjectId,
    ref: 'Service'
  },
  requestDate: {
    type: Date,
    required: 'Please select a Request date',
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedDate: {
    type: Date
  },
  clientId: {
    type: Schema.ObjectId,
    ref: 'Client'
  }
});

mongoose.model('Request', RequestSchema);
