const stripe = require('stripe')(
  process.env.STRIPE_SECRET_KEY,
);
const logger = require('../middleware/logger');

module.exports = {
  checkout: async (req, res) => {
    const price = await stripe.prices.create({
      currency: 'usd',
      unit_amount: 69,
      product_data: {
        name: 'Your upcoming stream access',
      },
    });
    try {
      const session = await stripe.checkout.sessions.create(
        {
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url:
            'http://localhost:5173/checkout?success=true',
          cancel_url:
            'http://localhost:5173/checkout?cancelled=true',
        },
      );

      // TODO: Move transactions and update statistics here to save to db
      // need to send statuses and redirect
      res.redirect(303, session.url);
    } catch (error) {
      logger.error(error);
    }
  },
};
