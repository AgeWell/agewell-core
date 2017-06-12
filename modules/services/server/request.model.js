'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
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
  requestNumber: Number,
  date: {
    type: Date,
    required: 'Please select a Request date'
  },
  notes: String,
  payment: {
    paid: Boolean,
    date: Date
  },
  fullfilled: {
    status: Boolean,
    date: Date
  },
  canceled: {
    status: Boolean,
    date: Date
  },
  clientId: {
    type: Schema.ObjectId,
    ref: 'Client'
  },
  volunteer: {
    type: Schema.ObjectId,
    ref: 'Volunteer'
  },
  created: {
    type: Date,
    default: Date.now
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

RequestSchema.plugin(AutoIncrement, {
  inc_field: 'requestNumber'
});

RequestSchema.virtual('contact', {
  ref: 'Contact',
  localField: 'clientId',
  foreignField: 'client',
  justOne: true
});

module.exports = mongoose.model('Request', RequestSchema);
