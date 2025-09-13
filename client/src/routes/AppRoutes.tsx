import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/publicPages/HomePage";
import CartPage from "../pages/publicPages/CartPage";
import ShopPage from "../pages/publicPages/ShopPage";
import Register from "../pages/authPages/Register";
import Login from "../pages/authPages/Login";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import DashBoard from "../pages/adminPages/DashBoard";
import Category from "../pages/adminPages/Category";
import Product from "../pages/adminPages/Product";
import LayoutUser from "../layouts/LayoutUser";
import HomeUser from "../pages/userPages/HomeUser";
import Payment from "../pages/userPages/Payment";
import Manage from "../pages/adminPages/Manage";
import ProtectRouteAdmin from "./ProtectRouteAdmin";
import ProtectRouteUser from "./ProtectRouteUser";
import ProductEdit from "../pages/adminPages/ProductEdit";
import Checkout from "../pages/userPages/Checkout";


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
      { path: "/checkout", element: <Checkout /> },
    ],
  },

  // Admin Pages
  {
    path: "/admin",
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <DashBoard /> },
      { path: "/admin/category", element: <Category /> },
      { path: "/admin/product", element: <Product /> },
      { path: "/admin/product/:id", element: <ProductEdit /> },
      { path: "/admin/manage", element: <Manage /> },
    ],
  },

  // User Pages
  {
    path: "/user",
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: "/user/payment", element: <Payment /> },
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}
export default AppRoutes;
