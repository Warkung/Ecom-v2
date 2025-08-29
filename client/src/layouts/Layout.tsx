import { Outlet } from "react-router-dom";
import MainNav from "../components/public/MainNav";
import { navLinks } from "../utils/link";
import { ModeToggle } from "../components/darkmode/mode-toggle";
import { ThemeProvider } from "../components/darkmode/theme-provider";

export default function Layout() {
  return (
    <div>
      <MainNav navLinks={navLinks} linkAdmin={false} />
      <div className="absolute top-20 right-4"></div>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
