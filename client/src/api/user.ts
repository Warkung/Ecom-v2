import axios from "axios";
import type { PayloadType } from "../interface/api";
const URL = import.meta.env.VITE_URL_API;

export const getUserData = async (token: string) =>
  await axios.get(`${URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

export const saveAddress = async (token: string, address: string) =>
  await axios.post(
    `${URL}/user/address`,
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const saveOrder = async (token: string, payload: PayloadType) =>
  await axios.post(`${URL}/user/order`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getOrder = async (token: string) =>
  await axios.get(`${URL}/user/order`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  
// export const deleteCart = async (token: string) =>
//   await axios.delete(`${URL}/user/cart`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
