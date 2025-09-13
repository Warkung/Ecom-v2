import { AlignRight, UserRoundCog } from "lucide-react";
import { Link } from "react-router-dom";
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
  hidden,
}: {
  navLinks: { path: string; label: string }[];
  hidden: boolean;
}) {
  const { user, carts } = useEcomStore((state) => state);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("ecom-store");
      window.location.href = "/";
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

            {navLinks.map((item, index) =>
              item.label !== "cart" ? (
                <Link
                  key={index}
                  to={item.path}
                  className="py-2 px-5  rounded capitalize "
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className="py-2 px-5  rounded relative capitalize"
                >
                  {item.label}
                  {carts.length > 0 && (
                    <span className="text-[12px] rounded-full px-2 bg-red-500 text-gray-100 absolute top-0 right-0">
                      {carts.length}
                    </span>
                  )}
                </Link>
              )
            )}
            {user && user.role === "admin" && (
              <Link
                hidden={hidden}
                to="/admin"
                className="py-2 px-3  rounded  "
              >
                Admin
              </Link>
            )}
          </div>

          {/* Desktop Auth Links */}
          <div className="items-center space-x-4 mx-16 ">
            {user ? (
              <div className="flex items-center gap-4">
                {user && user.role === "admin" && <UserRoundCog />}
                <span className="">{user.name || user.email}</span>
                <button onClick={handleLogout} className="py-2 px-3  rounded ">
                  Logout
                </button>
                <ModeToggle />
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login" className="py-2 px-3  rounded ">
                  Login
                </Link>
                <Link to="/register" className="py-2 px-3  rounded ">
                  Register
                </Link>
                <ModeToggle />
              </div>
            )}
          </div>
        </div>

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
              <div className=" mt-1.5 px-2 rounded-2xl ">
                <UserRoundCog />
              </div>
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
                {navLinks.map((item, index) => (
                  <DropdownMenuItem key={index}>
                    <Link to={item.path}>
                      {item.label !== "cart" ? (
                        item.label
                      ) : (
                        <>
                          {item.label}
                          {carts.length > 0 && (
                            <p className=" absolute top-2 left-10 bg-red-600 px-1.5 rounded-full">
                              {carts.length}
                            </p>
                          )}
                        </>
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {user && user.role === "admin" && (
                  <DropdownMenuItem hidden={hidden}>
                    <Link to={"/admin"}>Admin</Link>
                  </DropdownMenuItem>
                )}
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
