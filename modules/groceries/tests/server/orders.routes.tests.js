'use strict';

const should = require('should');
const request = require('supertest');
const path = require('path');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Order = mongoose.model('Order');
const express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
let app,
  agent,
  credentials,
  user,
  order;

/**
 * Orders routes tests
 */
describe('Orders CRUD tests', function() {

  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function(done) {
    // Create user credentials
    credentials = {
      usernameOrEmail: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.usernameOrEmail,
      password: credentials.password,
      provider: 'local',
      roles: 'admin'
    });

    // Save a user to the test db and create new Orders
    user.save(function() {
      order = {
        status: 'pending',
        date: new Date(),
        subTotal: 0,
        deliveryCost: 0,
        total: 0
      };

      done();
    });
  });

  it('should be able to save a Orders if logged in', function(done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the clientId
        // let clientId = client.id;

        // Save a new Orders
        agent.post('/api/orders')
          .send(order)
          .expect(200)
          .end(function(orderSaveErr, orderSaveRes) {
            // Handle Orders save error
            if (orderSaveErr) {
              return done(orderSaveErr);
            }

            // Get a list of Orders
            agent.get('/api/orders')
              .end(function(orderGetErr, orderGetRes) {
                // Handle Orders save error
                if (orderGetErr) {
                  return done(orderGetErr);
                }

                // Get Orders list
                let order = orderGetRes.body;

                // Set assertions
                (order[0].status).should.match('pending');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Orders if not logged in', function(done) {
    agent.post('/api/orders')
      .send(order)
      .expect(403)
      .end(function(orderSaveErr, orderSaveRes) {
        // Call the assertion callback
        done(orderSaveErr);
      });
  });

  it('should not be able to save an Orders if no total is provided', function(done) {
    // Invalidate name field
    delete order.total;

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the clientId
        // let clientId = client.id;

        // Save a new Orders
        agent.post('/api/orders')
          .send(order)
          .expect(400)
          .end(function(orderSaveErr, orderSaveRes) {
            // Set message assertion
            (orderSaveRes.body.message).should.match('An order must have a total.');

            // Handle Orders save error
            done(orderSaveErr);
          });
      });
  });

  it('should be able to update an Orders if signed in', function(done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the clientId
        // let clientId = client.id;

        // Save a new Orders
        agent.post('/api/orders')
          .send(order)
          .expect(200)
          .end(function(orderSaveErr, orderSaveRes) {
            // Handle Orders save error
            if (orderSaveErr) {
              return done(orderSaveErr);
            }

            // Update Orders status
            order.status = 'ordered';

            // Update an existing Orders
            agent.put('/api/orders/' + orderSaveRes.body._id)
              .send(order)
              .expect(200)
              .end(function(orderUpdateErr, orderUpdateRes) {
                // Handle Orders update error
                if (orderUpdateErr) {
                  return done(orderUpdateErr);
                }

                // Set assertions
                (orderUpdateRes.body._id).should.equal(orderSaveRes.body._id);
                (orderUpdateRes.body.status).should.match('ordered');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Orders if signed in', function(done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }
        // Create new Orders model instance
        let orderObj = new Order(order);

        // Save the order
        orderObj.save(function() {
          // Request Orders
          agent.get('/api/orders')
            .end(function(req, res) {
              // Set assertion
              res.body.should.be.instanceof(Array).and.have.lengthOf(1);

              // Call the assertion callback
              done();
            });
        });
      });
  });

  it('should be able to delete an Orders if signed in', function(done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the clientId
        // let clientId = client.id;

        // Save a new Orders
        agent.post('/api/orders')
          .send(order)
          .expect(200)
          .end(function(orderSaveErr, orderSaveRes) {
            // Handle Orders save error
            if (orderSaveErr) {
              return done(orderSaveErr);
            }

            // Delete an existing Orders
            agent.delete('/api/orders/' + orderSaveRes.body._id)
              .send(order)
              .expect(200)
              .end(function(orderDeleteErr, orderDeleteRes) {
                // Handle order error error
                if (orderDeleteErr) {
                  return done(orderDeleteErr);
                }

                // Set assertions
                (orderDeleteRes.body._id).should.equal(orderSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Orders if not signed in', function(done) {
    // Set Orders user
    // order.user = user;

    // Create new Orders model instance
    let orderObj = new Order(order);

    // Save the Orders
    orderObj.save(function(err, neworder) {

      // Try deleting Orders
      request(app).delete('/api/orders/' + orderObj._id)
        .expect(403)
        .end(function(orderDeleteErr, orderDeleteRes) {
          // Set message assertion
          (orderDeleteRes.body.message).should.match('User is not authorized');

          // Handle Orders error error
          done(orderDeleteErr);
        });

    });
  });

  afterEach(function(done) {
    User.remove().exec(function() {
      Order.remove().exec(done);
    });
  });
});
