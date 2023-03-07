const router = require('express').Router();
const { videoController } = require('../controllers');

router.get('/', videoController.get);
router.post('/create', videoController.post);
router.patch('/update/:videoId', videoController.patch);
router.delete('/delete/:videoId', videoController.delete);

module.exports = router;
