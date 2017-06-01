'use strict';

/**
 * Module dependencies.
 */
const shortid = require('shortid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Actions to go Schema
 */
let ActionSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  type: {
    type: String,
    default: 'Follow-up',
    enum: [
      'Follow-up'
    ]
  },
  created: Date,
  clientId: {
    type: Schema.ObjectId,
    ref: 'Client'
  },
  completed: {
    type: Boolean,
    default: false
  },
  notes: String
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

ActionSchema.virtual('contact', {
  ref: 'Contact',
  localField: 'clientId',
  foreignField: 'client',
  justOne: true
});

module.exports = mongoose.model('Action', ActionSchema);
