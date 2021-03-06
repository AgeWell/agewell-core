'use strict';

/**
 * Module dependencies.
 */
const should = require('should');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Client = mongoose.model('Client');

/**
 * Globals
 */
let user,
  client;

/**
 * Unit tests
 */
describe('Client Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      password: 'password'
    });

    user.save(function() {
      client = new Client({
        started: new Date(),
        active: true
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      client.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    // it('should be able to show an error when try to save without name', function(done) {
    //   client.name = '';
    //
    //   return client.save(function(err) {
    //     should.exist(err);
    //     done();
    //   });
    // });
  });

  afterEach(function(done) {
    Client.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
