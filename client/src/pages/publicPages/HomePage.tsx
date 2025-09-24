import { useEffect } from "react";
import Content1 from "../../components/home/Content1";
import useEcomStore from "../../store/ecomStore";
import Content2 from "../../components/home/Content2";
import BestSeller from "../../components/home/BestSeller";
import NewProducts from "../../components/home/NewProducts";

function HomePage() {
  const { actionGetProducts } = useEcomStore((state) => state);

  useEffect(() => {
    actionGetProducts(undefined);
  }, [actionGetProducts]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-24 py-12">
        <Content1 />
        <Content2 />
        <BestSeller />
        <NewProducts />
      </div>
    </div>
  );
}
export default HomePage;
