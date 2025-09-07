import { useState, type ChangeEvent, type FormEvent } from "react";
import useEcomStore from "../../store/ecomStore";
import { toast } from "react-toastify";
import { createProduct } from "../../api/product";
import UploadImage from "./UploadImage";

// In a real application, you might get this type from your backend/API client
// For example, if using Prisma: import { Category } from '@prisma/client';

const initState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
};

export default function ProductCreateForm({
  handleCreateFormVisible,
}: {
  handleCreateFormVisible: () => void;
}) {
  const { categories, token } = useEcomStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    images: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      toast.success(res.data.title + " created successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setForm(initState);
      handleCreateFormVisible();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="p-8 max-w-xl m-auto border shadow-lg rounded-lg my-10">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium ">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2  border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium ">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2  border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium ">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="mt-1 block w-full px-3 py-2  border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium ">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full px-3 py-2  border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium ">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
            className="border shadow-md capitalize mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option className="text-gray-500 font-bold" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option
                className="text-gray-500 "
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <UploadImage
          form={form}
          setForm={setForm}
          setIsLoading={setIsLoading}
        />

        <div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? "loading..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
