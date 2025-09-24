// Import Swiper React components
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function SwiperShowProducts({ children }: { children: any }) {
  return (
    <section>
      <div className="container mx-auto px-4">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
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
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {children}
        </Swiper>
      </div>
    </section>
  );
}
