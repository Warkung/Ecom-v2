import { useState } from "react";
import LoginForm from "../../components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecomStore";
import type { LoginResponse, ErrorResponse } from "../../interface/auth";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { user, token, actionLogin } = useEcomStore((state) => state);

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
          autoClose: 2000,
        });
      } else {
        navigate(-1);
        toast.success("Wellcome back!", {
          autoClose: 2000,
        });
      }
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      toast.error(
        err.response?.data?.message || "Login failed. Please try again.,",
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
    }
  };

  return (
    <div className="flex justify-center items-start pt-6">
      <LoginForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
