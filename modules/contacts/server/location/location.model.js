'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  statesArray = require('./states.data');

/**
 * Contact Schema
 */
var ContactSchema = new Schema({
  street: String,
  city: String,
  state: {
    type: String,
    uppercase: true,
    required: true,
    enum: statesArray
  },
  zipcode: Number,
  Township: String
});

mongoose.model('Contact', ContactSchema);
