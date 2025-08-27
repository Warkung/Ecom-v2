import { Link, Outlet } from "react-router-dom";
import MainNav from "../components/public/MainNav";

export default function Layout() {
  return (
    <div>
      <MainNav />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
