import axios from "axios";
const URL = import.meta.env.VITE_URL_API;

export const uploadFiles = async (token: string | null, file: any) =>
  await axios.post(
    `${URL}/images/upload`,
    { image: file },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const removeImage = async (
  token: string | undefined,
  public_id: string
) =>
  await axios.post(
    `${URL}/images/remove`,
    { public_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
