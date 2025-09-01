import { useEffect } from "react";
import { removeCategory } from "../../api/category";
import useEcomStore from "../../store/ecomStore";
import { toast } from "react-toastify";

export default function CategoryList({
  fetchCategory,
}: {
  fetchCategory: boolean;
}) {
  const { token, categories, actionGetCategories } = useEcomStore(
    (state) => state
  );

  const handleRemove = async (id: { id: string | number }["id"]) => {
    try {
      if (window.confirm("Are you sure you want to delete this category?")) {
        await removeCategory(token, id);
        toast.success("Category removed successfully");
        actionGetCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) return;
    actionGetCategories();
  }, [fetchCategory]);

  return (
    <div className="w-full max-w-2xl">
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold "
                  >
                    Name
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y ">
                {categories.map((category, index) => (
                  <tr key={category.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm capitalize">
                      {category.name}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() => handleRemove(category.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
