'use strict';

const should = require('should');
const request = require('supertest');
const path = require('path');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Action = mongoose.model('Action');
const express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
let app,
  agent,
  credentials,
  user,
  action;

/**
 * Actions to go routes tests
 */
describe('Actions to go CRUD tests', function() {

  before(function(done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function(done) {
    // Create user credentials
    credentials = {
      email: 'test@example.com',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: credentials.email,
      password: credentials.password,
      provider: 'local',
      roles: 'admin'
    });

    // Save a user to the test db and create new Actions to go
    user.save(function() {
      action = {
        created: new Date(),
        completed: false,
        notes: 'Something'
      };

      done();
    });
  });

  it('should be able to save a Actions to go if logged in', function(done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function(signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Save a new Actions to go
        agent.post('/api/actions')
          .send(action)
          .expect(200)
          .end(function(actionSaveErr, actionSaveRes) {
            // Handle Actions to go save error
            if (actionSaveErr) {
              return done(actionSaveErr);
            }

            // Get a list of Actions to gos
            agent.get('/api/actions')
              .end(function(actionGetErr, actionGetRes) {
                // Handle Actions to gos save error
                if (actionGetErr) {
                  return done(actionGetErr);
                }

                // Get Actions to gos list
                let action = actionGetRes.body;

                // Set assertions
                (action[0].notes).should.match('Something');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Actions to go if not logged in', function(done) {
    agent.post('/api/actions')
      .send(action)
      .expect(403)
      .end(function(actionSaveErr, actionSaveRes) {
        // Call the assertion callback
        done(actionSaveErr);
      });
  });

  it('should return proper error for single Actions to go which doesnt exist, if not signed in', function(done) {
    // This is a valid mongoose Id but a non-existent Actions to go
    request(app).get('/api/actions/559e9cd815f80b4c256a8f41')
      .end(function(req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Actions with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete an Actions to go if not signed in', function(done) {
    // Create new Actions to go model instance
    let actionObj = new Action(action);

    // Save the Actions to go
    actionObj.save(function() {
      // Try deleting Actions to go
      request(app).delete('/api/actions/' + actionObj._id)
        .expect(403)
        .end(function(actionDeleteErr, actionDeleteRes) {
          // Set message assertion
          (actionDeleteRes.body.message).should.match('User is not authorized');

          // Handle Actions to go error error
          done(actionDeleteErr);
        });

    });
  });

  afterEach(function(done) {
    User.remove().exec(function() {
      Action.remove().exec(done);
    });
  });
});
