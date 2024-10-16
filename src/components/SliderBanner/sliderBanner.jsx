"use client";
import Image from "next/image";
import Container from "../UI/Container/container";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IMAGE_URL } from "@/lib/api";

// Import Swiper styles
import "swiper/css";
import { useState } from "react";

export default function SliderBanner({ banners }) {
  const [current, setCurrent] = useState(0);

  const slider = banners?.slider;
  return (
    <div className="mt-[16px] mb-[16px] w-full">
      <Container noPadding>
        <div className="flex flex-col justify-center items-center">
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            onSlideChange={(e) => setCurrent(e?.activeIndex)}
            className="w-[100%]"
          >
            {slider?.map((el) => (
              <SwiperSlide key={el.id} className="pl-[16px] pr-[16px]">
                <div className="w-[100%] h-[140px] relative rounded-[16px] overflow-hidden pb-[20px] inline-block shadow-md">
                  <Image
                    src={`${IMAGE_URL}/${el.img}`}
                    layout="fill"
                    alt={el.title || "Banner"}
                    objectFit="cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center gap-[4px] mt-[4px]">
            {slider?.map((el, i) => (
              <span
                key={i}
                className="block h-[6px] rounded-[24px] transition-all"
                style={{
                  width: current === i ? 50 : 6,
                  background: current === i ? "#ddd" : "#eee",
                }}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
