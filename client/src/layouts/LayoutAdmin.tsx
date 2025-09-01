import { Outlet } from "react-router-dom";
import MainNav from "../components/public/MainNav";
import { adminNavLinks } from "../utils/link";

export default function LayoutAdmin() {
  return (
    <div className="">
      <MainNav navLinks={adminNavLinks} hidden={true} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
