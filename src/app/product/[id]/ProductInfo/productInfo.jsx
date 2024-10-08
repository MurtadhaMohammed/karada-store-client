"use client";
import Container from "@/components/UI/Container/container";
import IconButton from "@/components/UI/IconButton/iconButton";
import useScrollPosition from "@/hooks/useScrollPosition";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion"; // Import framer-motion components
import {
  TbHeart,
  TbHeartFilled,
  TbShare2,
  TbTruckDelivery,
} from "react-icons/tb";
import { TiStarHalfOutline, TiStarFullOutline } from "react-icons/ti";
import InstallmentBanner from "@/components/InstallmentBanner/installmentBanner";

const OptionTag = ({ name, active = false }) => {
  return (
    <button
      className="h-[46px] rounded-[24px] pl-[16px] pr-[16px] text-[14px] bg-[#f6f6f6] border border-[#eee] ml-[12px] mb-[12px] active:opacity-60 active:scale-[0.96] transition-all"
      style={
        active
          ? {
              borderColor: "#7c3aed",
              color: "#7c3aed",
              background: "#fff",
            }
          : {}
      }
    >
      {name}
    </button>
  );
};

const ProductInfo = ({ item }) => {
  const router = useRouter();
  const { scrollPosition } = useScrollPosition();

  return (
    <div>
      <div className="h-[300px] border-b border-b-[#eee]">
        <div className={"w-full h-full relative"}>
          <Image src={"/images/cam.png"} layout="fill" objectFit="cover"  alt="image"/>
          <div className="absolute left-0 right-0 mt-[4px]  bottom-[16px]">
            <Container>
              <div className="flex items-center justify-between">
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
                <div className="flex items-center">
                  <p className="mt-1 ml-2">3.6</p>
                  <TiStarFullOutline className="ml-[4px] text-[24px] text-[#FCA120]" />
                  {/* <TiStarFullOutline className="ml-[4px] text-[24px] text-[#FCA120]" />
                  <TiStarFullOutline className="ml-[4px] text-[24px] text-[#FCA120]" />
                  <TiStarFullOutline className="ml-[4px] text-[24px] text-[#FCA120]" />
                  <TiStarHalfOutline className="ml-[4px] text-[24px] text-[#FCA120]" /> */}
                </div>
              </div>
            </Container>
          </div>
          {/* <div className="absolute inset-0 z-10 bg-gradient-to-t from-purple-500 to-transparent"></div> */}
        </div>
        <div
          className={`top-0 left-0 right-0 pt-[16px] pb-[16px] transition-all ${
            scrollPosition > 0
              ? "fixed bg-white shadow-md border-b border-gray-200"
              : "absolute"
          } `}
        >
          <Container>
            <div className="flex items-start justify-between">
              <div className="flex items-center flex-1">
                <IconButton
                  rounded={"50%"}
                  className={`bg-[#f6f6f6] rounded-full border border-[#eee] ${
                    scrollPosition > 0 ? "p-2 text-[24px]" : "p-3 text-[28px]"
                  } transition-all flex-1`}
                  icon={<IoIosArrowForward />}
                  onClick={() => router.back()}
                />
                <motion.b
                  key={scrollPosition > 100}
                  initial={{ y: 20, opacity: 0.6 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0.6 }}
                  transition={{
                    duration: 0.3,
                    // ease: [0.42, 0, 0.58, 1],
                  }}
                  className="mt-2 mr-[8px] text-[18px] whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{
                    maxWidth: 180,
                    visibility: scrollPosition > 200 ? "visible" : "hidden",
                  }}
                >
                  {item?.name}
                  {item?.name}
                </motion.b>
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
        <h4 className="font-bold text-[18px] mt-[16px]">{item?.name}</h4>
        <p className="text-[16px] text-gray-600">{item?.description}</p>
        <div className="mt-[16px]">
          <InstallmentBanner />
        </div>
        <div className="flex items-center mt-[16px]">
          <TbTruckDelivery className="text-[16px]" />
          <span className="mr-[8px] text-[14px]">
            عادة مايتم التوصيل خلال يومين
          </span>
        </div>
      </Container>
      <div className="h-[1px] bg-[#eee] mt-[16px] mb-[16px]" />
      <Container>
        <p className="text-[#a5a5a5]">خيارات المنتج</p>
        <div className="flex flex-wrap mt-[8px]">
          <OptionTag name="ذاكرة 256 ذهبي" active />
          <OptionTag name="نوع شكاكي" />
          <OptionTag name="Green Light" />
        </div>
      </Container>
      <div className="h-[1px] bg-[#eee] mt-[16px] mb-[16px]" />
    </div>
  );
};

export default ProductInfo;
