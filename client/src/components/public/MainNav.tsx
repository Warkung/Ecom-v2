import { AlignRight, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useEcomStore from "../../store/ecomStore";
import { navLinks } from "../../utils/link";



export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
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
                to="/admin"
                className="py-2 px-3 text-gray-700 rounded hover:bg-gray-200 "
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Desktop Auth Links */}
          <div className="items-center space-x-4 ">
            {user ? (
              <>
                <span className="text-gray-700">
                  Hello, {user.name || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="py-2 px-3 text-gray-700 rounded hover:bg-gray-200"
                >
                  Logout
                </button>
              </>
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
          <div className="">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X /> : <AlignRight />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-white absolute right-4 sm:right-8 shadow-xl rounded-2xl px-8  ${
            isOpen ? "max-h-screen" : "max-h-0 "
          }`}
        >
          <div className="flex flex-col items-start mt-2 space-y-1">
            {navLinks.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className="py-2 px-3 w-full text-left text-gray-700 rounded hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className="py-2 px-3 w-full text-left text-gray-700 rounded hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            )}
            <hr className="my-2 border-gray-200 w-full" />
            {user ? (
              <div className="flex flex-col w-full">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="py-2 px-3 w-full text-left text-gray-700 rounded hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <Link
                  to="/login"
                  className="py-2 px-3 w-full text-left text-gray-700 rounded hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-3 w-full text-left text-gray-700 rounded hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
