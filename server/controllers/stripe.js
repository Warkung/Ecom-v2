const internalErr = require("../utils/InternalError");
const prisma = require("../config/prisma");

const stripe = require("stripe")(
  "sk_test_51RureYFx4enKsVHP3yaxYjS4Tm92D36ZpiZ432pp12PrY6YNlcDDKKV6WbCmvJe2jf9UuvBWvpi5PkwoyIvo60F800NcUxboRM"
);

exports.payment = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: req.user.id,
      },
    });

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cart.cartTotal * 100,
      currency: "thb",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    internalErr(res, error);
  }
};
