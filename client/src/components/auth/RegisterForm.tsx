import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match", {
        position: "bottom-right",
      });
      return;
    }
    try {
      await register(form);
      toast.success("Registration successful! Please log in.", {
        position: "bottom-right",
        autoClose: 2000,
      });
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full max-w-md">
      <form
        className=" shadow-md rounded px-8 pt-6 pb-8 mb-4 border"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-6 text-center font-bold ">Create Account</h2>
        <div className="mb-6">
          <label className="block  text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            onChange={handleChange}
            name="email"
            value={form.email}
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Input password */}
        <div className="">
          <label className="block  text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
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

        {/* Confirm password */}
        <div className="mb-6">
          <label
            className="block  text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
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
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
