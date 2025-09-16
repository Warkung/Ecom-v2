import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useEcomStore from "../../store/ecomStore";
import { paymentIntent } from "../../api/stripe";

const stripePromise = loadStripe(
  "pk_test_51RureYFx4enKsVHP9L26frof30yzQgvdl8l8GqdwcyF3HrtOZhUuyLjvK2aalV98GYrVJFMWMKCHPowchJMKRBOh008bmr6QB7"
);

function Payment() {
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
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  useEffect(() => {
    fetchPayment();
  }, []);

  return <div>Payment</div>;
}
export default Payment;
