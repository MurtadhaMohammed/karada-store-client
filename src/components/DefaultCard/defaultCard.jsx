import Image from "next/image";
import { PiStarFill } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import IconButton from "../UI/IconButton/iconButton";

const DefaultCard = ({ item, isGrid = false, isFav = false }) => {
  return (
    <div
      className={`flex-none rounded-xl flex flex-col  border border-[#eee] relative overflow-hidden bg-white active:scale-[0.96] transition-all`}
      style={{ width: isGrid ? "100%" : 200 }}
    >
      {isFav && (
        <div className=" absolute top-2 right-2">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-[#f6f6f6] p-2 rounded-full"
            icon={<CgClose className="text-[18px]" />}
          />
        </div>
      )}
      <div className={`flex items-center justify-center`}>
        <div
          className={`w-full relative  ${
            isGrid ? "aspect-w-1 aspect-h-1" : "h-[200px]"
          }`}
        >
          <Image src={item.image} layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className="p-4 border-t border-t-[#eee]">
        <h2 className="font-semih2old text-black text-[14px] font-semibold  whitespace-nowrap overflow-hidden text-ellipsis">
          {item?.name}
        </h2>
        <p className="text-gray-600 text-[14px] mt-[2px] whitespace-nowrap overflow-hidden text-ellipsis">
          {item?.description}
        </p>
        {/* <a className="block mt-[8px] underline text-[#4b4383]">كرادة ستور</a> */}
        <div className="flex items-center justify-between mt-[8px]">
          <h4 className="text-[16px] font-extrabold">
            {Number(item?.price).toLocaleString("en")}{" "}
            <span className="text-[12px]">IQD</span>
          </h4>
          <div className="flex gap-1 mb-[2px]">
            <span className="text-[14px] mt-[4.5px]">3.4</span>
            <PiStarFill className="text-[16px] mt-[6px]  text-[#FCA120]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultCard;
