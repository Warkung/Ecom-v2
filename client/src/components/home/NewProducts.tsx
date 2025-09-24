import { useEffect, useState } from "react";
import { sortProducts } from "../../api/product";
import ProductCard from "../shop/ProductCard";
import type { Product } from "../../interface/ecomStore";
import SwiperShowProducts from "../../utils/SwiperShowProducts";
import { SwiperSlide } from "swiper/react";

export default function NewProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSortProducts = async () => {
    try {
      const res = await sortProducts({
        sort: "createdAt",
        order: "desc",
        limit: 10,
      });
      setProducts(res.data.products);
    } catch (error) {
      setError("Failed to fetch best sellers.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSortProducts(); // Corrected typo from fetchSortPorts
  }, []);

  if (loading) {
    return (
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">New Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg p-4 relative">
              <div className="relative overflow-hidden bg-gray-200 h-80 w-full rounded-md">
                <div className="shimmer-animation"></div>
              </div>
              <div className="mt-4 h-6 rounded w-3/4 bg-gray-200"></div>
              <div className="mt-2 h-4 rounded w-1/2 bg-gray-200"></div>
              <div className="absolute top-0 left-0 bg-black bg-opacity-75 text-white text-2xl font-bold py-1 px-3 rounded-br-lg">
                #{i + 1}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">New Products</h2>
      {/* <SwiperShowProducts>
        
      </SwiperShowProducts> */}
      <SwiperShowProducts>
        {products.map((product) => (
          <div key={product.id} className="relative">
            <SwiperSlide>
              <ProductCard product={product} />
            </SwiperSlide>
          </div>
        ))}
      </SwiperShowProducts>
    </section>
  );
}
