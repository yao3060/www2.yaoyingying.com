import React, { useEffect } from "react";
import Layout from "layouts/one-column-layout";
import CommonSwiper from "components/common/swiper";
import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

export default function PackageSwiper() {
  const code = `
import React from "react";
import { range } from "lodash";

import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Navigation, Pagination } from "swiper";

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
    `;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Layout title="Swiper + React Example">
      <div className="pb-10">
        <CommonSwiper />
        <h3 className="mt-10 mb-5 text-2xl font-bold">Code Example</h3>
        <pre>
          <code className={`language-javascript`}>{code}</code>
        </pre>
      </div>
    </Layout>
  );
}
