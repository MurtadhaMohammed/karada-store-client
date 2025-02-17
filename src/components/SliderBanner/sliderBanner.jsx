"use client";
import Image from "next/image";
import Container from "../UI/Container/container";
import { useAppStore } from "@/lib/store";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IMAGE_URL } from "@/lib/api";
import { useEffect } from "react";

// Import Swiper styles
import "swiper/css";
import { useState } from "react";
import Link from "next/link";

export default function SliderBanner({ banners, title }) {
  const { setPageTitle } = useAppStore();
  const [current, setCurrent] = useState(0);
  const slider = banners?.slider;
  useEffect(() => {
    setPageTitle(title);
  }, []);

  if (banners?.banner_ids?.length === 0) return;
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
              <SwiperSlide
                key={el?.id}
                className="md:pl-0 md:pr-0 pl-[16px] pr-[16px]"
              >
                <Link
                  href={`/products/banner/${el?.id}`}
                  className="w-[100%] md:aspect-[3.5] aspect-3 relative rounded-[16px] overflow-hidden pb-[20px] inline-block shadow-md active:opacity-50 transition-all"
                >
                  <Image
                    src={`${IMAGE_URL}/${el?.img}`}
                    fill
                    alt={el?.title || "Banner"}
                    style={{ objectFit: "cover" }}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center gap-[4px] md:mt-[8px] mt-[4px]">
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
