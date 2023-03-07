const router = require('express').Router();
// const authRoutes = require('./auth');
const tourRoutes = require('./tours');
const scheduleRoutes = require('./schedule');
const adminRoutes = require('./admin');
const transactionRoutes = require('./transactions');
const videoRoutes = require('./videos');

// router.use('/auth', authRoutes);
router.use('/tours', tourRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/admin', adminRoutes);
router.use('/transactions', transactionRoutes);
router.use('/videos', videoRoutes);

module.exports = router;
