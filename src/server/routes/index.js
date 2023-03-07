const router = require('express').Router();
// const authRoutes = require('./auth');
const tourRoutes = require('./tours');
const scheduleRoutes = require('./schedules');
const adminRoutes = require('./admin');
const transactionRoutes = require('./transactions');
const videoRoutes = require('./videos');
const stripeRoutes = require('./stripe');

// router.use('/auth', authRoutes);
router.use('/tours', tourRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/admin', adminRoutes);
router.use('/transactions', transactionRoutes);
router.use('/videos', videoRoutes);
router.use('/checkout', stripeRoutes);

module.exports = router;
