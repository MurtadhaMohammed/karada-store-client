"use client";
import useIsScreenMd from "@/hooks/useIsScreenMd";
import { IMAGE_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

const CreatviceCard = ({ index, item }) => {
  const isScreenMd = useIsScreenMd();
  const colors = [
    "bg-gradient-to-br from-gray-100 to-white",
    "bg-gradient-to-br from-white to-gray-100",
  ];

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
        className={`flex-none rounded-xl flex flex-col sm:shadow-none shadow-md relative overflow-hidden ${
          colors[index % 2 === 2 ? 0 : 1]
        } md:w-[100%] md:h-[300px] w-[260px] h-[350px] active:opacity-50 transition-all`}
      >
        <div className="p-5 pb-0 absolute top-0 left-0 right-0 z-10 text-end ">
          <h2 className="font-semih2old text-black text-[18px] md:text-[16px] font-semibold ">
            {item?.name}
          </h2>
          <p className="text-gray-600 text-[14px] mt-[6px] whitespace-nowrap overflow-hidden text-ellipsis">
            {/* {item?.shortDescription} */}
            ابتداءً من
          </p>
          {/* <a className="block mt-[8px] underline text-[#4b4383]">كرادة ستور</a> */}
          <h4 className="text-[22px] font-extrabold -mt-[4px]">
            {Number(item?.price).toLocaleString("en")}{" "}
            <span className="text-[12px]">IQD</span>
          </h4>
        </div>
        <div className="w-[260px] h-full flex items-center justify-center relative">
          <div className="w-full h-full relative">
            <Image
              // src={images[index]}
              src={`${IMAGE_URL}/${item?.thumbnail2}`}
              fill
              style={{ objectFit: "cover" }}
              alt="image"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CreatviceCard;
