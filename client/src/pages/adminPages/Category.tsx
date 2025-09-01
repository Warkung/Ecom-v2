import { useState } from "react";
import CategoryList from "../../components/admin/CategoryList";
import CategotyCreateForm from "../../components/admin/CategotyCreateForm";

function Category() {
  const [fetchCategory, setFetchCategory] = useState(false);

  const handleCategory = () => setFetchCategory(!fetchCategory);
  return (
    <div >
      <CategotyCreateForm handleCategory={handleCategory} />
      <CategoryList fetchCategory={fetchCategory} />
    </div>
  );
}
export default Category;
