const adminController = require('./admin');
const scheduleController = require('./schedules');
const tourController = require('./tours');
const videoController = require('./videos');
const transactionController = require('./transactions');
const stripeController = require('./stripe');

module.exports = {
  adminController,
  scheduleController,
  tourController,
  videoController,
  transactionController,
  stripeController,
};
