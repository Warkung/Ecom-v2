import { useState } from "react";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-start pt-6">
      <LoginForm
        handleChange={handleChange}
        form={form}
      />
    </div>
  );
}