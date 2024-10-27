"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    if (list.length > 0 && !selectedCategoryId && !searchParams.get("init"))
      setSelectedCategoryId(list[0].id);
    else if (searchParams.get("init"))
      setSelectedCategoryId(parseInt(searchParams.get("init")));
  }, [list]);

  return (
    <div className={isBanner ? "border-b border-b-[#f6f6f6]" : ""}>
      <Container noPadding>
        <div className="flex items-center justify-center md:pt-8 md:pb-8 pt-4 pb-4 gap-6 overflow-auto no-scrollbar md:pl-0 md:pr-0 pl-[16px] pr-[16px]">
          {list.map((el) => (
            <Wrapper
              {...(isBanner
                ? { href: `/categories?init=${el?.id}` }
                : { onClick: () => setSelectedCategoryId(el.id) })}
              key={el.id}
              className={`${
                selectedCategoryId === el.id && !isBanner ? style.catItem : ""
              } flex items-center justify-center flex-col active:scale-95 transition-all cursor-pointer`}
            >
              <div className="md:w-[68px] md:h-[68px] w-[48px] h-[48px] rounded-[12px] relative overflow-hidden">
                <Image
                  src={`${IMAGE_URL}/${el.img}`}
                  alt={el.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p
                className={`mt-[8px] text-[14px] text-nowrap ${
                  !isBanner && selectedCategoryId === el.id
                    ? "text-[#7c3aed]"
                    : "text-gray-700"
                }`}
              >
                {el.title}
              </p>
            </Wrapper>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
