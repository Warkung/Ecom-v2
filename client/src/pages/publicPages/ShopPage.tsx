import { useEffect, useState } from "react";
import ProductCard from "../../components/public/shop/ProductCard";
import useEcomStore from "../../store/ecomStore";

export default function ShopPage() {
  const { products, actionGetProducts } = useEcomStore((state) => state);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await actionGetProducts(undefined);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [actionGetProducts]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Discover Our Products
      </h1>

      {isLoading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No products found. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
