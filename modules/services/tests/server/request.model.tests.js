'use strict';

/**
 * Module dependencies.
 */
const should = require('should');
const mongoose = require('mongoose');
const Client = mongoose.model('User');
const Request = mongoose.model('Request');

/**
 * Globals
 */
let client,
  request;

/**
 * Unit tests
 */
describe('Request Model Unit Tests:', function() {
  beforeEach(function(done) {
    client = new Client({
      started: new Date(),
      active: true
    });

    client.save(function() {
      request = new Request({
        date: new Date(),
        clientId: client._id
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      request.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without a date', function(done) {
      request.date = '';

      request.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Request.remove().exec(function() {
      Client.remove().exec(function() {
        done();
      });
    });
  });
});
