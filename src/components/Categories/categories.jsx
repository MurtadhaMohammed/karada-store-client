"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Container from "../UI/Container/container";
import style from "./style.module.css";
import { useAppStore } from "@/lib/store";
import { IMAGE_URL } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Wrapper = ({ children, ...props }) =>
  props?.href ? (
    <Link {...props}>{children}</Link>
  ) : (
    <div {...props}>{children}</div>
  );

const Categories = ({ isBanner = true, list = [] }) => {
  const { selectedCategoryId, setSelectedCategoryId } = useAppStore();
  const searchParams = useSearchParams();
  const categoryRefs = useRef({}); // Store refs for each category item

  useEffect(() => {
    // Initialize selected category based on URL query param or the first item
    const initCategoryId = searchParams.get("init");

    if (list.length > 0) {
      if (initCategoryId) {
        const targetId = parseInt(initCategoryId);
        setSelectedCategoryId(targetId);
      } else if (!selectedCategoryId) {
        setSelectedCategoryId(list[0].id);
      }
    }
  }, [list, searchParams]); // Run when list or search params change

  useEffect(() => {
    // Scroll the selected category into view when selectedCategoryId changes
    if (selectedCategoryId && categoryRefs.current[selectedCategoryId]) {
      categoryRefs.current[selectedCategoryId].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedCategoryId]);

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
  };

  return (
    <div className={isBanner ? "border-b border-b-[#f6f6f6]" : ""}>
      <Container noPadding>
        <div className="flex items-center justify-center md:pt-8 md:pb-8 pt-4 pb-4 gap-6 overflow-auto no-scrollbar md:pl-0 md:pr-0 pl-[16px] pr-[16px]">
          {list.map((el) => (
            <Wrapper
              key={el?.id}
              {...(isBanner
                ? { href: `/categories?init=${el?.id}` }
                : { onClick: () => handleCategoryClick(el.id) })}
              // innerRef={(elRef) => (categoryRefs?.current[el.id] = elRef)}
              className={`${
                selectedCategoryId === el?.id && !isBanner ? style.catItem : ""
              } flex items-center justify-center flex-col active:scale-95 transition-all cursor-pointer`}
            >
              <div className="md:w-[68px] md:h-[68px] w-[48px] h-[48px] relative overflow-hidden">
                <Image
                  src={`${IMAGE_URL}/${el?.img}`}
                  alt={el?.title}
                  fill
                  style={{ objectFit: "contain" }} 
                />
              </div>
              <p
                className={`mt-[8px] text-[14px] text-nowrap ${
                  !isBanner && selectedCategoryId === el.id
                    ? "text-[#7c3aed]"
                    : "text-gray-700"
                }`}
              >
                {el?.title}
              </p>
            </Wrapper>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
