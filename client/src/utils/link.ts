import {
  LayoutDashboard,
  ShoppingBasket,
  Tags,
  ShoppingCart,
  Users,
} from "lucide-react";

export const navLinks = [
  {
    path: "/",
    label: "home",
  },
  {
    path: "/shop",
    label: "shop",
  },
  {
    path: "/cart",
    label: "cart",
  },
  {
    path: "/user/history",
    label: "history",
  },
];

export const adminNavLinks = [
  {
    path: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/admin/product",
    label: "Products",
    icon: ShoppingBasket,
  },
  {
    path: "/admin/category",
    label: "Categories",
    icon: Tags,
  },
  {
    path: "/admin/orders",
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    path: "/admin/manage",
    label: "manage",
    icon: Users,
  },
];
