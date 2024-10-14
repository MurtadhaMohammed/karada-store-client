"use client";
import Image from "next/image";
import Container from "../UI/Container/container";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useState } from "react";

const slider = [0, 1, 2];

export default async function SliderBanner() {
  const [current, setCurrent] = useState(0);

  const res = await fetch(
    "http://85.208.51.126:3002/api/client/banner/all-banners"
  );
  const data = await res.json();

  console.log(data.banners);

  return (
    <div className=" mt-[16px] mb-[16px] w-full">
      <Container noPadding>
        <div className="flex flex-col justify-center items-center">
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            onSlideChange={(e) => setCurrent(e?.activeIndex)}
            className="w-[100%]"
          >
            {data.banners?.map((el) =>
              el.type === "Single" ? (
                <SwiperSlide key={el.id} className="pl-[16px] pr-[16px]">
                  <div className="w-[100%] h-[140px] relative rounded-[16px] overflow-hidden pb-[20px] inline-block shadow-md">
                    <Image
                      src={el.img}
                      layout="fill"
                      alt={el.title || "Banner"}
                      objectFit="cover"
                    />
                  </div>
                </SwiperSlide>
              ) : null 
            )}
          </Swiper>

          <div className="flex items-center gap-[4px] mt-[4px]">
            {slider?.map((el, i) => (
              <span
                key={i}
                className="block  h-[6px]  rounded-[24px] transition-all"
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
