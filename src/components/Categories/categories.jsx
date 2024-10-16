"use client";
import Image from "next/image";
import Container from "../UI/Container/container";
import { useState } from "react";
import style from "./style.module.css";

const list = [
  {
    name: "مايكروفون",
    img: "/images/micophone.png",
  },
  {
    name: "شاشات",
    img: "/images/moniter.png",
  },
  {
    name: "تجميعات",
    img: "/images/pc.png",
  },
  {
    name: "سماعات",
    img: "/images/speaker.png",
  },
  {
    name: "كامرات",
    img: "/images/camera.png",
  },
  {
    name: "Smart watch",
    img: "/images/smart.png",
  },
];

const Categories = ({ isBanner = true, categories }) => {
  const [selected, setSelected] = useState("مايكروفون");

  return (
    <div className={isBanner ? "border-b border-b-[#f6f6f6]" : ""}>
      <Container noPadding>
        <div className="flex items-center pt-4 pb-4 gap-6 overflow-auto no-scrollbar pl-[16px] pr-[16px] ">
          {list.map((el, i) => (
            <div
              key={i}
              className={`${
                !isBanner && selected === el.name ? style.catItem : ""
              } flex items-center justify-center flex-col active:scale-95 transition-all`}
              onClick={() => setSelected(el?.name)}
            >
              <div className="w-[48px] h-[48px] relative">
                <Image
                  src={el.img}
                  alt={el.name}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p
                className={`mt-[8px] text-[14px] text-nowrap ${
                  !isBanner && selected === el.name
                    ? "text-[#7c3aed]"
                    : "text-gray-700"
                }`}
              >
                {el.name}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
