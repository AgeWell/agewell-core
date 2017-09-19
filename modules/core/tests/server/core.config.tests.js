'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');
const should = require('should');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const path = require('path');
const fs = require('fs');
const mock = require('mock-fs');
const request = require('supertest');
const config = require(path.resolve('./config/config'));
const logger = require(path.resolve('./config/lib/logger'));
const seed = require(path.resolve('./config/lib/seed'));
const express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
let app,
  agent,
  user1,
  admin1,
  userFromSeedConfig,
  adminFromSeedConfig,
  originalLogConfig;

describe('Configuration Tests:', function () {

  describe('Testing default seedDB', function () {
    before(function(done) {
      User.remove(function(err) {
        should.not.exist(err);

        user1 = {
          provider: 'local',
          email: 'user_config_test_@localhost.com',
          firstName: 'User',
          lastName: 'Local',
          displayName: 'User Local',
          roles: ['user']
        };

        admin1 = {
          provider: 'local',
          email: 'admin_config_test_@localhost.com',
          firstName: 'Admin',
          lastName: 'Local',
          displayName: 'Admin Local',
          roles: ['user', 'admin']
        };

        userFromSeedConfig = config.seedDB.options.seedUser;
        adminFromSeedConfig = config.seedDB.options.seedAdmin;

        return done();

      });
    });

    after(function(done) {
      User.remove(function(err) {
        should.not.exist(err);
        return done();
      });
    });

    it('should have seedDB configuration set for "regular" user', function() {
      (typeof userFromSeedConfig).should.not.equal('undefined');
      should.exist(userFromSeedConfig.email);
    });

    it('should have seedDB configuration set for admin user', function() {
      (typeof adminFromSeedConfig).should.not.equal('undefined');
      should.exist(adminFromSeedConfig.email);
    });

    it('should not be an admin user to begin with', function(done) {
      User.find({ email: 'admin_config_test_@localhost.com' }, function(err, users) {
        should.not.exist(err);
        users.should.be.instanceof(Array).and.have.lengthOf(0);
        return done();
      });
    });

    it('should not be a "regular" user to begin with', function(done) {
      User.find({ email: 'user_config_test_@localhost.com' }, function(err, users) {
        should.not.exist(err);
        users.should.be.instanceof(Array).and.have.lengthOf(0);
        return done();
      });
    });

    it('should seed ONLY the admin user account when NODE_ENV is set to "production"', function(done) {

      // Save original value
      let nodeEnv = process.env.NODE_ENV;
      // Set node env ro production environment
      process.env.NODE_ENV = 'production';

      User.find({ email: adminFromSeedConfig.email }, function(err, users) {

        // There shouldn't be any errors
        should.not.exist(err);
        users.should.be.instanceof(Array).and.have.lengthOf(0);

        seed
          .start({ logResults: false })
          .then(function() {
            User.find({ email: adminFromSeedConfig.email }, function(err, users) {
              should.not.exist(err);
              users.should.be.instanceof(Array).and.have.lengthOf(1);

              let _admin = users.pop();
              _admin.email.should.equal(adminFromSeedConfig.email);

              // Restore original NODE_ENV environment variable
              process.env.NODE_ENV = nodeEnv;

              User.remove(function(err) {
                should.not.exist(err);
                return done();
              });
            });
          });
      });
    });

    it('should seed admin, and "regular" user accounts when NODE_ENV is set to "test"', function(done) {

      // Save original value
      let nodeEnv = process.env.NODE_ENV;
      // Set node env ro production environment
      process.env.NODE_ENV = 'test';

      User.find({ email: adminFromSeedConfig.email }, function(err, users) {

        // There shouldn't be any errors
        should.not.exist(err);
        users.should.be.instanceof(Array).and.have.lengthOf(0);

        seed
          .start({ logResults: false })
          .then(function() {
            User.find({ email: adminFromSeedConfig.email }, function(err, users) {
              should.not.exist(err);
              users.should.be.instanceof(Array).and.have.lengthOf(1);

              let _admin = users.pop();
              _admin.email.should.equal(adminFromSeedConfig.email);

              User.find({ email: userFromSeedConfig.email }, function(err, users) {

                should.not.exist(err);
                users.should.be.instanceof(Array).and.have.lengthOf(1);

                let _user = users.pop();
                _user.email.should.equal(userFromSeedConfig.email);

                // Restore original NODE_ENV environment variable
                process.env.NODE_ENV = nodeEnv;

                User.remove(function(err) {
                  should.not.exist(err);
                  return done();
                });
              });
            });
          });
      });
    });

    it('should seed admin, and "regular" user accounts when NODE_ENV is set to "test" when they already exist', function (done) {

      // Save original value
      let nodeEnv = process.env.NODE_ENV;
      // Set node env ro production environment
      process.env.NODE_ENV = 'test';

      let _user = new User(userFromSeedConfig);
      let _admin = new User(adminFromSeedConfig);

      _admin.save(function (err) {
        // There shouldn't be any errors
        should.not.exist(err);
        _user.save(function (err) {
          // There shouldn't be any errors
          should.not.exist(err);

          User.find({ email: { $in: [adminFromSeedConfig.email, userFromSeedConfig.email] } }, function (err, users) {

            // There shouldn't be any errors
            should.not.exist(err);
            users.should.be.instanceof(Array).and.have.lengthOf(2);

            seed
              .start({ logResults: false })
              .then(function () {
                User.find({ email: { $in: [adminFromSeedConfig.email, userFromSeedConfig.email] } }, function (err, users) {
                  should.not.exist(err);
                  users.should.be.instanceof(Array).and.have.lengthOf(2);

                  // Restore original NODE_ENV environment variable
                  process.env.NODE_ENV = nodeEnv;

                  User.remove(function (err) {
                    should.not.exist(err);
                    return done();
                  });
                });
              });
          });
        });
      });
    });

    it('should ONLY seed admin user account when NODE_ENV is set to "production" with custom admin', function(done) {

      // Save original value
      let nodeEnv = process.env.NODE_ENV;
      // Set node env ro production environment
      process.env.NODE_ENV = 'production';

      User.find({ email: admin1.email }, function(err, users) {

        // There shouldn't be any errors
        should.not.exist(err);
        users.should.be.instanceof(Array).and.have.lengthOf(0);

        seed
          .start({ logResults: false, seedAdmin: admin1 })
          .then(function() {
            User.find({ email: admin1.email }, function(err, users) {
              should.not.exist(err);
              users.should.be.instanceof(Array).and.have.lengthOf(1);

              let _admin = users.pop();
              _admin.email.should.equal(admin1.email);

              // Restore original NODE_ENV environment variable
              process.env.NODE_ENV = nodeEnv;

              User.remove(function(err) {
                should.not.exist(err);
                return done();
              });
            });
          });
      });
    });

    it('should seed admin, and "regular" user accounts when NODE_ENV is set to "test" with custom options', function(done) {

      // Save original value
      let nodeEnv = process.env.NODE_ENV;
      // Set node env ro production environment
      process.env.NODE_ENV = 'test';

      User.find({ email: admin1.email }, function(err, users) {

        // There shouldn't be any errors
        should.not.exist(err);
        users.should.be.instanceof(Array).and.have.lengthOf(0);

        seed
          .start({ logResults: false, seedAdmin: admin1, seedUser: user1 })
          .then(function() {
            User.find({ email: admin1.email }, function(err, users) {
              should.not.exist(err);
              users.should.be.instanceof(Array).and.have.lengthOf(1);

              let _admin = users.pop();
              _admin.email.should.equal(admin1.email);

              User.find({ email: user1.email }, function(err, users) {

                should.not.exist(err);
                users.should.be.instanceof(Array).and.have.lengthOf(1);

                let _user = users.pop();
                _user.email.should.equal(user1.email);

                // Restore original NODE_ENV environment variable
                process.env.NODE_ENV = nodeEnv;

                User.remove(function(err) {
                  should.not.exist(err);
                  return done();
                });
              });
            });
          });
      });
    });

    it('should NOT seed admin user account if it already exists when NODE_ENV is set to "production"', function(done) {

      // Save original value
      let nodeEnv = process.env.NODE_ENV;
      // Set node env ro production environment
      process.env.NODE_ENV = 'production';

      let _admin = new User(adminFromSeedConfig);

      _admin.save(function(err, user) {
        // There shouldn't be any errors
        should.not.exist(err);
        user.email.should.equal(adminFromSeedConfig.email);

        seed
          .start({ logResults: false })
          .then(function () {
            // we don't ever expect to make it here but we don't want to timeout
            User.remove(function(err) {
              should.not.exist(err);
              // force this test to fail since we should never be here
              should.exist(undefined);
              // Restore original NODE_ENV environment variable
              process.env.NODE_ENV = nodeEnv;

              return done();
            });
          })
          .catch(function (err) {
            should.exist(err);
            err.message.should.equal('Failed due to local account already exists: ' + adminFromSeedConfig.email);

            // Restore original NODE_ENV environment variable
            process.env.NODE_ENV = nodeEnv;

            User.remove(function(removeErr) {
              should.not.exist(removeErr);

              return done();
            });
          });
      });
    });

    it('should NOT seed "regular" user account if missing email when NODE_ENV set to "test"', function (done) {

      // Save original value
      let nodeEnv = process.env.NODE_ENV;
      // Set node env ro test environment
      process.env.NODE_ENV = 'test';

      let _user = new User(user1);
      _user.email = '';

      seed
        .start({ logResults: false, seedUser: _user })
        .then(function () {
          // we don't ever expect to make it here but we don't want to timeout
          User.remove(function(err) {
            // force this test to fail since we should never be here
            should.exist(undefined);
            // Restore original NODE_ENV environment variable
            process.env.NODE_ENV = nodeEnv;

            return done();
          });
        })
        .catch(function (err) {
          should.exist(err);
          err.message.should.equal('Failed to add local ' + _user.email);

          // Restore original NODE_ENV environment variable
          process.env.NODE_ENV = nodeEnv;

          User.remove(function(removeErr) {
            should.not.exist(removeErr);

            return done();
          });
        });
    });
  });

  describe('Testing Session Secret Configuration', function () {
    // it('should warn if using default session secret when running in production', function (done) {
    //   let conf = { sessionSecret: 'MEAN' };
    //   // set env to production for this test
    //   process.env.NODE_ENV = 'production';
    //   config.utils.validateSessionSecret(conf, true).should.equal(false);
    //   // set env back to test
    //   process.env.NODE_ENV = 'test';
    //   return done();
    // });

    it('should accept non-default session secret when running in production', function () {
      let conf = { sessionSecret: 'super amazing secret' };
      // set env to production for this test
      process.env.NODE_ENV = 'production';
      config.utils.validateSessionSecret(conf, true).should.equal(true);
      // set env back to test
      process.env.NODE_ENV = 'test';
    });

    it('should accept default session secret when running in development', function () {
      let conf = { sessionSecret: 'MEAN' };
      // set env to development for this test
      process.env.NODE_ENV = 'development';
      config.utils.validateSessionSecret(conf, true).should.equal(true);
      // set env back to test
      process.env.NODE_ENV = 'test';
    });

    it('should accept default session secret when running in test', function () {
      let conf = { sessionSecret: 'MEAN' };
      config.utils.validateSessionSecret(conf, true).should.equal(true);
    });
  });

  describe('Testing Logger Configuration', function () {

    beforeEach(function () {
      originalLogConfig = _.clone(config.log, true);
      mock();
    });

    afterEach(function () {
      config.log = originalLogConfig;
      mock.restore();
    });

    it('should retrieve the log format from the logger configuration', function () {

      config.log = {
        format: 'tiny'
      };

      let format = logger.getLogFormat();
      format.should.be.equal('tiny');
    });

    it('should retrieve the log options from the logger configuration for a valid stream object', function () {

      let options = logger.getMorganOptions();

      options.should.be.instanceof(Object);
      options.should.have.property('stream');

    });

    it('should verify that a file logger object was created using the logger configuration', function () {
      let _dir = process.cwd();
      let _filename = 'unit-test-access.log';

      config.log = {
        fileLogger: {
          directoryPath: _dir,
          fileName: _filename
        }
      };

      let fileTransport = logger.getLogOptions(config);
      fileTransport.should.be.instanceof(Object);
      fileTransport.filename.should.equal(_dir + '/' + _filename);
    });

    // it('should use the default log format of "combined" when an invalid format was provided', function () {
    //
    //   let _logger = require(path.resolve('./config/lib/logger'));
    //
    //   // manually set the config log format to be invalid
    //   config.log = {
    //     format: '_some_invalid_format_'
    //   };
    //
    //   let format = _logger.getLogFormat();
    //   format.should.be.equal('combined');
    // });

    it('should not create a file transport object if critical options are missing: filename', function () {

      // manually set the config stream fileName option to an empty string
      config.log = {
        format: 'combined',
        options: {
          stream: {
            directoryPath: process.cwd(),
            fileName: ''
          }
        }
      };

      let fileTransport = logger.getLogOptions(config);
      fileTransport.should.be.false();
    });

    it('should not create a file transport object if critical options are missing: directory', function () {

      // manually set the config stream fileName option to an empty string
      config.log = {
        format: 'combined',
        options: {
          stream: {
            directoryPath: '',
            fileName: 'app.log'
          }
        }
      };

      let fileTransport = logger.getLogOptions(config);
      fileTransport.should.be.false();
    });
  });

  describe('Testing exposing environment as a variable to layout', function () {

    ['development', 'production', 'test'].forEach(function(env) {
      it('should expose environment set to ' + env, function (done) {
        // Set env to development for this test
        process.env.NODE_ENV = env;

        // Gget application
        app = express.init(mongoose);
        agent = request.agent(app);

        // Get rendered layout
        agent.get('/')
          .expect('Content-Type', 'text/html; charset=utf-8')
          .expect(200)
          .end(function (err, res) {
            // Set env back to test
            process.env.NODE_ENV = 'test';
            // Handle errors
            if (err) {
              return done(err);
            }
            res.text.should.containEql('env = "' + env + '"');
            return done();
          });
      });
    });

  });

});
