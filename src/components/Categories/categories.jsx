"use client";

import { useEffect } from "react";
import Image from "next/image";
import Container from "../UI/Container/container";
import style from "./style.module.css";
import { useAppStore } from "@/lib/store";
import { IMAGE_URL } from "@/lib/api";

const Categories = ({ isBanner = true, list = [] }) => {
  const { selectedCategoryId, setSelectedCategoryId } = useAppStore();

  useEffect(() => {
    if (list.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(list[0].id);
    }
  }, [list, selectedCategoryId, setSelectedCategoryId]);

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
  };

  console.log(list)

  return (
    <div className={isBanner ? "border-b border-b-[#f6f6f6]" : ""}>
      <Container noPadding>
        <div className="flex items-center pt-4 pb-4 gap-6 overflow-auto no-scrollbar pl-[16px] pr-[16px]">
          {list.map((el) => (
            <div
              key={el.id}
              onClick={() => handleCategoryClick(el.id)}
              className={`${
                selectedCategoryId === el.id && !isBanner ? style.catItem : ""
              } flex items-center justify-center flex-col active:scale-95 transition-all cursor-pointer`}
            >
              <div className="w-[48px] h-[48px] rounded-full relative overflow-hidden">
                <Image
                  src={`${IMAGE_URL}/${el.img}`}
                  alt={el.name}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p
                className={`mt-[8px] text-[14px] text-nowrap ${
                  !isBanner ? "text-gray-700" : "text-[#7c3aed]"
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
