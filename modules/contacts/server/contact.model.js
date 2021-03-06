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
  _id: {
    type: mongoose.Schema.ObjectId,
    default: mongoose.Types.ObjectId
  },
  firstName: {
    type: String,
    required: 'Please fill first name',
    trim: true
  },
  lastName: {
    type: String,
    required: 'Please fill last name',
    trim: true
  },
  middleInitial: {
    type: String,
    maxlength: 1
  },
  address: Address,
  // phone: [{
  //   number: String,
  //   type: {
  //     type: String,
  //     enum: ['Home', 'Work', 'Mobile']
  //   }
  // }],
  phone1: String,
  phone2: String,
  phone3: String,
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
  client: {
    type: Schema.ObjectId,
    ref: 'Client'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

ContactSchema.virtual('fullname')
  .get(function() {
    return this.firstName + ' ' + this.lastName;
  })
  .set(function(v) {
    this.firstName = v.substr(0, v.indexOf(' '));
    this.lastName = v.substr(v.indexOf(' ') + 1);
  });

module.exports = ContactSchema;
mongoose.model('Contact', ContactSchema);
