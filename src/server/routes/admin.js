const router = require('express').Router();
const { adminController } = require('../controllers');

router.get('/', adminController.getStatistics);
// router.post('/create');
// router.patch('/update/:userId');

module.exports = router;
