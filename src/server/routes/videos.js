const router = require('express').Router();
const controller = require('../controllers/videos.js')

router.get('/', controller.get);
router.post('/create', controller.post);
router.patch('/update/:videoId', controller.patch);
router.delete('/delete/:videoId', controller.delete);

module.exports = router;
