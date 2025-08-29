import axios from "axios";
const URL = import.meta.env.VITE_URL_API;

export const litsCategory = async () => await axios.get(`${URL}/category`);

export const createCategory = async (
  token: string | null,
  form: { name: string }
) => {
  return await axios.post(`${URL}/category`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeCategory = async (
  token: string | null,
  id: string | number
) => {
  return await axios.delete(`${URL}/category/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
