import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { litsCategory } from "../api/category";
import { listProducts, searchFilters } from "../api/product";
import _ from "lodash";

const URL = import.meta.env.VITE_URL_API;

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  actionLogin: async (form) => {
    const res = await axios.post(`${URL}/login`, form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  actionGetCategories: async () => {
    try {
      const { data } = await litsCategory();
      set({ categories: data });
    } catch (error) {
      console.log(error);
    }
  },
  actionGetProducts: async (count) => {
    try {
      const { data } = await listProducts(count);
      set({ products: data });
    } catch (error) {
      console.log(error);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const { data } = await searchFilters(arg);
      set({ products: data });
    } catch (error) {
      console.log(error);
    }
  },
  actionAddToCart: async (product) => {
    const carts = get().carts;
    const updateCarts = [...carts, { ...product, count: 1 }];
    const uniqeCarts = _.unionWith(updateCarts, _.isEqual);
    set({ carts: uniqeCarts });
  },
  actionUpdateQuantity: (id, newQuantity) => {
    const carts = get().carts;
    const updateCarts = carts.map((cart) => {
      if (cart.id === id) {
        return { ...cart, count: Math.max(newQuantity, 1) };
      }
      return cart;
    });
    set({ carts: updateCarts });
  },
  actionRemoveFromCart: (id) => {
    const carts = get().carts;
    const updateCarts = carts.filter((cart) => cart.id !== id);
    set({ carts: updateCarts });
  },
  actionClearCart: () => {
    if (window.confirm("Are you sure you want to clear your cart?"))
      set({ carts: [] });
  },
  getTotalPrice: () => {
    const carts = get().carts;
    const totalPrice = carts.reduce((total, cart) => {
      return total + cart.price * cart.count;
    }, 0);
    return totalPrice;
  },
});

const useEcomStore = create(
  persist(ecomStore, {
    name: "ecom-store",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useEcomStore;