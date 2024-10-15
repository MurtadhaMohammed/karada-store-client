"use client";
import Image from "next/image";
import Container from "../UI/Container/container";
import { useState } from "react";
import style from "./style.module.css";

const Categories = ({ isBanner = true, list = [] }) => {
  const [selected, setSelected] = useState(list.length ? list[0].name : "");

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
              onClick={() => setSelected(el.name)}
            >
              <div className="w-[48px] h-[48px] rounded-full relative overflow-hidden ">
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
