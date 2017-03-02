'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Client Schema
 */
var ClientSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Client name',
    trim: true
  },
  contact: {
    type: Schema.ObjectId,
    ref: 'Contact'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

mongoose.model('Client', ClientSchema);
