import axios from "axios";

const URL = import.meta.env.VITE_URL_API;

export const getOrder = async (token: string) =>
  await axios.get(`${URL}/admin/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
