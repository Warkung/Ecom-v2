import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import zxcvbn from "zxcvbn";

interface InputType {
  email: string;
  password: string;
}

const validate = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "hello" }),
});



export default function RegisterTest() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(validate),
  });

  const email = watch("email");
  const password = watch("password", "");
  const passwordStrength = zxcvbn(password);

  const submit = (data: InputType) => {
    if (data) console.log(data);
  };

  return (
    <div>
      <form
        className="flex flex-col gap-2 w-64"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex justify-between">
          <label htmlFor="email">
            <p>Email</p>
          </label>
          <input
            className="border"
            type="text"
            id="email"
            {...register("email")}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="password">
            <p>Password</p>
            {errors && <p>{errors.password?.message}</p>}
          </label>
          <input
            className="border"
            type="text"
            id="password"
            {...register("password")}
          />
        </div>
        <button className=" border w-full">OK</button>
      </form>
      <p>{email}</p>
      <p>{password}</p>
    </div>
  );
}
