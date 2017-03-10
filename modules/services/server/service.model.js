'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Service Schema
 */
let ServiceSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Service name',
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

mongoose.model('Service', ServiceSchema);
