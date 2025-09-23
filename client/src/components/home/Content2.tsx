import { Link } from "react-router-dom";
import useEcomStore from "../../store/ecomStore";
import ProductCard from "../shop/ProductCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function Content2() {
  const { products } = useEcomStore((state) => state);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {products.slice(0, 8).map((product) => (
            <SwiperSlide key={product.id}>
              <div className="">
                <img
                  className="h-60 object-bottom  w-full rounded"
                  src={product.images[0].url}
                  alt={product.title}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
    </section>
  );
}
