const model = require('../models/videos');

module.exports = {
  get: async (req, res) => {
    try {
      const videos = await model.getAllVideos();
      res.status(200).send(videos);
    } catch (err) {
      console.error(err);
    }
  },
  post: async (req, res) => {
    try {
      model.addVideo(req.body);
      res.status(201).send({ body: req.body, message: 'video added!' });
    } catch (err) {
      console.error(err);
    }
  },
  patch: async (req, res) => {
    try {
      model.updateVideo(req.params.videoId, req.body);
      res.status(200).send('asset updated');
    } catch (err) {
      console.error(err);
    }
  },
  delete: async (req, res) => {
    try {
      model.deleteVideo(req.params.videoId);
      res.status(200).send('deleted!');
    } catch (err) {
      console.error(err);
    }
  },
};
