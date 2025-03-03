"use client";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import IconButton from "../UI/IconButton/iconButton";
import Link from "next/link";
import { IMAGE_URL } from "@/lib/api";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useAppStore } from "@/lib/store";
// import { isEnglish } from "@/helper/isEnglish";

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
        isGrid ? "w-[100%]" : "md:w-[100%]  w-[186px]"
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

      {
        item?.discount?.end_at > new Date() &&
        item?.discount?.active === true && (
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
          >
            <div className="absolute flex items-center justify-center top-3 left-3 z-10 h-[32px] w-[32px] rounded-[8px] shadow-lg shadow-[#ff000041] bg-gradient-to-r from-[#ff0000] to-[#fb797b] text-[#fff]">
              <FaHeart className="text-[18px] text-[#fff]" />
            </div>
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
              isGrid ? "aspect-w-1 aspect-h-1" : "h-[186px]"
            }`}
          >
            <Image
              src={`${IMAGE_URL}/${item?.thumbnail1}`}
              fill
              style={{ objectFit: "cover" }}
              alt="image"
              placeholder="blur"
              blurDataURL={
                "data:image/png;base64,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"
              }
            />
          </div>
        </div>
        <div className="p-3 pt-2 pb-2 border-t border-t-[#eee] flex flex-col justify-between flex-1 h-[100%]">
          <div>
            <h2
              className={`font-semih2old text-black text-[14px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis`}
            >
              {item?.name}
            </h2>
            <p
              className={`text-gray-600 text-[14px] mt-[1px] whitespace-nowrap overflow-hidden text-ellipsis`}
            >
              {item?.shortDescription}
            </p>
          </div>
          <div className="flex items-end justify-between mt-[8px]">
            <div>
              {item?.price !== item?.endPrice && (
                <h4 className="text-[14px] font-normal text-[#a5a5a5] line-through">
                  {Number(item?.price).toLocaleString("en")}
                  <span className="text-[12px]"> د.ع </span>
                </h4>
              )}

              <h4 className="text-[16px] font-extrabold -mt-1">
                {Number(item?.endPrice).toLocaleString("en")}
                <span className="text-[12px]"> د.ع </span>
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
