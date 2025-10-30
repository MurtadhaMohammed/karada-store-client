"use client";
import Container from "@/components/UI/Container/container";
import IconButton from "@/components/UI/IconButton/iconButton";
import useScrollPosition from "@/hooks/useScrollPosition";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import {
  TbHeart,
  TbHeartFilled,
  TbShare2,
  TbTruckDelivery,
} from "react-icons/tb";
import InstallmentBanner from "@/components/InstallmentBanner/installmentBanner";
import { IMAGE_URL } from "@/lib/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ProductCTA from "../ProductCTA/ProductCTA";
import { useAppStore } from "@/lib/store";
import { BsExclamation } from "react-icons/bs";
import { priceCalc } from "@/helper/priceCalc";

const OptionTag = ({ name, color, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row justify-center items-center h-[32px] rounded-[24px] pl-[12px] pr-[12px] text-[14px] bg-[#f6f6f6] border border-[#eee] mx-[4px] mb-[12px] active:opacity-60 active:scale-[0.96] transition-all"
      style={
        active
          ? {
              borderColor: "#7c3aed",
              color: "#7c3aed",
              background: "#f6f6f6",
            }
          : {}
      }
    >
      {name}
      {color && (
        <span
          className="w-[12px] h-[12px] rounded-full mr-[8px]"
          style={{ backgroundColor: color }}
        />
      )}
    </button>
  );
};

const ProductInfo = ({ product }) => {
  const router = useRouter();
  const { scrollPosition } = useScrollPosition();
  const [isMore, setIsMore] = useState(false);
  const { settings } = useAppStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toggleFav, favorites } = useAppStore();
  const [activeOption, setActiveOption] = useState(
    product?.options?.[0] || null
  );
  const [price, setPrice] = useState(product?.price);
  const [endPrice, setEndPrice] = useState(product?.endPrice);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (activeOption?.price) {
      setPrice(activeOption?.price);
      setEndPrice(priceCalc(product, activeOption)?.endPrice);
    } else {
      setPrice(product?.price);
      setEndPrice(priceCalc(product)?.endPrice);
    }
  }, [activeOption]);

  useEffect(() => {
    setActiveOption(product?.options?.[0] || null);
  }, [product?.options]);

  const handleOptionClick = (option, index) => {
    if (option.images.length > 0) {
      setCurrentImageIndex(0);
    }
    setActiveOption(option);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this page",
          text: "I found this interesting:",
          url: window.location.href,
        });
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
    !!product?.out_of_stock ||
    (activeOption != null && activeOption.in_stock === false);

  const shownimages =
    activeOption?.images?.length > 0
      ? activeOption.images
      : product?.image
          ?.sort((a, b) => Number(a.priority) - Number(b.priority))
          .map((img) => img.url);

  return (
    <div className="md:hidden block">
      <div className="h-[360px] border-b border-b-[#eee] mt-[60px]">
        <div className={"w-full h-full relative"}>
          {shownimages && shownimages.length > 0 && (
            <Swiper
              ref={swiperRef}
              spaceBetween={10}
              slidesPerView={1}
              onSlideChange={(swiper) =>
                setCurrentImageIndex(swiper.activeIndex)
              }
              className="h-full w-full relative z-0"
            >
              {shownimages.map((img, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={`${IMAGE_URL}/${img}`}
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
              <div className="flex items-center justify-start">
                <div className="flex items-center gap-[4px] mr-1">
                  {shownimages?.map((images, i) => (
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
          {product?.brand?.img && (
            <div
              onClick={() =>
                router.push(`/products/brand/${product?.brand.id}`)
              }
              className="w-[68px] h-[68px] bg-white border border-[#eeee] rounded-[8px] absolute left-[16px] -bottom-[32px] z-10 shadow-md overflow-hidden active:opacity-40 transition-all"
            >
              <Image
                src={`${IMAGE_URL}/${product?.brand?.img}`}
                fill
                objectFit="contain"
                alt="brand"
              />
            </div>
          )}
        </div>
        <div
          className={`top-0 left-0 right-0 pt-[16px] pb-[16px] z-50 border-b  ${
            scrollPosition > 0
              ? "fixed bg-[#fff] !border-b-[#eee]"
              : "absolute bg-gradient-to-b from-[#f0eeff] to-[#fff] border-b-[#fff]"
          } transition-all h-[68px]`}
        >
          <Container>
            <div className="flex items-start justify-between z-50">
              <div className="flex items-center flex-1">
                <IconButton
                  rounded={"50%"}
                  className={`bg-[#fff] rounded-full border border-[#eee] p-2 text-[24px] transition-all`}
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
                  className="mt-1 mr-[8px] text-[18px] whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{
                    maxWidth: 140,
                    visibility: scrollPosition > 200 ? "visible" : "hidden",
                  }}
                >
                  {product?.name}
                </motion.b>
              </div>
              <div className="flex items-center">
                <div className="w-[8px]" />
                <IconButton
                  rounded={"8px"}
                  className="p-2 bg-[#fff] rounded-[8px] border border-[#eee] "
                  icon={<FiSearch className="text-[22px]" />}
                  onClick={() => router.push("/products/search/all")}
                />
                <div className="w-[8px]" />
                <IconButton
                  rounded={"8px"}
                  className="p-2 bg-[#fff] rounded-[8px] border border-[#eee]"
                  onClick={handleShare}
                  icon={<TbShare2 className="text-[22px]" />}
                />
                <div className="w-[8px]" />
                <IconButton
                  rounded={"8px"}
                  className={`p-2  rounded-[8px] border border-[#eee] shadow-lg shadow-[#ff000041] ${
                    favorites?.includes(product?.id)
                      ? "bg-gradient-to-r from-[#ff0000] to-[#fb797b]"
                      : "bg-[#fff]"
                  }`}
                  icon={
                    favorites?.includes(product?.id) ? (
                      <TbHeartFilled className="text-[22px] text-[#fff]" />
                    ) : (
                      <TbHeart className="text-[22px]" />
                    )
                  }
                  onClick={() => toggleFav(product?.id)}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Container>
        <h4 className="text-[18px] mt-[16px] max-w-[84%]">{product?.name}</h4>
        {!priceCalc(product)?.hasDiscount ? (
          <b className="text-[22px] block">
            {Number(price).toLocaleString("en")}{" "}
            <span className="text-[14px]">د.ع</span>
          </b>
        ) : (
          <div className="flex items-end">
            <b className="text-[22px] block">
              {Number(endPrice).toLocaleString("en")}{" "}
              <span className="text-[14px]">د.ع</span>
            </b>
            <p className="text-[18px] block mr-[16px] line-through text-[#a5a5a5] italic">
              {Number(price).toLocaleString("en")}
            </p>
          </div>
        )}

        {(activeOption && !activeOption?.in_stock) || product.out_of_stock ? (
          <p className="text-[14px] text-red-600 mt-[8px]">
            هذا المنتج غير متوفر حالياً
          </p>
        ) : null}
        <p className="text-[14px] text-gray-600 mt-[8px]">
          {product?.shortDescription}
        </p>
        {product?.code && (
          <div className="flex items-center mt-2">
            <span className="text-[14px] text-gray-500">كود المنتج:</span>
            <span className="ml-2 text-[14px] font-mono underline">
              {product.code}
            </span>
          </div>
        )}
        <div className="mt-[16px]">
          <InstallmentBanner price={endPrice} />
        </div>
        <div className="flex items-center mt-[16px]">
          <TbTruckDelivery className="text-[16px]" />
          <span className="mr-[8px] text-[14px] text-[#444]">
            عادة مايتم توصيل المنتجات {settings?.time}
          </span>
        </div>
        {product?.insurance && product?.insurance?.content && (
          <div className="flex items-center mt-[16px]">
            <BsExclamation className="text-[16px]" />
            <span className="mr-[8px] text-[14px]">
              {product?.insurance?.content}
            </span>
          </div>
        )}

        <div className="mt-[16px] mb-[8px] flex flex-wrap">
          {product?.options?.map((option, index) => (
            <OptionTag
              key={index}
              name={option.name}
              color={option.color}
              active={option === activeOption}
              onClick={() => handleOptionClick(option, index)}
            />
          ))}
        </div>

        <a
          href={`https://wa.me/9647740300006?text=${encodeURIComponent(
            `مرحبًا، أود الاستفسار عن هذا المنتج:\nhttps://karadastore.iq/product/${product.id}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="mb-[24px] h-[48px] w-[100%] rounded-[12px] bg-[#fff] flex items-center justify-between border pr-[16px] pl-[12px] border-[#eee] shadow-md  transition-all active:scale-95">
            <p className="text-[16px]">للأستفسار والتواصل</p>
            <FaWhatsapp size={28} color="#1CC638" />
          </button>
        </a>

        <p className="text-[14px] ">تفاصيل المنتج</p>
        <ul
          className="text-[14px] text-gray-600 mt-[8px] mb-[24px] p-4 bg-gradient-to-br from-gray-100 to-white rounded-[8px] border border-[#eee] overflow-hidden relative pb-[50px] transition-all"
          style={!isMore ? { maxHeight: 200 } : {}}
        >
          {product?.description
            ?.split("***")
            ?.filter((el) => !!el)
            ?.map((el, i) => (
              <li key={i}>- {el}</li>
            ))}
          {isMore ? (
            <li
              onClick={() => setIsMore(false)}
              className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-white via-white/60 to-transparent h-[68px] rounded-[8px] shadow-md flex items-center justify-center text-[14px] transition-all active:opacity-40"
            >
              <p className="mt-[16px] text-indigo-600 font-bold">
                {" "}
                - عرض عناصر اقل
              </p>
            </li>
          ) : (
            <li
              onClick={() => setIsMore(true)}
              className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-white via-white/60 to-transparent h-[68px] rounded-[8px] shadow-md flex items-center justify-center text-[14px] transition-all active:opacity-40"
            >
              <p className="mt-[16px] text-indigo-600 font-bold">
                {" "}
                + عرض المزيد
              </p>
            </li>
          )}
        </ul>
        {/* <ProductCTA product={product} /> */}
      </Container>
      <ProductCTA
        product={{ ...product, l1: activeOption }}
        disabled={isAddToCartDisabled}
      />
    </div>
  );
};

export default ProductInfo;
