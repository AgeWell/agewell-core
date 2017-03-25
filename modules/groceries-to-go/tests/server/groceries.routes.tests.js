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
  grocery;

/**
 * Groceries to go routes tests
 */
describe('Groceries to go CRUD tests', function() {

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

    // Save a user to the test db and create new Groceries to go
    user.save(function() {
      grocery = {
        name: 'Groceries to go name'
      };

      done();
    });
  });

  it('should be able to save a Groceries to go if logged in', function(done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          console.log(signinErr);
          return done(signinErr);
        }
        console.log(signinRes);

        // Save a new Groceries to go
        agent.post('/api/groceries')
          .send(grocery)
          .expect(200)
          .end(function(grocerySaveErr, grocerySaveRes) {
            // Handle Groceries to go save error
            if (grocerySaveErr) {
              console.log(grocerySaveErr);
              return done(grocerySaveErr);
            }
            console.log(grocerySaveRes);

            // Get a list of Groceries to gos
            agent.get('/api/groceries')
              .end(function(groceryGetErr, groceryGetRes) {
                // Handle Groceries to gos save error
                if (groceryGetErr) {
                  console.log(groceryGetErr);
                  return done(groceryGetErr);
                }
                console.log(groceryGetRes);

                // Get Groceries to gos list
                let grocery = groceryGetRes.body;

                // Set assertions
                (grocery[0].name).should.match('Groceries to go name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Groceries to go if not logged in', function(done) {
    agent.post('/api/groceries')
      .send(grocery)
      .expect(403)
      .end(function(grocerySaveErr, grocerySaveRes) {
        // Call the assertion callback
        done(grocerySaveErr);
      });
  });

  it('should not be able to save an Groceries to go if no name is provided', function(done) {
    // Invalidate name field
    grocery.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          console.log(signinErr);
          return done(signinErr);
        }

        // Save a new Groceries to go
        agent.post('/api/groceries')
          .send(grocery)
          .expect(400)
          .end(function(grocerySaveErr, grocerySaveRes) {
            // Set message assertion
            (grocerySaveRes.body.message).should.match('Please fill Grocery item name');

            // Handle Groceries to go save error
            done(grocerySaveErr);
          });
      });
  });

  it('should be able to update an Groceries to go if signed in', function(done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Save a new Groceries to go
        agent.post('/api/groceries')
          .send(grocery)
          .expect(200)
          .end(function(grocerySaveErr, grocerySaveRes) {
            // Handle Groceries to go save error
            if (grocerySaveErr) {
              return done(grocerySaveErr);
            }

            // Update Groceries to go name
            grocery.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Groceries to go
            agent.put('/api/groceries/' + grocerySaveRes.body._id)
              .send(grocery)
              .expect(200)
              .end(function(groceryUpdateErr, groceryUpdateRes) {
                // Handle Groceries to go update error
                if (groceryUpdateErr) {
                  return done(groceryUpdateErr);
                }

                // Set assertions
                (groceryUpdateRes.body._id).should.equal(grocerySaveRes.body._id);
                (groceryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Groceries to gos if not signed in', function(done) {
    // Create new Groceries to go model instance
    let groceryObj = new Grocery(grocery);

    // Save the grocery
    groceryObj.save(function() {
      // Request Groceries to gos
      request(app).get('/api/groceries')
        .end(function(req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Groceries to go if not signed in', function(done) {
    // Create new Groceries to go model instance
    let groceryObj = new Grocery(grocery);

    // Save the Groceries to go
    groceryObj.save(function() {
      request(app).get('/api/groceries/' + groceryObj._id)
        .end(function(req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', grocery.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Groceries to go with an invalid Id, if not signed in', function(done) {
    // test is not a valid mongoose Id
    request(app).get('/api/groceries/test')
      .end(function(req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Groceries to go is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Groceries to go which doesnt exist, if not signed in', function(done) {
    // This is a valid mongoose Id but a non-existent Groceries to go
    request(app).get('/api/groceries/559e9cd815f80b4c256a8f41')
      .end(function(req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Groceries to go with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Groceries to go if signed in', function(done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Save a new Groceries to go
        agent.post('/api/groceries')
          .send(grocery)
          .expect(200)
          .end(function(grocerySaveErr, grocerySaveRes) {
            // Handle Groceries to go save error
            if (grocerySaveErr) {
              return done(grocerySaveErr);
            }

            // Delete an existing Groceries to go
            agent.delete('/api/groceries/' + grocerySaveRes.body._id)
              .send(grocery)
              .expect(200)
              .end(function(groceryDeleteErr, groceryDeleteRes) {
                // Handle grocery error error
                if (groceryDeleteErr) {
                  return done(groceryDeleteErr);
                }

                // Set assertions
                (groceryDeleteRes.body._id).should.equal(grocerySaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Groceries to go if not signed in', function(done) {
    // Set Groceries to go user
    grocery.user = user;

    // Create new Groceries to go model instance
    let groceryObj = new Grocery(grocery);

    // Save the Groceries to go
    groceryObj.save(function() {
      // Try deleting Groceries to go
      request(app).delete('/api/groceries/' + groceryObj._id)
        .expect(403)
        .end(function(groceryDeleteErr, groceryDeleteRes) {
          // Set message assertion
          (groceryDeleteRes.body.message).should.match('User is not authorized');

          // Handle Groceries to go error error
          done(groceryDeleteErr);
        });

    });
  });

  afterEach(function(done) {
    User.remove().exec(function() {
      Grocery.remove().exec(done);
    });
  });
});
