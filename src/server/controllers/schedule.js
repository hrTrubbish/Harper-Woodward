const { scheduleModel } = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const response = await scheduleModel.get();
      return res.status(200).send({
        success: true,
        message: 'Successfully fetched schedule',
        response,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: error.message });
    }
  },
  post: async (req, res) => {
    try {
      const response = await scheduleModel.post(req.body);
      return res.status(200).send({
        success: true,
        message: 'Successfully created schedule',
        response,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: error.message });
    }
  },
  patch: async (req, res) => {
    try {
      const response = await scheduleModel.patch(
        req.params.id,
        req.body,
      );
      return res.status(200).send({
        success: true,
        message: 'Successfully updated schedule',
        response,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: error.message });
    }
  },
  remove: async (req, res) => {
    try {
      const response = await scheduleModel.remove(
        req.params.id,
      );
      return res.status(200).send({
        success: true,
        message: 'Successfully deleted schedule',
        response,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: error.message });
    }
  },
};
