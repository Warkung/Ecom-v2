import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ProductEditForm from "../../components/admin/ProductEditForm";

export default function ProductEdit() {
  return (
    <div className="">
      <Link to="/admin/product" className="inline-block">
        <button className=" inline-flex items-center px-4 py-2 border hover:bg-gray-200 dark:bg-gray-900 hover:dark:bg-gray-800 text-sm font-medium rounded-md shadow-sm  transition-colors">
          <IoArrowBack className="-ml-1 mr-2 h-5 w-5" />
          Back
        </button>
      </Link>
      <div className="">
        <ProductEditForm />
      </div>
    </div>
  );
}
