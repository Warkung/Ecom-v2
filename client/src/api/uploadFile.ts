import axios from "axios";
const URL = import.meta.env.VITE_URL_API;

export const uploadFiles = async (token, file) =>
  await axios.post(
    `${URL}/images/upload`,
    { image: file },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const removeImage = async (token, public_id) =>
  await axios.post(
    `${URL}/images/remove`,
    { public_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );