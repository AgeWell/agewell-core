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
  name: {
    type: String,
    default: '',
    required: 'Please fill Request name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Request', RequestSchema);
