import { useEffect, useState } from "react";
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export type ImagesType = ImagesType2[];

export interface ImagesType2 {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export default function Content1() {
  const [images, setImages] = useState<ImagesType>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://picsum.photos/v2/list?page=1&limit=15"
      );
      setImages(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : null}
      <Swiper
        pagination={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className=" rounded">
            <img
              className="h-80 w-full object-cover rounded"
              src={image.download_url}
              alt={image.author}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
