'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  statesArray = require('./states.data');

/**
 * Location Schema
 */
var LocationSchema = new Schema({
  street: String,
  additional: String,
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

mongoose.model('Location', LocationSchema);
