'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  GroceriesToGo = mongoose.model('GroceriesToGo'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  groceriesToGo;

/**
 * Groceries to go routes tests
 */
describe('Groceries to go CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
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
    user.save(function () {
      groceriesToGo = {
        name: 'Groceries to go name'
      };

      done();
    });
  });

  it('should be able to save a Groceries to go if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Groceries to go
        agent.post('/api/groceriesToGos')
          .send(groceriesToGo)
          .expect(200)
          .end(function (groceriesToGoSaveErr, groceriesToGoSaveRes) {
            // Handle Groceries to go save error
            if (groceriesToGoSaveErr) {
              return done(groceriesToGoSaveErr);
            }

            // Get a list of Groceries to gos
            agent.get('/api/groceriesToGos')
              .end(function (groceriesToGosGetErr, groceriesToGosGetRes) {
                // Handle Groceries to gos save error
                if (groceriesToGosGetErr) {
                  return done(groceriesToGosGetErr);
                }

                // Get Groceries to gos list
                var groceriesToGos = groceriesToGosGetRes.body;

                // Set assertions
                (groceriesToGos[0].user._id).should.equal(userId);
                (groceriesToGos[0].name).should.match('Groceries to go name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Groceries to go if not logged in', function (done) {
    agent.post('/api/groceriesToGos')
      .send(groceriesToGo)
      .expect(403)
      .end(function (groceriesToGoSaveErr, groceriesToGoSaveRes) {
        // Call the assertion callback
        done(groceriesToGoSaveErr);
      });
  });

  it('should not be able to save an Groceries to go if no name is provided', function (done) {
    // Invalidate name field
    groceriesToGo.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Groceries to go
        agent.post('/api/groceriesToGos')
          .send(groceriesToGo)
          .expect(400)
          .end(function (groceriesToGoSaveErr, groceriesToGoSaveRes) {
            // Set message assertion
            (groceriesToGoSaveRes.body.message).should.match('Please fill Groceries to go name');

            // Handle Groceries to go save error
            done(groceriesToGoSaveErr);
          });
      });
  });

  it('should be able to update an Groceries to go if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Groceries to go
        agent.post('/api/groceriesToGos')
          .send(groceriesToGo)
          .expect(200)
          .end(function (groceriesToGoSaveErr, groceriesToGoSaveRes) {
            // Handle Groceries to go save error
            if (groceriesToGoSaveErr) {
              return done(groceriesToGoSaveErr);
            }

            // Update Groceries to go name
            groceriesToGo.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Groceries to go
            agent.put('/api/groceriesToGos/' + groceriesToGoSaveRes.body._id)
              .send(groceriesToGo)
              .expect(200)
              .end(function (groceriesToGoUpdateErr, groceriesToGoUpdateRes) {
                // Handle Groceries to go update error
                if (groceriesToGoUpdateErr) {
                  return done(groceriesToGoUpdateErr);
                }

                // Set assertions
                (groceriesToGoUpdateRes.body._id).should.equal(groceriesToGoSaveRes.body._id);
                (groceriesToGoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Groceries to gos if not signed in', function (done) {
    // Create new Groceries to go model instance
    var groceriesToGoObj = new GroceriesToGo(groceriesToGo);

    // Save the groceriesToGo
    groceriesToGoObj.save(function () {
      // Request Groceries to gos
      request(app).get('/api/groceriesToGos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Groceries to go if not signed in', function (done) {
    // Create new Groceries to go model instance
    var groceriesToGoObj = new GroceriesToGo(groceriesToGo);

    // Save the Groceries to go
    groceriesToGoObj.save(function () {
      request(app).get('/api/groceriesToGos/' + groceriesToGoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', groceriesToGo.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Groceries to go with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/groceriesToGos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Groceries to go is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Groceries to go which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Groceries to go
    request(app).get('/api/groceriesToGos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Groceries to go with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Groceries to go if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Groceries to go
        agent.post('/api/groceriesToGos')
          .send(groceriesToGo)
          .expect(200)
          .end(function (groceriesToGoSaveErr, groceriesToGoSaveRes) {
            // Handle Groceries to go save error
            if (groceriesToGoSaveErr) {
              return done(groceriesToGoSaveErr);
            }

            // Delete an existing Groceries to go
            agent.delete('/api/groceriesToGos/' + groceriesToGoSaveRes.body._id)
              .send(groceriesToGo)
              .expect(200)
              .end(function (groceriesToGoDeleteErr, groceriesToGoDeleteRes) {
                // Handle groceriesToGo error error
                if (groceriesToGoDeleteErr) {
                  return done(groceriesToGoDeleteErr);
                }

                // Set assertions
                (groceriesToGoDeleteRes.body._id).should.equal(groceriesToGoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Groceries to go if not signed in', function (done) {
    // Set Groceries to go user
    groceriesToGo.user = user;

    // Create new Groceries to go model instance
    var groceriesToGoObj = new GroceriesToGo(groceriesToGo);

    // Save the Groceries to go
    groceriesToGoObj.save(function () {
      // Try deleting Groceries to go
      request(app).delete('/api/groceriesToGos/' + groceriesToGoObj._id)
        .expect(403)
        .end(function (groceriesToGoDeleteErr, groceriesToGoDeleteRes) {
          // Set message assertion
          (groceriesToGoDeleteRes.body.message).should.match('User is not authorized');

          // Handle Groceries to go error error
          done(groceriesToGoDeleteErr);
        });

    });
  });

  it('should be able to get a single Groceries to go that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      usernameOrEmail: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      usernameOrEmail: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Groceries to go
          agent.post('/api/groceriesToGos')
            .send(groceriesToGo)
            .expect(200)
            .end(function (groceriesToGoSaveErr, groceriesToGoSaveRes) {
              // Handle Groceries to go save error
              if (groceriesToGoSaveErr) {
                return done(groceriesToGoSaveErr);
              }

              // Set assertions on new Groceries to go
              (groceriesToGoSaveRes.body.name).should.equal(groceriesToGo.name);
              should.exist(groceriesToGoSaveRes.body.user);
              should.equal(groceriesToGoSaveRes.body.user._id, orphanId);

              // force the Groceries to go to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Groceries to go
                    agent.get('/api/groceriesToGos/' + groceriesToGoSaveRes.body._id)
                      .expect(200)
                      .end(function (groceriesToGoInfoErr, groceriesToGoInfoRes) {
                        // Handle Groceries to go error
                        if (groceriesToGoInfoErr) {
                          return done(groceriesToGoInfoErr);
                        }

                        // Set assertions
                        (groceriesToGoInfoRes.body._id).should.equal(groceriesToGoSaveRes.body._id);
                        (groceriesToGoInfoRes.body.name).should.equal(groceriesToGo.name);
                        should.equal(groceriesToGoInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      GroceriesToGo.remove().exec(done);
    });
  });
});
