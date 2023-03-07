const router = require('express').Router();
const {
  scheduleController: { get, post, patch, remove },
} = require('../controllers');

router.get('/', get);
router.post('/create', post);
router.patch('/update/:streamId', patch);
router.delete('/delete/:streamId', remove);

module.exports = router;
