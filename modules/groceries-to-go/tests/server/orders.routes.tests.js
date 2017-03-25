'use strict';

const should = require('should');
const request = require('supertest');
const path = require('path');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Grocery = mongoose.model('Grocery');
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
 * Orders to go routes tests
 */
describe('Orders to go CRUD tests', function() {

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

    // Save a user to the test db and create new Orders to go
    user.save(function() {
      order = {
        name: 'Orders to go name'
      };

      done();
    });
  });

  it('should be able to save a Orders to go if logged in', function(done) {
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

        // Save a new Orders to go
        agent.post('/api/orders')
          .send(order)
          .expect(200)
          .end(function(orderSaveErr, orderSaveRes) {
            // Handle Orders to go save error
            if (orderSaveErr) {
              return done(orderSaveErr);
            }

            // Get a list of Orders to gos
            agent.get('/api/orders')
              .end(function(orderGetErr, orderGetRes) {
                // Handle Orders to gos save error
                if (orderGetErr) {
                  return done(orderGetErr);
                }

                // Get Orders to gos list
                let order = orderGetRes.body;

                // Set assertions
                // (order[0].client._id).should.equal(clientId);
                (order[0].name).should.match('Orders to go name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Orders to go if not logged in', function(done) {
    agent.post('/api/orders')
      .send(order)
      .expect(403)
      .end(function(orderSaveErr, orderSaveRes) {
        // Call the assertion callback
        done(orderSaveErr);
      });
  });

  it('should not be able to save an Orders to go if no name is provided', function(done) {
    // Invalidate name field
    order.name = '';

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

        // Save a new Orders to go
        agent.post('/api/orders')
          .send(order)
          .expect(400)
          .end(function(orderSaveErr, orderSaveRes) {
            // Set message assertion
            (orderSaveRes.body.message).should.match('Please fill Orders to go name');

            // Handle Orders to go save error
            done(orderSaveErr);
          });
      });
  });

  it('should be able to update an Orders to go if signed in', function(done) {
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

        // Save a new Orders to go
        agent.post('/api/orders')
          .send(order)
          .expect(200)
          .end(function(orderSaveErr, orderSaveRes) {
            // Handle Orders to go save error
            if (orderSaveErr) {
              return done(orderSaveErr);
            }

            // Update Orders to go name
            order.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Orders to go
            agent.put('/api/orders/' + orderSaveRes.body._id)
              .send(order)
              .expect(200)
              .end(function(orderUpdateErr, orderUpdateRes) {
                // Handle Orders to go update error
                if (orderUpdateErr) {
                  return done(orderUpdateErr);
                }

                // Set assertions
                (orderUpdateRes.body._id).should.equal(orderSaveRes.body._id);
                (orderUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Orders to gos if not signed in', function(done) {
    // Create new Orders to go model instance
    let orderObj = new Grocery(order);

    // Save the order
    orderObj.save(function() {
      // Request Orders to gos
      request(app).get('/api/orders')
        .end(function(req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Orders to go if not signed in', function(done) {
    // Create new Orders to go model instance
    let orderObj = new Grocery(order);

    // Save the Orders to go
    orderObj.save(function() {
      request(app).get('/api/orders/' + orderObj._id)
        .end(function(req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', order.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Orders to go with an invalid Id, if not signed in', function(done) {
    // test is not a valid mongoose Id
    request(app).get('/api/orders/test')
      .end(function(req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Orders to go is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Orders to go which doesnt exist, if not signed in', function(done) {
    // This is a valid mongoose Id but a non-existent Orders to go
    request(app).get('/api/orders/559e9cd815f80b4c256a8f41')
      .end(function(req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Orders to go with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Orders to go if signed in', function(done) {
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

        // Save a new Orders to go
        agent.post('/api/orders')
          .send(order)
          .expect(200)
          .end(function(orderSaveErr, orderSaveRes) {
            // Handle Orders to go save error
            if (orderSaveErr) {
              return done(orderSaveErr);
            }

            // Delete an existing Orders to go
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

  it('should not be able to delete an Orders to go if not signed in', function(done) {
    // Set Orders to go user
    // order.user = user;

    // Create new Orders to go model instance
    let orderObj = new Grocery(order);

    // Save the Orders to go
    orderObj.save(function() {
      // Try deleting Orders to go
      request(app).delete('/api/orders/' + orderObj._id)
        .expect(403)
        .end(function(orderDeleteErr, orderDeleteRes) {
          // Set message assertion
          (orderDeleteRes.body.message).should.match('User is not authorized');

          // Handle Orders to go error error
          done(orderDeleteErr);
        });

    });
  });

  afterEach(function(done) {
    User.remove().exec(function() {
      Grocery.remove().exec(done);
    });
  });
});
