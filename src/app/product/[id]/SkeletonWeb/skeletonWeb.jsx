"use client";
import Container from "@/components/UI/Container/container";
import IconButton from "@/components/UI/IconButton/iconButton";
import { IoIosArrowForward } from "react-icons/io";
import { TbHeart, TbShare2, TbTruckDelivery } from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
import ProductCTA from "../ProductCTA/ProductCTA";

const ProductSkeletonWeb = () => {
  return (
    <div className="mt-[34px]">
      <Container>
        <div className="flex gap-10 mb-[40px] pb-[40px] border-b border-b-[#eee]">
          <section className="flex gap-4">
            <div className="flex-1">
              {[0,1,2]?.map((_, i) => (
                <div
                  key={i}
                  className={`!w-[80px] h-[80px] rounded-[12px] bg-[#f6f6f6] mb-4 relative overflow-hidden pure-skeleton`}
                ></div>
              ))}
            </div>
            <div className="bg-[#f6f6f6] rounded-[16px] !w-[450px] h-[450px] relative overflow-hidden pure-skeleton"></div>
          </section>

          <section  className="border-r border-r-[#eee] pr-8">
            <h4 className="text-[18px] mt-[16px] !w-[120px] h-[20px] pure-skeleton"></h4>
            <b className="text-[22px]  block">
              000,000 <span className="text-[14px]">IQD</span>
            </b>

            <p className="text-[14px] text-gray-600 mt-[8px]  h-[12px] pure-skeleton"></p>
            <p className="text-[14px] text-gray-600 mt-[8px] !w-[80%] h-[12px] pure-skeleton"></p>
  
            <div className="flex items-center mt-[16px]">
              <TbTruckDelivery className="text-[16px]" />
              <span className="mr-[8px] text-[14px]">
                عادة مايتم التوصيل خلال يومين
              </span>
            </div>
            <div className="h-[1px] bg-[#eee] mt-[16px] mb-[16px]" />

            <p className="text-[#a5a5a5] text-[14px]">خيارات المنتج</p>
            <div className="flex flex-wrap mt-[8px]">
              <div className="pure-skeleton h-[32px] !w-[80px] rounded-[24px] pl-[12px] pr-[12px] text-[14px] bg-[#fff] border border-[#eee] ml-[8px] mb-[12px] active:opacity-60 active:scale-[0.96] transition-all"></div>
              <div className="pure-skeleton h-[32px] !w-[80px] rounded-[24px] pl-[12px] pr-[12px] text-[14px] bg-[#fff] border border-[#eee] ml-[8px] mb-[12px] active:opacity-60 active:scale-[0.96] transition-all"></div>
              <div className="pure-skeleton h-[32px] !w-[80px] rounded-[24px] pl-[12px] pr-[12px] text-[14px] bg-[#fff] border border-[#eee] ml-[8px] mb-[12px] active:opacity-60 active:scale-[0.96] transition-all"></div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default ProductSkeletonWeb;
