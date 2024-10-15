"use client";
import Container from "@/components/UI/Container/container";
import IconButton from "@/components/UI/IconButton/iconButton";
import useScrollPosition from "@/hooks/useScrollPosition";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion"; // Import framer-motion components
import {
  TbHeart,
  TbHeartFilled,
  TbShare2,
  TbTruckDelivery,
} from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
import InstallmentBanner from "@/components/InstallmentBanner/installmentBanner";

const OptionTag = ({ name, active = false }) => {
  return (
    <button
      className="h-[32px] rounded-[24px] pl-[12px] pr-[12px] text-[14px] bg-[#fff] border border-[#eee] ml-[8px] mb-[12px] active:opacity-60 active:scale-[0.96] transition-all"
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
  const IMAGE_URL = "https://drlab.us-east-1.linodeobjects.com/karada-store";

  const [isFavorite, setIsFavorite] = useState(false);

  // Function to load favorites from localStorage
  const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites;
  };

  const toggleFavorite = (productId) => {
    let favorites = loadFavorites();
    if (favorites.includes(productId)) {
      favorites = favorites.filter((id) => id !== productId);
    } else {
      favorites.push(productId);
    }
    localStorage.setItem("favorites_product", JSON.stringify(favorites));
    setIsFavorite(favorites.includes(productId)); // Update state
  };

  // Load initial favorite status on mount
  useEffect(() => {
    const favorites = loadFavorites();
    setIsFavorite(favorites.includes(item.product?.id));
  }, [item.product?.id]);

  return (
    <div>
      <div className="h-[300px] border-b border-b-[#eee]">
        <div className={"w-full h-full relative"}>
          <Image
            src={`${IMAGE_URL}/${item.product?.thumbnail1}`}
            layout="fill"
            objectFit="cover"
            alt="image"
          />
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
                </div>
              </div>
            </Container>
          </div>
        </div>
        <div
          className={`top-0 left-0 right-0 pt-[16px] pb-[16px] ${
            scrollPosition > 0
              ? "fixed bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-b-[#f0f0f0]"
              : "absolute"
          } transition-all`}
        >
          <Container>
            <div className="flex items-start justify-between">
              <div className="flex items-center flex-1">
                <IconButton
                  rounded={"50%"}
                  className={`bg-[#f6f6f6] rounded-full border border-[#eee] p-2 text-[24px] transition-all`}
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
                  }}
                  className="mt-2 mr-[8px] text-[18px] whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{
                    maxWidth: 180,
                    visibility: scrollPosition > 200 ? "visible" : "hidden",
                  }}
                >
                  {item.product?.name}
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
                  icon={
                    isFavorite ? (
                      <TbHeartFilled className="text-[22px] text-[#ff5a5f]" />
                    ) : (
                      <TbHeart className="text-[22px]" />
                    )
                  }
                  onClick={() => toggleFavorite(item.product?.id)}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Container>
        <h4 className="text-[18px] mt-[16px]">{item.product?.name}</h4>
        <b className="text-[22px]  block">
          {item.product?.price} <span className="text-[14px]">IQD</span>
        </b>

        <p className="text-[14px] text-gray-600 mt-[8px]">
          {item.product?.description}
        </p>
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
        <p className="text-[#a5a5a5] text-[14px]">خيارات المنتج</p>
        <div className="flex flex-wrap mt-[8px]">
          {item.product?.options.map((option, index) => (
            <OptionTag
              key={index}
              name={option.name}
              active={index === 0}
              Image={`${IMAGE_URL}/${option.image}`}
            />
          ))}
        </div>
      </Container>
      <div className="h-[1px] bg-[#eee] mt-[16px] mb-[16px]" />
    </div>
  );
};

export default ProductInfo;
