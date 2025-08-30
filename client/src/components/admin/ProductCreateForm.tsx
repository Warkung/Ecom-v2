import { useEffect, useState, type FormEvent } from "react";
import useEcomStore from "../../store/ecomStore";
import { toast } from "react-toastify";
import { createProduct } from "../../api/product";
import UploadFiles from "./UploadFile";
import { LoaderCircle } from "lucide-react";

const initState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
};

export default function ProductCreateForm({
  handleDisplay,
}: {
  handleDisplay: () => void;
}) {
  const { token, categories, actionGetCategories } = useEcomStore(
    (state) => state
  );
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    images: [],
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
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

      toast.success(res.data.title + " created successfully");
      handleDisplay();
      setForm(initState);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  const handleResetForm = () => {
    setForm(initState);
  };

  useEffect(() => {
    actionGetCategories();
  }, []);

  return (
    <>
      <style>{formStyles}</style>
      <div className="form-container">
        <div className="relative">
          <h2 className="form-title">Create New Product</h2>
          <button
            className="absolute top-0 right-0 bg-red-600 shadow-md px-2 py-1 font-bold text-md rounded-full text-white hover:bg-red-700"
            onClick={handleResetForm}
          >
            {" "}
            reset
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter product title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
              required
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
            >
              <option value="" disabled className="capitalize">
                Select a category
              </option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  className="capitalize"
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <UploadFiles
            form={form}
            setForm={setForm}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />

          <button
            disabled={isLoading}
            type="submit"
            className={isLoading ? "submit-button disabled" : "submit-button"}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                Loading...{" "}
                <LoaderCircle color="#fff" className="animate-spin" />
              </span>
            ) : (
              "Create Product"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

const formStyles = `
    .form-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      background-color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    .form-title {
      text-align: center;
      font-size: 1.75rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    .form-row {
      display: flex;
      gap: 1rem;
    }
    .form-row .form-group {
      flex: 1;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #374151;
      font-size: 1rem;
    }
    .form-group input,
    .form-group textarea,
    .form-group select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      box-sizing: border-box;
      transition: border-color 0.2s, box-shadow 0.2s;
      font-size: 1rem;
    }
    .form-group input[type="file"] {
      padding: 0.5rem;
    }
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
    .submit-button {
      width: 100%;
      padding: 0.8rem;
      border: none;
      border-radius: 6px;
      background-color: #3b82f6;
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s;
      margin-top: 1rem;
    }
    .submit-button:hover {
      background-color: #2563eb;
      transform: translateY(-1px);
    }
  `;
