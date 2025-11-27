"use client";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useAppStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { CgArrowTopLeft } from "react-icons/cg";

const CreatviceCard = ({ index, item }) => {
  const { favorites, toggleFav } = useAppStore();
  // const images = [
  //   "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-50-holiday-iphone-pro-202411_GEO_US?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1729180965302",
  //   "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-50-holiday-watch-s10-202411?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1729694064591",
  //   "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-50-holiday-ipad-mini-202411?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1728504973912",
  //   "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-50-holiday-macbook-pro-202411?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1728492746398"
  // ]

  return (
    <Link href={`/product/${item?.id}`}>
      <div
        // onClick={() => router.push(`/product/${index}`)}
        className={`flex-none rounded-xl flex flex-col sm:shadow-none shadow-md relative overflow-hidden bg-white md:w-[100%] md:h-[300px] w-[254px] h-[350px] active:opacity-50 transition-all`}
      >
        <div className="p-4 pb-0 absolute top-0 left-0 right-0 z-10 text-start ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 border border-[#eeee] rounded-full pl-2 pr-1">
              <div className="w-[40px] h-[40px] bg-white rounded-full relative overflow-hidden ">
                <Image
                  src={item?.brandImg || ""}
                  fill
                  style={{ objectFit: "cover" }}
                  alt="image"
                />
              </div>
              <p className="text-[12px] font-medium truncate overflow-hidden text-ellipsis whitespace-normal line-clamp-1">{item?.brandName}</p>
            </div>
            {favorites?.find((id) => id === item?.id) ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFav(item?.id);
                }}
              >
                <div className=" flex items-center justify-center  h-[30px] w-[30px] rounded-[8px] shadow-lg shadow-[#ff000041] bg-gradient-to-r from-[#ff0000] to-[#fb797b] text-[#fff]">
                  <FaHeart className="text-[18px] text-[#fff]" />
                </div>
              </div>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFav(item?.id);
                }}
                className="flex items-center justify-center  h-[30px] w-[30px] rounded-[8px] bg-gradient-to-r from-[#f6f6f6] to-[#fff] text-[#fff] border border-[#f6f6f6]"
              >
                <FaRegHeart className="text-[18px] text-[#000]" />
              </div>
            )}
          </div>
          <h2 className="font-semih2old text-black text-[16px] md:text-[16px] truncate overflow-hidden text-ellipsis whitespace-normal line-clamp-2 font-semibold mt-[4px] ">
            {item?.name}
          </h2>
        </div>
        <div className="aspect-1 mt-[60px] flex items-center justify-center relative">
          <div className="w-full h-full relative">
            <Image
              // src={images[index]}
              src={item?.thumbnail || ""}
              fill
              style={{ objectFit: "cover" }}
              alt="image"
            />
          </div>
        </div>
        <div className="p-4  absolute bottom-0 left-0 right-0 z-10 text-start ">
         <div className="flex items-end justify-between">
         <div className="mt-[2px]">
            {item?.onSale && (
              <h4 className="text-[16px] font-normal text-[#a5a5a5] line-through">
                {Number(item?.price).toLocaleString("en")}
                <span className="text-[12px]"> د.ع </span>
              </h4>
            )}
            <h4 className="text-[22px] font-extrabold -mt-1">
              {Number(item?.finalPrice).toLocaleString("en")}
              <span className="text-[12px]"> د.ع </span>
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-[#fff] p-3 rounded-full border border-[#7b55f2] text-[#7b55f2]">
              <CgArrowTopLeft className="text-[30px]" />
            </button>
          </div>
         </div>
        </div>
      </div>
    </Link>
  );
};

export default CreatviceCard;
