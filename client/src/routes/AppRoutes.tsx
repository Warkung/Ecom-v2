import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/publicPages/HomePage";
import ShopPage from "../pages/publicPages/ShopPage";
import CartPage from "../pages/publicPages/CartPage";
import Register from "../pages/authPages/Register";
import Login from "../pages/authPages/Login";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import DashBoard from "../pages/adminPages/DashBoard";
import Category from "../pages/adminPages/Category";
import Product from "../pages/adminPages/Product";
import LayoutUser from "../layouts/LayoutUser";
import HomeUser from "../pages/userPages/HomeUser";
import Checkout from "../pages/userPages/checkout";
import Payment from "../pages/userPages/Payment";

const router = createBrowserRouter([
  // Public Pages
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },

  // Admin Pages
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <DashBoard /> },
      { path: "/admin/category", element: <Category /> },
      { path: "/admin/product", element: <Product /> },
    ],
  },

  // User Pages
  {
    path: "/user",
    element: <LayoutUser />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: "/user/checkout", element: <Checkout /> },
      { path: "/user/payment", element: <Payment /> },
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}
export default AppRoutes;
