import { useState } from "react";
import ProductCreateForm from "../../components/admin/ProductCreateForm";
import ProductList from "../../components/admin/ProductList";
import { X } from "lucide-react";

function Product() {
  const [isCreateFormVisible, setCreateFormVisible] = useState(false);

  const handleCreateFormVisible = () => {
    setCreateFormVisible(!isCreateFormVisible);
  };

  return (
    <div className=" w-full">
      <div className=" relative">
        <button
          onClick={() => setCreateFormVisible(!isCreateFormVisible)}
          className={`bg-gray-100 hover:bg-gray-50 border-2 absolute w-20 rounded-2xl h-9 font-semibold left-0 dark:bg-white shadow-xl ${
            isCreateFormVisible ? "text-red-700" : "text-green-700"
          }`}
        >
          {isCreateFormVisible ? <X className="m-auto" /> : "Create"}
        </button>
      </div>
      <div
        className={`transition-max-height duration-300 linear overflow-hidden ${
          isCreateFormVisible ? "max-h-[800px]" : "max-h-0"
        }`}
      >
        <ProductCreateForm handleCreateFormVisible={handleCreateFormVisible} />
      </div>
      <div className="mt-20">
        <ProductList updateProduct={isCreateFormVisible}/>
      </div>
    </div>
  );
}
export default Product;
