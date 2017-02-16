'use strict';

/**
 * Module dependencies.
 */
require('dotenv').config()
var path = require('path');
var app = require(path.resolve('./config/lib/app'));

app.init(function () {
  console.log('Initialized test automation');
});
