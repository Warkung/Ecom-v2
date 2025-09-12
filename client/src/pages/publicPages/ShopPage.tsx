import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecomStore";
import SearchCardv2 from "../../components/shop/SearchCardv2";
import ProductCard from "../../components/shop/ProductCard";
import CartCard from "../../components/shop/CartCard";

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
        className=" md:hidden fixed top-14  right-4 z-20 bg-blue-500 text-white  px-4 py-2 rounded shadow-2xl"
        onClick={() => setShowSearch((prev) => !prev)}
      >
        {showSearch ? "Hide Search" : "Show Search"}
      </button>

      {/* search Bar - hidden on small screens, toggled by button */}
      <div
        className={`order-1 md:order-none md:w-1/4 w-full  p-4 ${
          showSearch ? "block" : "hidden"
        } md:block fixed md:static top-0 left-0 h-full z-10 md:h-auto md:z-auto`}
        style={{ maxWidth: "400px" }}
      >
        <SearchCardv2 />
      </div>

      {/* product list */}
      <div className="order-2 md:order-none md:w-2/4 w-full p-2 overflow-y-auto ">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>

      {/* cart */}
      <div className="order-3 md:order-none md:w-1/4 w-full p-4 overflow-y-auto ">
        <CartCard />
      </div>
    </div>
  );
}
