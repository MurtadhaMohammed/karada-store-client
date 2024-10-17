"use client";
import Container from "@/components/UI/Container/container";
import IconButton from "@/components/UI/IconButton/iconButton";
import useScrollPosition from "@/hooks/useScrollPosition";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import {
  TbHeart,
  TbHeartFilled,
  TbShare2,
  TbTruckDelivery,
} from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
import InstallmentBanner from "@/components/InstallmentBanner/installmentBanner";
import { IMAGE_URL } from "@/lib/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

// Updated OptionTag to handle clicks and image changes
const OptionTag = ({ name, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
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
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeOption, setActiveOption] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);


  const loadFavorites = () => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites_product")) || [];
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
    setIsFavorite(favorites.includes(productId));
  };

  useEffect(() => {
    const favorites = loadFavorites();
    setIsFavorite(favorites.includes(item.product?.id));
  }, [item.product?.id]);

  const handleOptionClick = (option, index) => {
    if (index === activeOption) {
      setActiveOption(null);
    } else {
      if (option.img) {
        const imageIndex = item.product?.image?.findIndex((img) =>
          img.url.includes(option.img)
        );
        if (imageIndex !== -1) {
          setCurrentImageIndex(imageIndex);
          if (swiperInstance) {
            swiperInstance.slideTo(imageIndex);
          }
        }
      }
      setActiveOption(index);
    }
  };

  return (
    <div>
      <div className="h-[300px] border-b border-b-[#eee]">
        <div className={"w-full h-full relative"}>
          {item.product?.image && item.product.image.length > 0 && (
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              onSlideChange={(swiper) =>
                setCurrentImageIndex(swiper.activeIndex)
              }
              onSwiper={setSwiperInstance} // This gives us access to the swiper instance
              className="h-full w-full relative z-0"
            >
              {item.product.image.map((img, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={`${IMAGE_URL}/${img.url}`}
                    layout="fill"
                    objectFit="cover"
                    alt={`product-image-${index}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div className="absolute left-0 right-0 mt-[4px] bottom-[16px] z-50">
            <Container>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[4px] mr-1">
                  {item.product?.image?.map((image, i) => (
                    <span
                      key={i}
                      className="block h-[8px] rounded-[24px] transition-all"
                      style={{
                        width: i === currentImageIndex ? 60 : 8,
                        background:
                          i === currentImageIndex ? "#a855f7" : "#a855f775",
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
          className={`top-0 left-0 right-0 pt-[16px] pb-[16px] z-50 ${
            scrollPosition > 0
              ? "fixed bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-b-[#f0f0f0]"
              : "absolute"
          } transition-all`}
        >
          <Container>
            <div className="flex items-start justify-between z-50">
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
        <b className="text-[22px] block">
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
            عادة مايتم توصيل المنتجات في 3-5 أيام
          </span>
        </div>
        {item.product?.options && item.product?.options.length > 0 && (
          <div className="flex items-center mt-[8px]">
            <h5 className="text-[16px]">الخيارات</h5>
            <div className="ml-[12px]">
              {item.product?.options.map((option, index) => (
                <OptionTag
                  key={index}
                  name={option.name}
                  active={index === activeOption}
                  onClick={() => handleOptionClick(option, index)}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ProductInfo;
