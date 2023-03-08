const router = require('express').Router();
const transactionRoutes = require('./transactions');
const stripeRoutes = require('./stripe');

router.use('/transactions', transactionRoutes);
router.use('/checkout', stripeRoutes);

module.exports = router;
