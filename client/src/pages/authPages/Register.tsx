import { useState } from "react";
import RegisterForm from "../../components/auth/RegisterForm";

export default function Register() {

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
      <RegisterForm form={form} handleChange={handleChange} />
    </div>
  );
}
