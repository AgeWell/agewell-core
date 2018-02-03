'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = mongoose.model('Counter');

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
  assignedTo: {
    type: Schema.ObjectId,
    ref: 'User'
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

RequestSchema.pre('save', function(next) {
  let request = this;
  let query = { id: 'requestNumber' };
  let update = { $inc: { seq: 1 } };
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };
  if (!request.requestNumber) {
    Counter.findOneAndUpdate(query, update, options, function(error, counter) {
      if (error)
        return next(error);
      request.requestNumber = counter.seq;
      next();
    });
  } else {
    next();
  }
});

RequestSchema.virtual('contact', {
  ref: 'Contact',
  localField: 'clientId',
  foreignField: 'client',
  justOne: true
});

module.exports = mongoose.model('Request', RequestSchema);
