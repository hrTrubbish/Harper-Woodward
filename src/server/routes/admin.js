const router = require('express').Router();
const {
  adminController: { get, post, patch },
} = require('../controllers');

router.get('/', get);
router.post('/create', post);
router.patch('/update/:userId', patch);

module.exports = router;
