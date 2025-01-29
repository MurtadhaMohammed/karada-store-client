"use client";
import Image from "next/image";
import { PiStarFill } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import IconButton from "../UI/IconButton/iconButton";
import Link from "next/link";
import { IMAGE_URL } from "@/lib/api";
import useIsScreenMd from "@/hooks/useIsScreenMd";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { isEnglish } from "@/helper/isEnglish";

const DefaultCard = ({
  item,
  isGrid = false,
  isFav = false,
  bannerType = "LIST",
  handleRemoveFav = () => {},
}) => {
  // const isScreenMd = useIsScreenMd();
  const { favorites, toggleFav } = useAppStore();

  return (
    <div
      className={`flex-none rounded-xl flex flex-col border border-[#eee] relative overflow-hidden bg-white active:opacity-50 transition-all ${
        isGrid ? "w-[100%]" : "md:w-[100%]  w-[200px]"
      }`}
      style={
        bannerType === "OfferBanner" ? { border: "4px solid #a88fea" } : {}
      }
    >
      {isFav && (
        <div className="absolute top-2 left-2 z-10">
          <IconButton
            onClick={(e) => {
              e.stopPropagation(); // Stop event from bubbling up
              handleRemoveFav(item?.id);
            }}
            className="bg-[#f6f6f6] p-2 rounded-full"
            icon={<CgClose className="text-[18px]" />}
          />
        </div>
      )}

      {item?.discount && item?.discount?.active === true && (
        <div className="absolute top-4 right-4 z-10 p-2 pt-1 pb-1 rounded-[8px] shadow-lg shadow-[#0004ff41] bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] text-[14px] discount-effect">
          {item?.discount?.value || 40}%
        </div>
      )}

      {!isFav ? (
        favorites?.find((id) => id === item?.id) ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleFav(item?.id);
            }}
            className="absolute flex items-center justify-center top-3 left-3 z-10 h-[32px] w-[32px] rounded-[8px] shadow-lg shadow-[#ff000041] bg-gradient-to-r from-[#ff0000] to-[#fb797b] text-[#fff]"
          >
            <FaHeart className="text-[18px] text-[#fff]" />
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleFav(item?.id);
            }}
            className="absolute flex items-center justify-center top-3 left-3 z-10 h-[32px] w-[32px] rounded-[8px] bg-gradient-to-r from-[#f6f6f6] to-[#fff] text-[#fff] border border-[#f6f6f6]"
          >
            <FaRegHeart className="text-[18px] text-[#000]" />
          </div>
        )
      ) : (
        ""
      )}

      <Link href={`/product/${item?.id}`} className="flex flex-col h-full">
        <div className={`flex items-center justify-center`}>
          <div
            className={`w-full relative ${
              isGrid ? "aspect-w-1 aspect-h-1" : "h-[200px]"
            }`}
          >
            <Image
              src={`${IMAGE_URL}/${item?.thumbnail1}`}
              fill
              style={{ objectFit: "cover" }}
              alt="image"
            />
          </div>
        </div>
        <div className="p-3 pt-2 pb-2 border-t border-t-[#eee] flex flex-col justify-between flex-1 h-[100%]">
          <div>
            <h2 className={`font-semih2old text-black text-[14px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis ${isEnglish(item?.name) ? "dots" : ""}`}>
              {item?.name}
            </h2>
            <p className={`text-gray-600 text-[14px] mt-[1px] whitespace-nowrap overflow-hidden text-ellipsis ${isEnglish(item?.shortDescription) ? "dots" : ""}`}>
              {item?.shortDescription}
            </p>
          </div>
          <div className="flex items-end justify-between mt-[8px]">
            <div>
              {item?.price !== item?.endPrice && (
                <h4 className="text-[14px] font-normal text-[#a5a5a5] line-through">
                  {Number(item?.price).toLocaleString("en")}
                  <span className="text-[12px]">IQD</span>
                </h4>
              )}

              <h4 className="text-[16px] font-extrabold -mt-1">
                <span className="text-[12px]"> IQD </span>
                {Number(item?.endPrice).toLocaleString("en")}
              </h4>
            </div>
            {/* <div className="flex gap-1">
              <span className="text-[14px] mt-[4.5px]">3.4</span>
              <PiStarFill className="text-[16px] mt-[6px] text-[#FCA120]" />
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DefaultCard;
