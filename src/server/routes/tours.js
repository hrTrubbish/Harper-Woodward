const router = require('express').Router();
const {
  tourController: { get, post, patch, remove },
} = require('../controllers');

router.get('/', get);
router.post('/create', post);
router.patch('/update/:tourId', patch);
router.delete('/delete/:tourId', remove);

module.exports = router;
