import axios from "axios";
const URL = import.meta.env.VITE_URL_API;

export const paymentIntent = async (token: string) =>
  await axios.post(
    `${URL}/create-payment-intent`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
