'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');
const chalk = require('chalk');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

/**
 * Get files by glob patterns
 */
var getGlobbedPaths = function (globPatterns, excludes) {
  // URL paths regex
  var urlRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

  // The output array
  var output = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    // console.log(globPatterns);
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      var files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            excludes.forEach(function(exclude, key) {
              file = file.replace(exclude, '');
            });
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }

  // console.log(output);

  return output;
};

/**
 * Validate NODE_ENV existence
 */
var validateEnvironmentVariable = function () {
  var environmentFiles = glob.sync('./config/env/' + process.env.NODE_ENV + '.js');
  console.log();
  if (!environmentFiles.length) {
    if (process.env.NODE_ENV) {
      console.error(chalk.red('+ Error: No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
    } else {
      console.error(chalk.red('+ Error: NODE_ENV is not defined! Using default development environment'));
    }
    process.env.NODE_ENV = 'development';
  }
  // Reset console color
  console.log(chalk.white(''));
};

/** Validate config.domain is set
 */
var validateDomainIsSet = function (config) {
  if (!config.domain) {
    console.log(chalk.red('+ Important warning: config.domain is empty. It should be set to the fully qualified domain of the app.'));
  }
};

/**
 * Validate Secure=true parameter can actually be turned on
 * because it requires certs and key files to be available
 */
var validateSecureMode = function (config) {

  if (!config.secure || config.secure.ssl !== true) {
    return true;
  }

  var privateKey = fs.existsSync(path.resolve(config.secure.privateKey));
  var certificate = fs.existsSync(path.resolve(config.secure.certificate));

  if (!privateKey || !certificate) {
    console.log(chalk.red('+ Error: Certificate file or key file is missing, falling back to non-SSL mode'));
    console.log(chalk.red('  To create them, simply run the following from your shell: sh ./scripts/generate-ssl-certs.sh'));
    console.log();
    config.secure.ssl = false;
  }
};

/**
 * Initialize global configuration files
 */
var initGlobalConfigFolders = function (config, assets) {
  // Appending files
  config.folders = {
    server: {},
    client: {}
  };

  // Setting globbed client paths
  config.folders.client = getGlobbedPaths(path.join(process.cwd(), '/modules/*/client/**/'), process.cwd().replace(new RegExp(/\\/g), '/'));
};

/**
 * Initialize global configuration files
 */
var initGlobalConfigFiles = function (config, assets) {
  // Appending files
  config.files = {
    server: {},
    client: {}
  };

  // Setting Globbed model files
  config.files.server.models = getGlobbedPaths(assets.server.models);

  // Setting Globbed route files
  config.files.server.routes = getGlobbedPaths(assets.server.routes);

  // Setting Globbed config files
  config.files.server.configs = getGlobbedPaths(assets.server.config);

  // Setting Globbed socket files
  config.files.server.sockets = getGlobbedPaths(assets.server.sockets);

  // Setting Globbed policies files
  config.files.server.policies = getGlobbedPaths(assets.server.policies);

  // Setting Globbed js files
  config.files.client.js = getGlobbedPaths(assets.client.lib.js, 'public/').concat(getGlobbedPaths(assets.client.js, ['public/']));

  // Setting Globbed css files
  config.files.client.css = getGlobbedPaths(assets.client.lib.css, 'public/').concat(getGlobbedPaths(assets.client.css, ['public/']));

  // Setting Globbed test files
  config.files.client.tests = getGlobbedPaths(assets.client.tests);
};

/**
 * Initialize global configuration
 */
var initGlobalConfig = function () {
  // Validate NODE_ENV existence
  validateEnvironmentVariable();

  // Get the default assets
  var defaultAssets = require(path.join(process.cwd(), 'config/assets/default'));

  // Get the current assets
  var environmentAssets = require(path.join(process.cwd(), 'config/assets/', process.env.NODE_ENV)) || {};

  // Merge assets
  var assets = _.merge(defaultAssets, environmentAssets);

  // Get the default config
  var defaultConfig = require(path.join(process.cwd(), 'config/env/default'));

  // Get the current config
  var environmentConfig = require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};

  // Merge config files
  var config = _.merge(defaultConfig, environmentConfig);

  // read package.json for MEAN.JS project information
  var pkg = require(path.resolve('./package.json'));
  config.meanjs = pkg;

  // Extend the config object with the local-NODE_ENV.js custom/local environment. This will override any settings present in the local configuration.
  config = _.merge(config, (fs.existsSync(path.join(process.cwd(), 'config/env/local-' + process.env.NODE_ENV + '.js')) && require(path.join(process.cwd(), 'config/env/local-' + process.env.NODE_ENV + '.js'))) || {});

  // Initialize global globbed files
  initGlobalConfigFiles(config, assets);

  // Initialize global globbed folders
  initGlobalConfigFolders(config, assets);

  // Validate Secure SSL mode can be used
  validateSecureMode(config);

  // Print a warning if config.domain is not set
  validateDomainIsSet(config);

  // Expose configuration utilities
  config.utils = {
    getGlobbedPaths: getGlobbedPaths
  };

  return config;
};

/**
 * Set configuration object
 */
module.exports = initGlobalConfig();
