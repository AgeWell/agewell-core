'use strict';

/**
 * Module dependencies.
 */
let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  validator = require('validator');

/**
 * A Validation function for local strategy email
 */
let validateLocalStrategyEmail = function(email) {
  return (validator.isEmail(email, {
    require_tld: false
  }));
};


/**
 * Contact Schema
 */
let ContactSchema = new Schema({
  firstName: {
    type: String,
    required: 'Please fill first name',
    trim: true
  },
  middleInitial: {
    type: String,
    maxlength: 1
  },
  lastName: {
    type: String,
    required: 'Please fill last name',
    trim: true
  },
  phones: [{
    number: String,
    type: {
      type: String,
      enum: ['Home', 'Work', 'Cell']
    }
  }],
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: '',
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Contact', ContactSchema);
