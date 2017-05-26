'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Orders to go Schema
 */
let DeliverySchema = new Schema({
  payment: {
    type: String,
    enum: [
      'Cash',
      'Check',
      'Credit Card'
    ],
    required: 'Please select a payment option.'
  },
  method: {
    type: String,
    enum: [
      'To The Door',
      'Brought Inside',
      'Unpacked'
    ],
    required: 'Please select a delivery method.'
  },
  followup: {
    type: Boolean,
    required: 'You need to determine if a follow up is required.'
  },
  notes: String
});


mongoose.model('Delivery', DeliverySchema);
