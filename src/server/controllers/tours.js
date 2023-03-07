const { tourModel } = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const response = await tourModel.get();
      return res.status(200).send({
        success: true,
        message: 'Successfully fetched tour',
        response,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const response = await tourModel.getOne(
        req.params.tourId,
      );
      return res.status(200).send({
        success: true,
        message: 'Successfully fetched one tour',
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
      const response = await tourModel.post(req.body);
      return res.status(201).send({
        success: true,
        message: 'Successfully created tour',
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
      const response = await tourModel.patch(
        req.params.tourId,
        req.body,
      );
      return res.status(203).send({
        success: true,
        message: 'Successfully updated tour',
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
      const response = await tourModel.remove(
        req.params.tourId,
      );
      return res.status(203).send({
        success: true,
        message: 'Successfully deleted tour',
        response,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: error.message });
    }
  },
};
