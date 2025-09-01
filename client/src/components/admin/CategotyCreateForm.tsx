import { useState, type FormEvent, type ChangeEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useEcomStore from "../../store/ecomStore";
import { createCategory } from "../../api/category";
import { toast } from "react-toastify";

export default function CategotyCreateForm({
  handleCategory,
}: {
  handleCategory: () => void;
}) {
  const [name, setName] = useState("");
  const { token } = useEcomStore((state) => state);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCategory(token, { name });
      toast.success("Category Created", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setName("");
      handleCategory();
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: "bottom-right",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center gap-2"
    >
      <Input
        onChange={handleChange}
        type="text"
        placeholder="Category Name"
        value={name}
      />
      <Button type="submit" variant="outline">
        Create
      </Button>
    </form>
  );
}
