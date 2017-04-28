'use strict';

/**
 * Module dependencies.
 */
const should = require('should');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Contact = mongoose.model('Contact');

/**
 * Globals
 */
let user,
  contact;

/**
 * Unit tests
 */
describe('Contact Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      password: 'password'
    });

    user.save(function(err, user) {
      contact = new Contact({
        firstName: 'test',
        lastName: 'user'
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      contact.save(function(err) {
        console.error(err);
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      contact.name = '';

      contact.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Contact.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
