import { useEffect } from "react";
import { Link } from "react-router-dom";
import Content1 from "../../components/home/Content1";
import ProductCard from "../../components/shop/ProductCard";
import useEcomStore from "../../store/ecomStore";
import Content2 from "../../components/home/Content2";

function HomePage() {
  const { products, actionGetProducts } = useEcomStore((state) => state);

  useEffect(() => {
    actionGetProducts(undefined);
  }, [actionGetProducts]);

  return (
    <div>
      <Content1 />
      <Content2 />


      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {products.slice(0, 8).map((product) => (
              // Assuming product has a unique `_id`. Using it for the key is a best practice.
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {products.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/shop"
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section> */}
    </div>
  );
}
export default HomePage;
