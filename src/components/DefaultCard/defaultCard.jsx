"use client";
import Image from "next/image";
import { PiStarFill } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import IconButton from "../UI/IconButton/iconButton";
import Link from "next/link";
import { IMAGE_URL } from "@/lib/api";

const DefaultCard = ({
  item,
  isGrid = false,
  isFav = false,
  handleRemoveFav = () => {},
}) => {
  return (
    <div
      className={`flex-none rounded-xl flex flex-col border border-[#eee] relative overflow-hidden bg-white active:opacity-50 transition-all`}
      style={{ width: isGrid ? "100%" : 200 }}
    >
      {isFav && (
        <div className="absolute top-2 right-2 z-10">
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

      {item?.discount?.value && (
        <div className="absolute top-4 left-4 z-10 p-2 pt-1 pb-1 rounded-[8px] shadow-lg shadow-[#ff000041] bg-gradient-to-r from-[#ff0000] to-[#fb797b] text-[#fff]">
          {item?.discount?.value}%
        </div>
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
              layout="fill"
              objectFit="cover"
              alt="image"
            />
          </div>
        </div>
        <div className="p-3 pt-2 pb-2 border-t border-t-[#eee] flex flex-col justify-between flex-1 h-[100%]">
          <div>
            <h2 className="font-semih2old text-black text-[14px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              {item?.name}
            </h2>
            <p className="text-gray-600 text-[14px] mt-[1px] whitespace-nowrap overflow-hidden text-ellipsis">
              {item?.description}
            </p>
          </div>
          <div className="flex items-end justify-between mt-[8px]">
            <div>
              {item?.price !== item?.endPrice && (
                <h4 className="text-[14px] font-normal text-[#a5a5a5] line-through">
                  {Number(item?.price).toLocaleString("en")}{" "}
                  <span className="text-[12px]">IQD</span>
                </h4>
              )}

              <h4 className="text-[16px] font-extrabold">
                {Number(item?.endPrice).toLocaleString("en")}{" "}
                <span className="text-[12px]">IQD</span>
              </h4>
            </div>
            <div className="flex gap-1">
              <span className="text-[14px] mt-[4.5px]">3.4</span>
              <PiStarFill className="text-[16px] mt-[6px] text-[#FCA120]" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DefaultCard;
