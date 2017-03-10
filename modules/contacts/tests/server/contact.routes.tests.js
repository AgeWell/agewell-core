'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Contact = mongoose.model('Contact'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  contact;

/**
 * Contact routes tests
 */
describe('Contact CRUD tests', function () {

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
      role: 'admin'
    });

    // Save a user to the test db and create new Contact
    user.save(function (err, user) {
      if (err) {
        return console.error(err);
      }

      console.log(err);

      contact = {
        name: 'Contact name'
      };

      done();
    });
  });

  it('should be able to save a Contact if logged in as an admin', function (done) {
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

        // Save a new Contact
        agent.post('/api/contacts')
          .send(contact)
          .expect(200)
          .end(function (contactSaveErr, contactSaveRes) {
            // Handle Contact save error
            if (contactSaveErr) {
              console.error(contactSaveErr);
              return done(contactSaveErr);
            }

            // Get a list of Contacts
            agent.get('/api/contacts')
              .end(function (contactsGetErr, contactsGetRes) {
                // Handle Contacts save error
                if (contactsGetErr) {
                  return done(contactsGetErr);
                }

                // Get Contacts list
                var contacts = contactsGetRes.body;

                // Set assertions
                (contacts[0].user._id).should.equal(userId);
                (contacts[0].name).should.match('Contact name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Contact if not logged in', function (done) {
    agent.post('/api/contacts')
      .send(contact)
      .expect(403)
      .end(function (contactSaveErr, contactSaveRes) {
        // Call the assertion callback
        done(contactSaveErr);
      });
  });

  it('should not be able to save an Contact if no name is provided', function (done) {
    // Invalidate name field
    contact.name = '';

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

        // Save a new Contact
        agent.post('/api/contacts')
          .send(contact)
          .expect(400)
          .end(function (contactSaveErr, contactSaveRes) {
            // Set message assertion
            (contactSaveRes.body.message).should.match('Please fill Contact name');

            // Handle Contact save error
            done(contactSaveErr);
          });
      });
  });

  it('should be able to update an Contact if signed in as an admin', function (done) {
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

        // Save a new Contact
        agent.post('/api/contacts')
          .send(contact)
          .expect(200)
          .end(function (contactSaveErr, contactSaveRes) {
            // Handle Contact save error
            if (contactSaveErr) {
              return done(contactSaveErr);
            }

            // Update Contact name
            contact.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Contact
            agent.put('/api/contacts/' + contactSaveRes.body._id)
              .send(contact)
              .expect(200)
              .end(function (contactUpdateErr, contactUpdateRes) {
                // Handle Contact update error
                if (contactUpdateErr) {
                  return done(contactUpdateErr);
                }

                // Set assertions
                (contactUpdateRes.body._id).should.equal(contactSaveRes.body._id);
                (contactUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should return proper error for single Contact with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/contacts/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Contact is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Contact which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Contact
    request(app).get('/api/contacts/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Contact with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Contact if signed in', function (done) {
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

        // Save a new Contact
        agent.post('/api/contacts')
          .send(contact)
          .expect(200)
          .end(function (contactSaveErr, contactSaveRes) {
            // Handle Contact save error
            if (contactSaveErr) {
              return done(contactSaveErr);
            }

            // Delete an existing Contact
            agent.delete('/api/contacts/' + contactSaveRes.body._id)
              .send(contact)
              .expect(200)
              .end(function (contactDeleteErr, contactDeleteRes) {
                // Handle contact error error
                if (contactDeleteErr) {
                  return done(contactDeleteErr);
                }

                // Set assertions
                (contactDeleteRes.body._id).should.equal(contactSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Contact if not signed in', function (done) {
    // Set Contact user
    contact.user = user;

    // Create new Contact model instance
    var contactObj = new Contact(contact);

    // Save the Contact
    contactObj.save(function () {
      // Try deleting Contact
      request(app).delete('/api/contacts/' + contactObj._id)
        .expect(403)
        .end(function (contactDeleteErr, contactDeleteRes) {
          // Set message assertion
          (contactDeleteRes.body.message).should.match('No Contact with that identifier has been found');

          // Handle Contact error error
          done(contactDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Contact.remove().exec(done);
    });
  });
});
