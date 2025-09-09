import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecomStore";
import ProductCard from "../../components/public/shop/ProductCard";
import CartCard from "../../components/public/shop/CartCard";
import SearchCard from "../../components/public/shop/SearchCard";

export default function ShopPage() {
  const { products, actionGetProducts } = useEcomStore((state) => state);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    actionGetProducts(undefined);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-0 w-full min-h-screen relative">
      {/* Toggle button for search on small screens */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 bg-blue-500 text-white px-4 py-2 rounded shadow"
        onClick={() => setShowSearch((prev) => !prev)}
      >
        {showSearch ? "Hide Search" : "Show Search"}
      </button>

      {/* search Bar - hidden on small screens, toggled by button */}
      <div
        className={`order-1 md:order-none md:w-1/4 w-full bg-gray-200 p-4 ${
          showSearch ? "block" : "hidden"
        } md:block fixed md:static top-0 left-0 h-full z-10 md:h-auto md:z-auto`}
        style={{ maxWidth: "400px" }}
      >
        {/* <SearchCard /> */}
      </div>

      {/* product list */}
      <div className="order-2 md:order-none md:w-2/4 w-full bg p-2 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>

      {/* cart */}
      <div className="order-3 md:order-none md:w-1/4 w-full bg-gray-200 p-4 overflow-y-auto">
        <CartCard />
      </div>
    </div>
  );
}
