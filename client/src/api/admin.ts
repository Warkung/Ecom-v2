import axios from "axios";

const URL = import.meta.env.VITE_URL_API;

export const getOrder = async (token: string) =>
  await axios.get(`${URL}/admin/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const changeOrderStatus = async (
  token: string,
  form: { orderId: number; orderStatus: string }
) =>
  await axios.patch(`${URL}/admin/order-status`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
