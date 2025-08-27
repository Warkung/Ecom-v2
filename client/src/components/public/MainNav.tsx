import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-xl font-semibold text-gray-700">
              <Link
                to="/"
                className="text-gray-800 text-xl font-bold hover:text-gray-700"
              >
                Logo
              </Link>
            </div>
            <Link
              to="/"
              className="py-2 px-3 text-gray-700 rounded hover:bg-gray-200"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="py-2 px-3 text-gray-700 rounded hover:bg-gray-200"
            >
              Shop
            </Link>
            <Link
              to="/cart"
              className="py-2 px-3 text-gray-700 rounded hover:bg-gray-200"
            >
              Cart
            </Link>
          </div>
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

          {/* Mobile Logo */}
          <div className="md:hidden">
            <Link
              to="/"
              className="text-gray-800 text-xl font-bold hover:text-gray-700"
            >
              Logo
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X /> : <AlignJustify />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col items-start mt-2 space-y-1">
            <Link
              to="/"
              className="py-2 px-3 w-full text-left text-gray-700 rounded hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="py-2 px-3 w-full text-left text-gray-700 rounded hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/cart"
              className="py-2 px-3 w-full text-left text-gray-700 rounded hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </Link>
            <hr className="my-2 border-gray-200 w-full" />
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
          </div>
        </div>
      </nav>
    </header>
  );
}
