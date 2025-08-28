import { useState, type FormEvent } from "react";

export default function CreateCategoryForm() {
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement API call to create category
    console.log("Creating category:", name);
  };

  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Create New Category
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="e.g. Electronics"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
}
