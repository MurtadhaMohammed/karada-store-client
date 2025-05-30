"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "../UI/Container/container";
import style from "./style.module.css";
import { useAppStore } from "@/lib/store";
import { IMAGE_URL } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Wrapper = React.forwardRef(({ children, href, ...props }, ref) => {
  const content = (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
});

Wrapper.displayName = "Wrapper";

const Categories = ({ isBanner = true, list = [] }) => {
  const { selectedCategoryId, setSelectedCategoryId } = useAppStore();
  const searchParams = useSearchParams();
  const categoryRefs = useRef({});
  const scrollContainerRef = useRef(null);
  const router = useRouter();
  const [showCircleLeft, setShowCircleLeft] = useState(false);
  const [showCircleRight, setShowCirlcRight] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleScrollToBothSides = (side) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: side === "left" ? -500 : 500,
        behavior: "smooth",
      });
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 500);
    }
  };
  const getCategoryPosition = searchParams.get("init");
  const getCategoryPositionId = getCategoryPosition
    ? parseInt(getCategoryPosition, 10)
    : null;

  useEffect(() => {
    if (getCategoryPositionId && categoryRefs.current[getCategoryPositionId]) {
      categoryRefs.current[getCategoryPositionId].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [getCategoryPositionId, list]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      const NMaxScrollLeft = maxScrollLeft * -1;

      if (scrollLeft > NMaxScrollLeft + 1) {
        setShowCircleLeft(true);
      } else {
        setShowCircleLeft(false);
      }
        if(scrollLeft < 0) {
          setShowCirlcRight(true);
        } else {
          setShowCirlcRight(false);
        }
    }
  };

  const handleCategoryClick = (id) => {
    if (isBanner) return;
    setSelectedCategoryId(id);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("init", id);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const initCategoryId = searchParams.get("init");
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const { scrollWidth, clientWidth } = scrollContainer;
      setShowCircleLeft(scrollWidth > clientWidth);

      scrollContainer.addEventListener("scroll", handleScroll);
    }

    // if (selectedCategoryId && categoryRefs.current[selectedCategoryId]) {
    //   categoryRefs.current[selectedCategoryId].scrollIntoView({
    //     behavior: "smooth",
    //     block: "center",
    //     inline: "center",
    //   });
    // }

    if (list.length > 0) {
      if (initCategoryId) {
        const targetId = parseInt(initCategoryId);
        setSelectedCategoryId(targetId);
      } else if (!selectedCategoryId) {
        setSelectedCategoryId(list[0].id);
      }
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [list, searchParams]);

  return (
    <div className={isBanner ? "border-b border-b-[#eee]" : ""}>
      <Container noPadding>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex z-1 items-center md:pt-8 md:pb-8 pt-4 pb-4 gap-4 pl-[16px] pr-[16px] md:pl-0 md:pr-0 overflow-x-auto no-scrollbar "
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
            {showCircleLeft && (
             <>
              <div
                className={`absolute left-[6px] w-[48px] h-[48px] rounded-full bg-[#f6f6f6] z-10 flex items-center justify-center cursor-pointer shadow-md border-none animate-scaling transition-transform duration-400 ${
                  isClicked ? "scale-75" : ""
                } hidden md:flex`}
                onClick={() => handleScrollToBothSides("left")}
              >
                <MdKeyboardArrowLeft size={30} />
              </div>
             </>
            )}
            {showCircleRight && (
               <div
               className={`absolute right-[6px] w-[48px] h-[48px] rounded-full bg-[#f6f6f6] z-10 flex items-center justify-center cursor-pointer shadow-md border-none animate-scaling transition-transform duration-400 ${
                 isClicked ? "scale-75" : ""
               } hidden md:flex`}
               onClick={() => handleScrollToBothSides("right")}
             >
               <MdKeyboardArrowRight size={30} />
             </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Categories;
