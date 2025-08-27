import axios from "axios";

const URL = import.meta.env.VITE_URL_API;

interface AuthResponse {
    // Add properties based on your API response, for example:
    // id: string;
    // name: string;
    // email: string;
    // role: string;
    [key: string]: any;
}

export const currentUser = async (token: string): Promise<{ data: AuthResponse }> =>
    await axios.post<AuthResponse>(
        `${URL}/current-user`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

export const currentAdmin = async (token: string): Promise<{ data: AuthResponse }> =>
  await axios.post(
    `${URL}/current-admin`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );