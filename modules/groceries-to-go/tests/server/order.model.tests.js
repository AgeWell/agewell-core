'use strict';

/**
 * Module dependencies.
 */
const should = require('should');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

/**
 * Globals
 */
let grocery;

/**
 * Unit tests
 */
describe('Order Model Unit Tests:', function() {
  beforeEach(function(done) {
    grocery = new Order({
      name: 'Order Name',
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
    Order.remove().exec(function() {
      done();
    });
  });
});
