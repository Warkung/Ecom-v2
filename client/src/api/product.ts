import axios from "axios";

const URL = import.meta.env.VITE_URL_API;

export const createProduct = async (token,form) =>
  await axios.post(`${URL}/product`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const listProducts = async (count = 10) =>
  await axios.get(`${URL}/products/${count}`);

export const readProduct = async (id) =>
  await axios.get(`${URL}/product/${id}`);

export const updateProduct = async (token, id, form) =>
  await axios.put(`${URL}/product/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteProduct = async (token, id) =>
  await axios.delete(`${URL}/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const searchFilters = async (arg) =>
  await axios.post(`${URL}/search/filters`, arg);