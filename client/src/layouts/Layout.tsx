import { Outlet } from "react-router-dom";
import MainNav from "../components/public/MainNav";
import { navLinks } from "../utils/link";

export default function Layout() {
  return (
    <div>
      <MainNav navLinks={navLinks} linkAdmin={false} />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
