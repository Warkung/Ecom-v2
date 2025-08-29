import { AlignRight, UserRoundCog, X } from "lucide-react";
import { Link } from "react-router-dom";
import useEcomStore from "../../store/ecomStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export default function MainNav({
  navLinks,
  linkAdmin,
}: {
  navLinks: { path: string; label: string }[];
  linkAdmin: boolean;
}) {
  const { user, token } = useEcomStore((state) => state);

  const handleLogout = () => {
    localStorage.removeItem("ecom-store");
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container ">
        {/* Desktop Nav */}
        <div className=" hidden md:flex justify-between px-18 py-2">
          {/* Desktop Logo */}
          <div className="flex">
            <div className="text-gray-800 text-2xl font-bold hover:text-gray-700 mr-16">
              <Link to="/">Logo</Link>
            </div>

            {navLinks.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="py-2 px-3 text-gray-700 rounded hover:bg-gray-200 "
              >
                {item.label}
              </Link>
            ))}
            {user && user.role === "admin" && (
              <Link
                hidden={linkAdmin}
                to="/admin"
                className="py-2 px-3 text-gray-700 rounded hover:bg-gray-200 "
              >
                Admin
              </Link>
            )}
          </div>

          {/* Desktop Auth Links */}
          <div className="items-center space-x-4 ">
            {user ? (
              <div className="flex items-center gap-4">
                {user && user.role === "admin" && <UserRoundCog />}
                <span className="text-gray-700">{user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="py-2 px-3 text-gray-700 rounded hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="py-2 px-3 text-gray-700 rounded hover:bg-gray-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-3 text-gray-700 rounded hover:bg-gray-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex justify-between px-6 py-2 sm:px-10 ">
          <div>
            <Link
              to="/"
              className="text-gray-800 text-xl font-bold hover:text-gray-700"
            >
              Logo
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex gap-4">
            {user && user.role === "admin" && <UserRoundCog />}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AlignRight />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {user && (
                  <>
                    <DropdownMenuLabel>
                      {user?.name || user?.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </>
                )}
                {navLinks.map((item, index) => (
                  <DropdownMenuItem key={index}>
                    <Link to={item.path}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                {user ? (
                  <DropdownMenuItem>
                    <button onClick={handleLogout}>Logout</button>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link to={"/login"}>Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={"/register"}>Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
}
