import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useEcomStore from "../../store/ecomStore";
import { paymentIntent } from "../../api/stripe";
import CheckoutForm from "../../components/stripe/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function Payment() {
  console.log(import.meta.env.VITE_STRIPE_KEY);

  const { token } = useEcomStore((state) => state);
  const [clientSecret, setClientSecret] = useState("");

  const fetchPayment = async () => {
    try {
      const res = token && (await paymentIntent(token));
      if (res && res.data && res.data.clientSecret) {
        setClientSecret(res.data.clientSecret);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const appearance = {
    theme: "stripe" as "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  useEffect(() => {
    fetchPayment();
  }, []);

  return (
    <div>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
export default Payment;
