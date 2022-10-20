import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper";
import { range } from "lodash";

export default function CommonSwiper() {
  const items = range(1, 9);

  return (
    <>
      <Swiper
        loop={true}
        loopedSlides={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1200: {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 20,
          },
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
      >
        {items.map((i) => (
          <SwiperSlide key={i} className="2xl:!w-[1200px]">
            <div className="py-40 text-center  bg-slate-100 ">Slide {i}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
