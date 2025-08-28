import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/admin/HeaderAdmin";

export default function LayoutAdmin() {
  return (
    <div className="">
      <HeaderAdmin />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
