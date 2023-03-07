const router = require('express').Router();
const { stripeController } = require('../controllers');

router.post('/', stripeController.checkout);

module.exports = router;
