"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { FreeMode, Thumbs, Pagination } from "swiper/modules";

const Slider = ({ photos }: { photos: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-3 md:p-4">
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        pagination={{
          dynamicBullets: false,
          clickable: true,
        }}
        modules={[FreeMode, Thumbs, Pagination]}
        className="mySwiper2 h-[50vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] rounded-xl overflow-hidden"
      >
        {photos?.map((photo, index) => {
          return (
            <SwiperSlide key={index}>
              <Zoom>
                <img
                  src={photo}
                  className="h-[50vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] object-cover mx-auto w-full"
                  loading="lazy"
                />
              </Zoom>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        // @ts-ignore
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={8}
        breakpoints={{
          0: { slidesPerView: 5 },
          640: { slidesPerView: 7 },
          768: { slidesPerView: 8 },
          1024: { slidesPerView: 10 },
        }}
        freeMode={true}
        watchSlidesProgress={true}
        pagination={{
          dynamicBullets: false,
          clickable: true,
        }}
        modules={[FreeMode, Thumbs, Pagination]}
        className="mySwiper mt-4"
      >
        {photos?.map((photo, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={photo}
                className="h-full w-full object-cover cursor-pointer rounded-lg border border-gray-200"
                loading="lazy"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
