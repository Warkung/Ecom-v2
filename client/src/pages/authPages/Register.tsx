import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import RegisterForm from "../../components/auth/RegisterForm";

export default function Register() {
  
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
      toast.error("Passwords do not match");
      return;
    }
    try {
      await register(form);
      toast.success("Registration successful! Please log in.", {
        autoClose: 2000,
      });
      navigate("/login");
    } catch (error) {
      let errorMessage = "Registration failed";
      if (
        // AI Fix interface error
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response === "object" &&
        (error as any).response !== null &&
        "data" in (error as any).response &&
        typeof (error as any).response.data === "object" &&
        (error as any).response.data !== null &&
        "message" in (error as any).response.data
      ) {
        errorMessage = (error as any).response.data.message;
      }
      toast.error(errorMessage, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex justify-center items-start pt-6">
      <RegisterForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
