"use client";
import Container from "@/components/UI/Container/container";
import IconButton from "@/components/UI/IconButton/iconButton";
import useScrollPosition from "@/hooks/useScrollPosition";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import {
  TbHeart,
  TbHeartFilled,
  TbShare2,
  TbTruckDelivery,
} from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
// import InstallmentBanner from "@/components/InstallmentBanner/installmentBanner";
import { IMAGE_URL } from "@/lib/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ProductCTA from "../ProductCTA/ProductCTA";
import { useCartStore } from "@/lib/cartStore";

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

const ProductInfo = ({ product }) => {
  const router = useRouter();
  const { scrollPosition } = useScrollPosition();
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeOption, setActiveOption] = useState(null);
  const swiperRef = useRef(null);
  const { addItem } = useCartStore();

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
    setIsFavorite(favorites.includes(product?.id));
  }, [product?.id]);

  const handleOptionClick = (option, index) => {
    if (option.img) {
      const imageIndex = product?.image?.findIndex(
        (img) => img.url === option.img
      );
      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex);
        swiperRef.current?.swiper.slideTo(imageIndex);
      }
    }

    // Set the active option
    setActiveOption(index);
    product.l1 = product?.options[index];
  };

  const handleAddToCart = () => {
    addItem(product, product.l1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this page",
          text: "I found this interesting:",
          url: window.location.href,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      // alert(
      //   "Sharing is not supported in this browser. Copying the link instead."
      // );
      // navigator.clipboard
      //   .writeText(window.location.href)
      //   .then(() => {
      //     alert("Link copied to clipboard!");
      //   })
      //   .catch((err) => {
      //     console.error("Failed to copy: ", err);
      //   });
    }
  };

  const isAddToCartDisabled =
    product?.options?.length > 0 && activeOption === null;

  return (
    <div className="md:hidden block">
      <div className="h-[400px] border-b border-b-[#eee]">
        <div className={"w-full h-full relative"}>
          {product?.image && product.image.length > 0 && (
            <Swiper
              ref={swiperRef}
              spaceBetween={10}
              slidesPerView={1}
              onSlideChange={(swiper) =>
                setCurrentImageIndex(swiper.activeIndex)
              }
              className="h-full w-full relative z-0"
            >
              {product.image.map((img, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={`${IMAGE_URL}/${img.url}`}
                    fill
                    style={{ objectFit: "cover" }}
                    alt={`product-image-${index}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div className="absolute left-0 right-0 mt-[4px] bottom-[16px] z-50">
            <Container>
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-[4px] mr-1">
                  {product?.image?.map((image, i) => (
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
                {/* <div className="flex items-center">
                  <p className="mt-1 ml-2">3.6</p>
                  <TiStarFullOutline className="ml-[4px] text-[24px] text-[#FCA120]" />
                </div> */}
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
                  {product?.name}
                </motion.b>
              </div>
              <div className="flex items-center">
                <IconButton
                  rounded={"8px"}
                  className="p-2 bg-[#f6f6f6] rounded-[8px] border border-[#eee]"
                  onClick={handleShare}
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
                  onClick={() => toggleFavorite(product?.id)}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Container>
        <h4 className="text-[18px] mt-[16px]">{product?.name}</h4>
        {product?.price === product?.endPrice ? (
          <b className="text-[22px] block">
            {Number(product?.endPrice).toLocaleString("en")}{" "}
            <span className="text-[14px]">IQD</span>
          </b>
        ) : (
          <div className="flex items-end">
            <b className="text-[22px] block">
              {Number(product?.endPrice).toLocaleString("en")}{" "}
              <span className="text-[14px]">IQD</span>
            </b>
            <p className="text-[18px] block mr-[16px] line-through text-[#a5a5a5] italic">
              {Number(product?.price).toLocaleString("en")}
            </p>
          </div>
        )}

        <p className="text-[14px] text-gray-600 mt-[8px]">
          {product?.description}
        </p>
        {/* <div className="mt-[16px]">
          <InstallmentBanner />
        </div> */}
        <div className="flex items-center mt-[16px]">
          <TbTruckDelivery className="text-[16px]" />
          <span className="mr-[8px] text-[14px] text-[#444]">
            عادة مايتم توصيل المنتجات في 3-5 أيام
          </span>
        </div>
        <div className="mt-[16px] mb-[8px]">
          {product?.options?.map((option, index) => (
            <OptionTag
              key={index}
              name={option.name}
              active={index === activeOption}
              onClick={() => handleOptionClick(option, index)}
            />
          ))}
        </div>
        <ProductCTA
          product={product}
          onAddToCart={handleAddToCart}
        />
      </Container>
      <ProductCTA
        product={product}
        onAddToCart={handleAddToCart}
        disabled={isAddToCartDisabled}
      />
    </div>
  );
};

export default ProductInfo;
