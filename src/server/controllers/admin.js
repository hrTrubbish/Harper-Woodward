const { adminModel } = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const response = await adminModel.get();
      return res.status(200).send({
        success: true,
        message: 'Successfully fetched statistics',
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
      const response = await adminModel.post(req.body);
      return res.status(201).send({
        success: true,
        message: 'Successfully created statistics',
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
      const response = await adminModel.patch(
        req.params.userId,
        req.body,
      );
      return res.status(203).send({
        success: true,
        message: 'Successfully updated statistics',
        response,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: error.message });
    }
  },
};
