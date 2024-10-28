"use client";
import Container from "@/components/UI/Container/container";
import { IoMdTime } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";

const OrderCard = () => {
  return (
    <div
      className={`border border-[#eee] rounded-[16px] overflow-hidden mt-[8px]  mb-[18px]`}
      style={{ boxShadow: "0px 5px 20px -10px #0000002b" }}
    >
      <div className="flex p-[16px]">
        <div className="w-[100px] h-[100px]  relative ">
          <div
            className="relative h-full grid grid-cols-2 gap-1  overflow-hidden"
            style={{ direction: "ltr" }}
          >
            <div className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative pure-skeleton"></div>
            <div className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative pure-skeleton"></div>
            <div className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative pure-skeleton"></div>
            <div className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative pure-skeleton"></div>
          </div>
        </div>

        <div className="mr-[12px] flex flex-col justify-evenly flex-1">
          <b
            className={`text-[18px] h-[14px] rounded-sm  pure-skeleton !w-[160px]`}
          ></b>
          <div className="flex items-center text-[14px] text-[#666]">
            <IoMdTime className="opacity-20" />
            <p className="mr-[4px] h-[8px] rounded-sm  pure-skeleton !w-[100px]"></p>
          </div>
          <div className="flex items-center text-[14px] text-[#666]">
            <HiOutlineLocationMarker className="opacity-20" />
            <p className="mr-[4px] h-[8px] rounded-sm  pure-skeleton !w-[100px]"></p>
          </div>
          <div className="h-[4px] rounded-[24px] bg-[#eee]">
            <div className={`h-[4px] rounded-[24px]`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrdersSkeleton = () => {
  return (
    <div className="mt-[16px]">
      <Container>
        <div className="flex gap-4 items-center mb-[16px] text-[16px]">
          <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
          <div className="text-[#666]">الطلبات النشطة</div>
          <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
        </div>

        {[...new Array(2)].map((el, i) => (
          <OrderCard key={i} order={el} />
        ))}
        <div className="flex gap-4 items-center mb-[16px] text-[16px]">
          <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
          <div className="text-[#666]">الطلبات السابقة</div>
          <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
        </div>
        {[...new Array(5)].map((el, i) => (
          <OrderCard key={i} order={el} />
        ))}
      </Container>
    </div>
  );
};

export default OrdersSkeleton;
