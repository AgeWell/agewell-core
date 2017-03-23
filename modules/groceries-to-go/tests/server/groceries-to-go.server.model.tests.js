'use strict';

/**
 * Module dependencies.
 */
const should = require('should');
const mongoose = require('mongoose');
const Grocery = mongoose.model('Grocery');

/**
 * Globals
 */
var grocery;

/**
 * Unit tests
 */
describe('Grocery Model Unit Tests:', function() {
  beforeEach(function(done) {
    grocery = new Grocery({
      name: 'Grocery Name',
      qty: 5
    });

    done();
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      grocery.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      grocery.name = '';

      grocery.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Grocery.remove().exec(function() {
      done();
    });
  });
});
