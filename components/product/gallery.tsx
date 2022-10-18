/* eslint-disable @next/next/no-img-element */
import { Product } from "interfaces";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

type Props = Pick<Product, "images">;

export default function ProductGallery({ images }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!images.length) {
    return null;
  }

  const OriginalUrl = (url: string): string => {
    return url.split("?")[0];
  };

  const ThumbUrl = (url: string, width = 100, height = 100): string => {
    const original = OriginalUrl(url);
    return `${original}?x-oss-process=image/resize,m_fill,h_${height},w_${width}`;
  };

  return (
    <>
      <Swiper
        autoHeight={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="relative w-full h-[500px]">
              <Image
                alt={image.name}
                src={OriginalUrl(image.src)}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={() => setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="my-5"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img src={ThumbUrl(image.src, 100, 100)} alt={image.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
