import axios from "axios";
import type { AuthResponse } from "../interface/api";

const URL = import.meta.env.VITE_URL_API;



export const currentUser = async (
  token: string
): Promise<{ data: AuthResponse }> =>
  await axios.post<AuthResponse>(
    `${URL}/current-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const currentAdmin = async (
  token: string
): Promise<{ data: AuthResponse }> =>
  await axios.post(
    `${URL}/current-admin`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const register = async (form: {
  email: string;
  password: string;
  confirmPassword?: string;
}) => {
  await axios.post(`${URL}/register`, {
    email: form.email,
    password: form.password,
  });
};
