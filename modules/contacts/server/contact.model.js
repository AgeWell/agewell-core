'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Address = require('./address/address.model');
const validator = require('validator');

delete Address._id;

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
  address: Address,
  homePhone: String,
  workPhone: String,
  cellPhone: String,
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: '',
    validate: [validateEmail, 'Please fill a valid email address']
  },
  birthday: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say']
  },
  veteran: Boolean,
  ethnicity: {
    type: String,
    enum: ['Not Hispanic/Latino', 'Hispanic']
  },
  race: {
    type: String,
    enum: ['American Indian/Alaskan Native', 'Asian', 'African-American', 'Native Hawaiian/Pacific Islander ', 'Biracial or Multiracial', 'White', 'Other']
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Separated', 'Widow']
  },
  education: String,
  hasDisability: Boolean,
  disability: String,
  allergies: String,
  emergencyContact: {
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
