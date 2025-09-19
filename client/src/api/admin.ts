import axios from "axios";

const URL = import.meta.env.VITE_URL_API;

export const listAllUsers = async (token: string) =>
  await axios.get(`${URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getOrder = async (token: string) =>
  await axios.get(`${URL}/admin/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const changeOrderStatus = async (
  token: string,
  form: { orderId: number; orderStatus: string }
) =>
  await axios.patch(`${URL}/admin/order-status`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const changeUserStatus = async (
  token: string,
  form: { id: number; enabled: boolean }
) =>
  await axios.post(`${URL}/change-status`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const changeUserRole = async (
  token: string,
  form: { id: number; role: "admin" | "user" }
) =>
  await axios.post(`${URL}/change-role`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
