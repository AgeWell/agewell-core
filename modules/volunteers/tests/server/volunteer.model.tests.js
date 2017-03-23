'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Volunteer = mongoose.model('Volunteer');

/**
 * Globals
 */
var user,
  volunteer;

/**
 * Unit tests
 */
describe('Volunteer Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      volunteer = new Volunteer({
        started: new Date(),
        active: true
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      volunteer.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    // it('should be able to show an error when try to save without name', function(done) {
    //   volunteer.name = '';
    //
    //   return volunteer.save(function(err) {
    //     should.exist(err);
    //     done();
    //   });
    // });
  });

  afterEach(function(done) {
    Volunteer.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
