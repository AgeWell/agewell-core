'use strict';

/**
 * Module dependencies.
 */
let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Address = require('./address/address.model'),
  validator = require('validator');

/**
 * A Validation function for local strategy email
 */
let validateEmail = function(email) {
  return (email === '' || validator.isEmail(email, {
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
  addresses: [Address],
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
    validate: [validateEmail, 'Please fill a valid email address']
  },
  birthDay: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say']
  },
  Veteran: Boolean,
  Ethnicity: {
    type: String,
    enum: ['Not Hispanic/Latino', 'Hispanic']
  },
  'Race': {
    type: String,
    enum: ['American Indian/Alaskan Native', 'Asian', 'African-American', 'Native Hawaiian/Pacific Islander ', 'Biracial or Multiracial', 'White', 'Other']
  },
  'Marital Status': {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Separated', 'Widow']
  },
  'Education': String,
  'Has Disability': Boolean,
  'Disability': String,
  'Allergies': String,
  'Emergency Contact': {
    type: Schema.ObjectId,
    ref: 'Contact'
  },
  userId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  clientId: {
    type: Schema.ObjectId,
    ref: 'Client'
  },
  volunteerId: {
    type: Schema.ObjectId,
    ref: 'Volunteer'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

// ContactSchema.virtual('fullname')
//   .get(function() {
//     return this.name.first + ' ' + this.name.last;
//   });
  // .set(function(v) {
  //   this.name.first = v.substr(0, v.indexOf(' '));
  //   this.name.last = v.substr(v.indexOf(' ') + 1);
  // });

module.exports = mongoose.model('Contact', ContactSchema);
