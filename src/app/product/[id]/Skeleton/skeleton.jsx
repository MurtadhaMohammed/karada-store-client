"use client";
import Container from "@/components/UI/Container/container";
import IconButton from "@/components/UI/IconButton/iconButton";
import { IoIosArrowForward } from "react-icons/io";
import { TbHeart, TbShare2, TbTruckDelivery } from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
import ProductCTA from "../ProductCTA/ProductCTA";

const ProductSkeleton = () => {
  return (
    <div className="md:hidden block">
      <div className="h-[400px] border-b border-b-[#eee] pure-skeleton mt-[68px]">
        <div className={"w-full h-full relative"}>
          <div className="absolute left-0 right-0 mt-[4px]  bottom-[16px]">
            <Container>
              <div className="flex items-center justify-start">
                <div className="flex items-center gap-[4px] mr-1">
                  {[...Array(3)]?.map((el, i) => (
                    <span
                      key={i}
                      className="block  h-[8px]  rounded-[24px] transition-all"
                      style={{
                        width: i == 0 ? 60 : 8,
                        background: i == 0 ? "#a855f7" : "#a855f775",
                      }}
                    />
                  ))}
                </div>
                {/* <div className="flex items-center">
                  <p className="mt-1 ml-2">0.0</p>
                  <TiStarFullOutline className="ml-[4px] text-[24px] text-[#FCA120]" />
                </div> */}
              </div>
            </Container>
          </div>
          {/* <div className="absolute inset-0 z-10 bg-gradient-to-t from-purple-500 to-transparent"></div> */}
        </div>
        <div
          className={`top-0 left-0 right-0 pt-[16px] pb-[16px] absolute transition-all`}
        >
          <Container>
            <div className="flex items-start justify-between">
              <div className="flex items-center flex-1">
                <IconButton
                  rounded={"50%"}
                  className={`bg-[#f6f6f6] rounded-full border border-[#eee] p-2 text-[24px] transition-all`}
                  icon={<IoIosArrowForward />}
                  //onClick={() => router.back()}
                />
              </div>
              <div className="flex items-center">
                <IconButton
                  rounded={"8px"}
                  className="p-2 bg-[#f6f6f6] rounded-[8px] border border-[#eee]"
                  icon={<TbShare2 className="text-[22px]" />}
                />
                <div className="w-[8px]" />
                <IconButton
                  rounded={"8px"}
                  className="p-2 bg-[#f6f6f6] rounded-[8px] border border-[#eee]"
                  icon={<TbHeart className="text-[22px]" />}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Container>
        <h4 className="text-[18px] mt-[16px] !w-[120px] h-[20px] pure-skeleton"></h4>
        <b className="text-[22px]  block">
          000,000 <span className="text-[14px]">IQD</span>
        </b>

        <p className="text-[14px] text-gray-600 mt-[8px]  h-[12px] pure-skeleton"></p>
        <p className="text-[14px] text-gray-600 mt-[8px] !w-[80%] h-[12px] pure-skeleton"></p>
        {/* <div className="mt-[16px]">
          <div className="h-[60px] rounded-[8px] border border-[#eee] pt-[4px] pb-[4px] pl-[8px] pr-[8px] shadow-md active:scale-[0.96] active:opacity-50 transition-all pure-skeleton"></div>
        </div> */}
        <div className="flex items-center mt-[16px]">
          <TbTruckDelivery className="text-[16px]" />
          <span className="mr-[8px] text-[14px]">
            عادة مايتم التوصيل خلال يومين
          </span>
        </div>
      </Container>
      <div className="h-[1px] bg-[#eee] mt-[16px] mb-[16px]" />
      <Container>
        <p className="text-[#a5a5a5] text-[14px]">خيارات المنتج</p>
        <div className="flex flex-wrap mt-[8px]">
          <div className="pure-skeleton h-[32px] !w-[80px] rounded-[24px] pl-[12px] pr-[12px] text-[14px] bg-[#fff] border border-[#eee] ml-[8px] mb-[12px] active:opacity-60 active:scale-[0.96] transition-all"></div>
          <div className="pure-skeleton h-[32px] !w-[80px] rounded-[24px] pl-[12px] pr-[12px] text-[14px] bg-[#fff] border border-[#eee] ml-[8px] mb-[12px] active:opacity-60 active:scale-[0.96] transition-all"></div>
          <div className="pure-skeleton h-[32px] !w-[80px] rounded-[24px] pl-[12px] pr-[12px] text-[14px] bg-[#fff] border border-[#eee] ml-[8px] mb-[12px] active:opacity-60 active:scale-[0.96] transition-all"></div>
        </div>
      </Container>
      <ProductCTA disabled />
    </div>
  );
};

export default ProductSkeleton;
