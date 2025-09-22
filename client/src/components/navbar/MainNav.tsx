import { AlignRight, UserRoundCog } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useEcomStore from "../../store/ecomStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggle } from "../darkmode/mode-toggle";

export default function MainNav({
  navLinks,
}: {
  navLinks: { path: string; label: string }[];
}) {
  const { user, carts, actionLogout } = useEcomStore((state) => state);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      actionLogout();
      navigate("/");
      
      // or
      // localStorage.removeItem("ecom-store");
      // window.location.href = "/";
    }
  };

  return (
    <header className="shadow-md dark:shadow-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-50">
      <nav className="container w-full ">
        {/* Desktop Nav */}
        <div className=" hidden md:flex justify-between w-screen py-2">
          {/* Desktop Logo */}
          <div className="flex ">
            <div className="text-2xl font-bold  mx-16">
              <Link to="/">Logo</Link>
            </div>

            {navLinks.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `py-2 px-5 rounded capitalize relative transition-colors ${
                    isActive
                      ? "bg-gray-100 dark:bg-gray-700 font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                {item.label}
                {item.label === "cart" && carts.length > 0 && (
                  <span className="text-[12px] rounded-full px-2 bg-red-500 text-gray-100 absolute top-0 right-0">
                    {carts.length}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Links */}
          <div className="items-center space-x-4 mx-16 ">
            {user ? (
              <div className="flex items-center gap-4">
                {user && user.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `p-2 rounded-full transition-colors ${
                        isActive
                          ? "bg-gray-100 dark:bg-gray-700"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`
                    }
                  >
                    <UserRoundCog />
                  </NavLink>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400">
                      <img
                        src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-svg-download-png-456322.png?f=webp&w=256"
                        alt={user?.name || user?.email}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {user.name || user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/user/history">History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <ModeToggle />
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `py-2 px-3 rounded transition-colors ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-700"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `py-2 px-3 rounded transition-colors ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-700"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  Register
                </NavLink>
                <ModeToggle />
              </div>
            )}
          </div>
        </div>

        {/* Mobile */}
        {/* Mobile */}
        {/* Mobile */}
        <div className="md:hidden flex justify-between px-6 py-2  ">
          <div>
            <Link to="/" className=" text-xl font-bold hover:">
              Logo
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex gap-4">
            {user && user.role === "admin" && (
              <Link to="/admin" className=" mt-1.5 px-2 rounded-2xl ">
                <UserRoundCog />
              </Link>
            )}

            <ModeToggle />
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
                {navLinks.map((item, index) => {
                  const isCart = item.label === "cart";
                  return (
                    <DropdownMenuItem key={index} asChild>
                      <NavLink
                        to={item.path}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                          `capitalize w-full ${isActive ? "font-bold" : ""}`
                        }
                      >
                        <div className="flex justify-between w-full items-center">
                          <span>{item.label}</span>
                          {isCart && carts.length > 0 && (
                            <span className="text-xs rounded-full px-1.5 bg-red-500 text-gray-100">
                              {carts.length}
                            </span>
                          )}
                        </div>
                      </NavLink>
                    </DropdownMenuItem>
                  );
                })}
                {/* {user && user.role === "admin" && (
                  <DropdownMenuItem hidden={hidden} asChild>
                    <NavLink
                      to={"/admin"}
                      className={({ isActive }) =>
                        `w-full ${isActive ? "font-bold" : ""}`
                      }
                    >
                      Admin
                    </NavLink>
                  </DropdownMenuItem>
                )} */}
                <DropdownMenuSeparator />
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                          `w-full ${isActive ? "font-bold" : ""}`
                        }
                      >
                        Profile
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left"
                      >
                        Logout
                      </button>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to={"/login"}
                        className={({ isActive }) =>
                          `w-full ${isActive ? "font-bold" : ""}`
                        }
                      >
                        Login
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to={"/register"}
                        className={({ isActive }) =>
                          `w-full ${isActive ? "font-bold" : ""}`
                        }
                      >
                        Register
                      </NavLink>
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
