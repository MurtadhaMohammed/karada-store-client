"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "../UI/Container/container";
import style from "./style.module.css";
import { useAppStore } from "@/lib/store";
import { IMAGE_URL } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

const Wrapper = ({ children, ...props }) =>
  props?.href ? (
    <Link {...props}>{children}</Link>
  ) : (
    <div {...props}>{children}</div>
  );

const Categories = ({ isBanner = true, list = [] }) => {
  const { selectedCategoryId, setSelectedCategoryId } = useAppStore();
  const searchParams = useSearchParams();
  const categoryRefs = useRef({});
  const scrollContainerRef = useRef(null);
  const [showCircle, setShowCircle] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleScrollToLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -2000,
        behavior: "smooth",
      });
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 500);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      setShowCircle(scrollLeft > -100);
    }
  };

  const checkOverflow = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowCircle(scrollWidth > clientWidth); 
    }
  };

  useEffect(() => {
    const initCategoryId = searchParams.get("init");
    const scrollContainer = scrollContainerRef.current;

    checkOverflow();

    if (selectedCategoryId && categoryRefs.current[selectedCategoryId]) {
      categoryRefs.current[selectedCategoryId].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }

    if (list.length > 0) {
      if (initCategoryId) {
        const targetId = parseInt(initCategoryId);
        setSelectedCategoryId(targetId);
      } else if (!selectedCategoryId) {
        setSelectedCategoryId(list[0].id);
      }
    }

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [list, selectedCategoryId, searchParams]);

  return (
    <div className={isBanner ? "border-b border-b-[#f6f6f6]" : ""}>
      <Container noPadding>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex z-1 items-center justify-center md:pt-8 md:pb-8 pt-4 pb-4 gap-6 overflow-auto no-scrollbar md:pl-0 md:pr-0 pl-[16px] pr-[16px]"
          >
            {list.map((el) => (
              <Wrapper
                key={el?.id}
                {...(isBanner
                  ? { href: `/categories?init=${el?.id}` }
                  : { onClick: () => handleCategoryClick(el?.id) })}
                ref={(elRef) => (categoryRefs.current[el.id] = elRef)}
                className={`${
                  selectedCategoryId === el?.id && !isBanner
                    ? style.catItem
                    : ""
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
            {showCircle && (
              <div
                className={`${style.circle} ${isClicked ? "active" : ""} `}
                onClick={handleScrollToLeft}
              >
                <MdKeyboardArrowLeft size={30} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Categories;
