'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Address = require(path.resolve('./modules/contacts/server/address/address.model'));
const Request = require(path.resolve(
  './modules/services/server/request.model'
));

/**
 * Orders to go Schema
 */
let RideSchema = new Schema({
  type: {
    type: String,
    default: 'ride'
  },
  name: {
    type: String,
    required: true
  },
  dateRequested: {
    type: Date,
    required: true
  },
  purpose: String,
  locationName: {
    type: String,
    required: true
  },
  location: Address,
  dropoffLocationName: {
    type: String,
    required: true
  },
  dropoffLocation: Address,
  tripType: {
    type: String,
    default: 'one-way',
    enum: [
      'one-way',
      'round-trip'
    ]
  },
  specialInstructions: String,
  confirmed: Boolean,
  // payment info
  status: {
    type: String,
    default: 'requested',
    enum: [
      'requested',
      'assigned',
      'completed',
      'canceled',
      'refunded'
    ]
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

RideSchema.virtual('volunteer', {
  ref: 'User',
  localField: 'assignedTo',
  foreignField: '_id',
  justOne: true
});

// mongoose.model('Order', OrderSchema);

Request.discriminator('Ride', RideSchema);
