"use client";
import Container from "@/components/UI/Container/container";
import { IoMdTime } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";

const OrdersDetailsSkeleton = () => {
  return (
    <div className="mt-[16px]">
      <Container>
        <div
          className={`border border-[#eee] rounded-[16px] overflow-hidden mt-[8px]  mb-[18px] bg-white h-[130px]`}
          style={{ boxShadow: "0px 5px 20px -10px #0000002b" }}
        >
          <div className="flex p-[16px] h-full">
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
      </Container>
    </div>
  );
};

export default OrdersDetailsSkeleton;
