const { videoModel } = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const videos = await videoModel.getAllVideos();
      return res.status(200).send(videos);
    } catch (err) {
      return err;
    }
  },
  post: async (req, res) => {
    try {
      await videoModel.addVideo(req.body);
      return res
        .status(201)
        .send({ body: req.body, message: 'video added!' });
    } catch (err) {
      return err;
    }
  },
  patch: async (req, res) => {
    try {
      await videoModel.updateVideo(
        req.params.videoId,
        req.body,
      );
      return res.status(200).send('asset updated');
    } catch (err) {
      return err;
    }
  },
  delete: async (req, res) => {
    try {
      await videoModel.deleteVideo(req.params.videoId);
      return res.status(200).send('deleted!');
    } catch (err) {
      return err;
    }
  },
};
