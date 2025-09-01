import { Outlet } from "react-router-dom";
import MainNav from "../components/public/MainNav";
import { navLinks } from "../utils/link";

export default function Layout() {
  return (
    <div>
      <MainNav navLinks={navLinks} hidden={false} />
      <main className="container mx-auto px-6 mt-6">
        <Outlet />
      </main>
    </div>
  );
}
