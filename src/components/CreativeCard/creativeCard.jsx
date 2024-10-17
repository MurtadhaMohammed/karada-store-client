"use client";
import { IMAGE_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CreatviceCard = ({ index, item }) => {
  const router = useRouter();
  const colors = [
    "bg-gradient-to-br from-gray-100 to-white",
    "bg-gradient-to-br from-white to-gray-100",
  ];

  return (
    <Link href={`/product/${index}`}>
      <div
        // onClick={() => router.push(`/product/${index}`)}
        className={`flex-none rounded-xl flex flex-col  border border-[#eee] relative overflow-hidden ${
          colors[index % 2 === 2 ? 0 : 1]
        } active:opacity-50 transition-all`}
        style={{ width: 240, height: 350 }}
      >
        <div className="p-5 pb-0">
          <h2 className="font-semih2old text-black text-[18px] font-semibold  whitespace-nowrap overflow-hidden text-ellipsis">
            {item?.name}
          </h2>
          <p className="text-gray-600 text-[14px] mt-[2px] line-clamp-2 overflow-hidden text-ellipsis">
            {item?.description}
          </p>
          {/* <a className="block mt-[8px] underline text-[#4b4383]">كرادة ستور</a> */}
          <h4 className="mt-[12px] text-[22px] font-extrabold">
            {Number(item?.price).toLocaleString("en")}{" "}
            <span className="text-[12px]">IQD</span>
          </h4>
        </div>
        <div className="w-[240px] h-[240px] flex items-center justify-center relative">
          <div className="w-full h-full relative">
            <Image
              src={`${IMAGE_URL}/${item.thumbnail2}`}
              layout="fill"
              objectFit="cover"
              alt="image"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CreatviceCard;
