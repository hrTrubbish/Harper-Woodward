const { transactionModel } = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const response = await transactionModel.get();
      return res.status(200).send({
        success: true,
        message: 'Successfully fetched transactions',
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
      const response = await transactionModel.post(
        req.body,
      );
      return res.status(201).send({
        success: true,
        message: 'Successfully created transaction',
        response,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: error.message });
    }
  },
};
