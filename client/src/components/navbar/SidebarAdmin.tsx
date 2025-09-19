import { NavLink, Link } from "react-router-dom";
import { LogOut, Store } from "lucide-react";
import { ModeToggle } from "../darkmode/mode-toggle";
import useEcomStore from "../../store/ecomStore";
import { adminNavLinks } from "../../utils/link";

// These links can be moved to a separate file like `src/utils/links.ts`

export default function SidebarAdmin({ isOpen }: { isOpen: boolean }) {
  const { user } = useEcomStore((state) => state);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("ecom-store");
      window.location.href = "/";
    }
  };

  // Style definitions for NavLink
  const activeLink =
    "flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50";
  const inactiveLink =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50";

  return (
    <aside
      className={`fixed z-20 h-full w-64 border-r bg-white transition-transform duration-300 ease-in-out dark:bg-gray-950 md:static md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-16 items-center border-b px-6 justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Store className="h-6 w-6" />
            <span className="text-lg">Admin Panel</span>
          </Link>
          <ModeToggle />
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-4 text-sm font-medium">
            {adminNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                // The `end` prop is important for the root-level link to not stay active for child routes
                end={link.path === "/admin"}
                className={({ isActive }) =>
                  isActive ? activeLink : inactiveLink
                }
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="truncate">
                <p className="font-semibold text-sm truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-500 transition-all hover:bg-red-100 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
