import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export interface ImageType {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export default function Content1() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      const res = await axios.get(
        "https://picsum.photos/v2/list?page=1&limit=15"
      );
      setImages(res.data);
    } catch (error) {
      setError("Failed to fetch images.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="h-96 w-full">
      {isLoading ? (
        <div className="h-full w-full bg-gray-200 rounded-lg animate-pulse"></div>
      ) : error ? (
        <div className="flex justify-center items-center h-full bg-red-100 text-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      ) : (
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="mySwiper h-full"
        >
          {images.slice(0, 5).map((image) => (
            <SwiperSlide key={image.id} className="relative">
              <div className="absolute inset-0 bg-opacity-40 z-10"></div>
              <img
                className="h-full w-full object-cover"
                src={image.download_url}
                alt={image.author}
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white p-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Discover Your Style
                </h1>
                <p className="max-w-2xl mb-8 text-lg md:text-xl">
                  Browse our curated collection of premium products, designed to
                  elevate your everyday.
                </p>
                <Link
                  to="/shop"
                  className="bg-white text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-200 transition-colors duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
