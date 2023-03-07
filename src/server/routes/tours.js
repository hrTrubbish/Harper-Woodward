const router = require('express').Router();
const {
  tourController: { get, getOne, post, patch, remove },
} = require('../controllers');

router.get('/', get);
router.get('/:tourId', getOne);
router.post('/create', post);
router.patch('/update/:tourId', patch);
router.delete('/delete/:tourId', remove);

module.exports = router;
