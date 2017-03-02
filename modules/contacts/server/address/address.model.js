'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  statesArray = require('./states.data');

/**
 * Address Schema
 */
module.exports = new Schema({
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
  type: {
    type: String,
    enum: ['Physical', 'Mailing']
  },
  township: String
});
