import axios from "axios";
const URL = import.meta.env.VITE_URL_API;

export const createUserCart = async (token, form) =>
  await axios.post(`${URL}/user/cart`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getUserCart = async (token) =>
  await axios.get(`${URL}/user/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const saveAddress = async (token, address) =>
  await axios.post(
    `${URL}/user/address`,
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );