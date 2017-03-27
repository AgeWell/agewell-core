'use strict';

/**
 * Module dependencies
 */
const path = require('path');
const moment = require('moment');
const config = require(path.resolve('./config/config'));

/**
 * Groceries to gos module init function.
 */
module.exports = function(app, db) {
  app.use(function (req, res, next) {
    let options = {
      Order: {
        order: orderDates(),
        delivery: deliveryDates()
      }
    };

    Object.assign(req.options, options);
    next();
  });
};

function orderDates() {
  let dates = [];
  let base = getBase();

  dates.push(moment().startOf('week').add('days', base + 3));
  dates.push(moment().startOf('week').add('days', base + 10));
  // dates.push(moment().startOf('week').add('days', base + 17));

  return dates;
}

function deliveryDates() {
  let dates = [];
  let base = getBase();

  dates.push(moment().startOf('week').add('days', base + 4));
  dates.push(moment().startOf('week').add('days', base + 11));
  // dates.push(moment().startOf('week').add('days', base + 18));

  return dates;
}

function getBase() {
  let day = moment().weekday();

  if (day > 2) {
    return 7;
  }

  return 0;
}
