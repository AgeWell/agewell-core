'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statesArray = require('./states.data');

/**
 * Address Schema
 */
const AddressSchema = new Schema({
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

module.exports = mongoose.model('Address', AddressSchema);
