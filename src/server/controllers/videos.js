const model = require('../models/videos');

module.exports = {
  get: async (req, res) => {
    try {
      const videos = await model.getAllVideos();
      res.status(200).send(videos);
    } catch (err) {
      console.log(err, 'err');
    }
  },
  post: async (req, res) => {
    try {
      console.log('in videos addVideo')
      model.addVideo(req.body);
      res.status(201).send('in addVideos')
    } catch (err) {
      console.log(err, 'err');
    }
  },
  patch: async (req, res) => {
    try {
      console.log('in videos updateVideo')
    } catch (err) {
      console.log(err, 'err');
    }
  },
  delete: async (req, res) => {
    try {
      console.log('in videos deleteVideo')
    } catch (err) {
      console.log(err, 'err');
    }
  },
};
