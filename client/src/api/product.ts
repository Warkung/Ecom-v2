import axios from "axios";

const URL = import.meta.env.VITE_URL_API;

export const createProduct = async (token: string | null, form: any) =>
  await axios.post(`${URL}/product`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const listProducts = async (count = 10) =>
  await axios.get(`${URL}/products/${count}`);

export const readProduct = async (id: string) =>
  await axios.get(`${URL}/product/${id}`);

export const updateProduct = async (token: string, id: string, form: any) =>
  await axios.put(`${URL}/product/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteProduct = async (token: string | null, id: string) =>
  await axios.delete(`${URL}/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const searchFilters = async (arg: any) =>
  await axios.post(`${URL}/search/filters`, arg);
