"use client";
import MainHeader from "@/components/MainHeader/mainHeader";
import BottomNabar from "@/components/BottomNavbar/bottomNavbar";
import Container from "@/components/UI/Container/container";
import MainHeaderWeb from "@/components/MainHeader/web/mainHeaderWeb";
import { FiSearch } from "react-icons/fi";
import { Suspense } from "react";

const HomeSkeleton = () => {
  const current = 0;
  return (
    <div>
      <Suspense>
        <MainHeader />
        <MainHeaderWeb />
      </Suspense>
      <div className="bg-gradient-to-b from-[#f0eeff] to-transparent md:pt-[24px] md:pb-[24px] pt-[16px] pb-[16px] -mb-[12px] z-10">
        <Container>
          <div className="relative">
            <FiSearch className="absolute left-[12px] top-[12px] text-[22px] text-gray-700 opacity-50 transition-all active:opacity-30" />

            <input
              readOnly
              className="w-[100%] rounded-[8px] h-[48px] pl-[46px] pr-[16px] outline-none border border-[#eee] text-[18px]"
              placeholder="ابحث عن منتج"
            />
          </div>
        </Container>
      </div>
      <div>
        <div className=" mt-[16px] mb-[16px] w-full">
          <Container>
            <div className="flex flex-col justify-center items-center">
              <div className="w-[100%] md:aspect-[3.5] aspect-3 bg-[#fff]  relative rounded-[16px] overflow-hidden pb-[20px]  inline-block border border-[#eee]  shadow-sm pure-skeleton"></div>
              <div className="flex items-center gap-[4px] mt-[4px] ">
                {[...Array(3)]?.map((_, i) => (
                  <span
                    key={i}
                    className="block  h-[6px]  rounded-[24px] transition-all mt-[8px]"
                    style={{
                      width: current === i ? 50 : 6,
                      background: current === i ? "#ddd" : "#eee",
                    }}
                  />
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      <div>
        <Container noPadding>
          <div className="flex items-center pt-4 pb-4 gap-6 overflow-auto no-scrollbar pl-[16px] pr-[16px] border-b border-b-[#eee]">
            {[...Array(16)].map((el, i) => (
              <div
                key={i}
                className={
                  "flex items-center justify-center flex-col active:scale-95  transition-all"
                }
              >
                <div className="pure-skeleton !w-[56px] !h-[56px] relative border border-1-[#eee] rounded-lg "></div>
                <p
                  className={
                    "mt-[12px] text-[14px] text-nowrap text-gray-700 w-[40px] h-[6px]  bg-[#eee]"
                  }
                ></p>
              </div>
            ))}
          </div>
        </Container>

        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 gap-4 overflow-x-auto no-scrollbar mt-[16px]">
            {[...Array(8)].map((el, i) => (
              <div
                key={i}
                className={`flex-none rounded-xl flex flex-col border border-[#eee] relative overflow-hidden bg-white active:scale-[0.96] transition-all`}
                style={{ width: "100%" }}
              >
                <div className={`flex items-center justify-center`}>
                  <div
                    className={`w-full relative aspect-w-1 aspect-h-1 bg-[#f6f6f6] pure-skeleton`}
                  ></div>
                </div>
                <div className="p-4 border-t border-t-[#eee]">
                  <h2 className="font-semih2old text-black text-[14px] font-semibold  whitespace-nowrap overflow-hidden text-ellipsis w-[120px] h-[8px] bg-[#f6f6f6] rounded-md"></h2>
                  <p className="text-gray-600 text-[14px] mt-[6px] h-[8px] bg-[#f6f6f6] rounded-md"></p>
                  <div className="flex items-center justify-between mt-[8px]">
                    <h4 className="text-[16px] font-extrabold w-[30px] h-[14px] bg-[#f6f6f6] rounded-md"></h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <Suspense>
        <BottomNabar />
      </Suspense>
    </div>
  );
};

export default HomeSkeleton;
