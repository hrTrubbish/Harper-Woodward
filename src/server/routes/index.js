const router = require('express').Router();
const tourRoutes = require('./tours');
const scheduleRoutes = require('./schedules');
const transactionRoutes = require('./transactions');
const stripeRoutes = require('./stripe');

router.use('/tours', tourRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/transactions', transactionRoutes);
router.use('/checkout', stripeRoutes);

module.exports = router;
