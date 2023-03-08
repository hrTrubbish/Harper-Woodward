const scheduleController = require('./schedules');
const tourController = require('./tours');
const transactionController = require('./transactions');
const stripeController = require('./stripe');

module.exports = {
  scheduleController,
  tourController,
  transactionController,
  stripeController,
};
