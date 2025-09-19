import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import useEcomStore from "../../store/ecomStore";
import { Link, useNavigate } from "react-router-dom";
import type { ErrorResponse, LoginResponse } from "../../interface/auth";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { actionLogin } = useEcomStore((state) => state);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res: LoginResponse = await actionLogin(form);
      const role: string = res.data.payload.role;
      if (role === "admin") {
        navigate(-1);
        toast.success("Admin login successfully", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        navigate(-1);
        toast.success("Wellcome back!", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.response.data || error.message, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="w-full max-w-md">
      <form
        className="shadow-md rounded px-8 pt-6 pb-8 mb-4 border "
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-6 text-center font-bold ">Login</h2>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="you@example.com"
            name="email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block  text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              onChange={handleChange}
              value={form.password}
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="••••••••••••••••"
              className="shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0  bottom-2 right-0 flex items-center pr-3 "
            >
              {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
            </button>
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-2 m-auto text-center">
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
