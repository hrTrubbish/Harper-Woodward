const router = require('express').Router();
const {
  transactionController: { get, post },
} = require('../controllers');

router.get('/', get);
router.post('/create', post);

module.exports = router;
