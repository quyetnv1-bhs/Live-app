import Stripe from "stripe";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(
  "sk_test_51OvaYfP82bSxZnv2oa2nNqiTHRP3tJJVf8qzeA7EZWSh87cOAkRlHfyXtRvF9VlXkIYtYKEeVyBeQ53l4iLc57Cb00LBuupfIf"
);

export async function createCheckoutSession(body: any) {
  const { amount, email, username, operatingTime } = body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      submit_type: "auto",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Payment",
              description: `${username}.`,
            },
            unit_amount: 100,
          },
          quantity: amount,
        },
      ],
      mode: "payment",
      //The timestamp at which the Checkout Session will expire
      expires_at: operatingTime,
      success_url: "http://localhost:3000/checkout",
      cancel_url: "http://localhost:3000/checkout",
    });
    return session;
  } catch (error: any) {
    console.log("ERROR: ", error.message);
  }
}
interface BodyCreateCustomer {
  name?: string;
  email: string;
}
export async function createCustomerStripe(body: BodyCreateCustomer) {
  const { email, name } = body;
  try {
    const customer = await stripe.customers.create({
      name,
      email,
    });
    return customer;
  } catch (error: any) {
    console.log("ERROR: ", error.message);
  }
}
export async function getCustomerStripe(id: string) {
  try {
    const customer = await stripe.customers.retrieve(id);
    return customer;
  } catch (error: any) {
    console.log("ERROR: ", error.message);
  }
}
