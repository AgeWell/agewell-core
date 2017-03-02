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
  name: {
    first: {
      type: String,
      required: 'Please fill first name',
      trim: true
    },
    last: {
      type: String,
      required: 'Please fill last name',
      trim: true
    },
    middleInitial: {
      type: String,
      maxlength: 1
    }
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
  birthDay: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say']
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

ContactSchema.virtual('fullName')
  .get(function() {
    return this.name.first + ' ' + this.name.last;
  })
  .set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });

mongoose.model('Contact', ContactSchema);
