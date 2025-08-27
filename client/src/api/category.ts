import axios from "axios";

const URL = import.meta.env.VITE_URL_API;

export const litsCategory = async () => await axios.get(`${URL}/category`);

export const createCategory = async (token,form) => {
  return await axios.post(`${URL}/category`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeCategory = async (token, id) => {
  return await axios.delete(`${URL}/category/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};