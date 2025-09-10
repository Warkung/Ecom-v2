import axios from "axios";
const URL = import.meta.env.VITE_URL_API;

export const createUserCart = async (token: string, form: any) =>
  await axios.post(`${URL}/user/cart`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getUserCart = async (token: string) =>
  await axios.get(`${URL}/user/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const saveAddress = async (token: string, address: any) =>
  await axios.post(
    `${URL}/user/address`,
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );