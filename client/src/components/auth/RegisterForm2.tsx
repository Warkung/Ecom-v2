import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { toast } from "react-toastify";
import { registerAPI } from "../../api/auth";
import { set } from "lodash";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm2() {
  // React hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
  });

  const [checkPasswordStrength, setCheckPasswordStrength] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const passwordScore = zxcvbn(data.password).score;
    if (passwordScore < 3) {
      setCheckPasswordStrength(true);
      return;
    }
    try {
      await registerAPI(data);
      toast.success("Registration successful! Please log in.", {
        position: "bottom-right",
        autoClose: 2000,
      });
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.message || error.message, {
        position: "bottom-right",
      });
    } finally {
      setCheckPasswordStrength(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form
        className=" shadow-md rounded px-8 pt-6 pb-8 mb-4 border"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl mb-6 text-center font-bold ">Create Account</h2>

        {/* Email input */}
        <div className="mb-6">
          <label
            className="text-sm font-bold mb-2 flex justify-between"
            htmlFor="email"
          >
            <p>Email</p>
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            placeholder="you@example.com"
            id="email"
            type="text"
            {...register("email")}
          />
        </div>

        {/* Input password */}
        <div className="">
          <label
            className="flex justify-between text-sm font-bold mb-2"
            htmlFor="password"
          >
            <p>Password</p>
            {errors.password ? (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            ) : (
              checkPasswordStrength && (
                <p className="text-red-500 text-xs italic">
                  Password is too weak
                </p>
              )
            )}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              placeholder="••••••••••••••••"
              {...register("password")}
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
            className="flex justify-between  text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            <p>Confirm Password</p>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.confirmPassword.message}
              </p>
            )}
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="••••••••••••••••"
              {...register("confirmPassword", { required: true, minLength: 6 })}
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
