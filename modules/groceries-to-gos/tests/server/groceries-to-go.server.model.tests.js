'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  GroceriesToGo = mongoose.model('GroceriesToGo');

/**
 * Globals
 */
var user,
  groceriesToGo;

/**
 * Unit tests
 */
describe('Groceries to go Model Unit Tests:', function() {
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
      groceriesToGo = new GroceriesToGo({
        name: 'Groceries to go Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      groceriesToGo.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      groceriesToGo.name = '';

      groceriesToGo.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    GroceriesToGo.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
