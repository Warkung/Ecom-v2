import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { LoaderCircle } from "lucide-react";
import { saveOrder } from "../../api/user";
import useEcomStore from "../../store/ecomStore";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const { token, clearCart } = useEcomStore((state) => state);
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (payload.error) {
      setMessage(payload.error.message || "An unexpected error occurred.");
    } else if (payload.paymentIntent.status === "succeeded") {
      try {
        await saveOrder(token!, payload);
        clearCart();
        navigate("/user/history");
      } catch (error) {
        console.log(error);
        setMessage("Order saved, but failed to update order history.");
      }
    } else {
      setMessage(
        "Payment processing. We'll update you when payment is received."
      );
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion" as const,
  };

  return (
    <form
      className=" flex flex-col justify-center gap-4 shadow-lg rounded-lg max-w-md mx-auto p-4 bg-gray-200 dark:bg-gray-800"
      id="payment-form"
      onSubmit={handleSubmit}
    >
      <PaymentElement
        className="w-full"
        id="payment-element"
        options={paymentElementOptions}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        {isLoading ? (
          <>
            <LoaderCircle className="animate-spin" />
            <p> Loading...</p>
          </>
        ) : (
          <span id="button-text">Pay now</span>
        )}
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
