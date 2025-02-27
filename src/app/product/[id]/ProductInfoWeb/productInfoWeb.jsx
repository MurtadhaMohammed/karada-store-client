"use client";
import Container from "@/components/UI/Container/container";
import useScrollPosition from "@/hooks/useScrollPosition";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TbTruckDelivery,
  TbShare2,
  TbHeart,
  TbHeartFilled,
} from "react-icons/tb";
import { IMAGE_URL } from "@/lib/api";
import "swiper/css";
import "swiper/css/navigation";
import { useCartStore } from "@/lib/cartStore";
import { useAppStore } from "@/lib/store";
import ProductCtaWeb from "../ProductCTAWeb/productCtaWeb";
import ImageModal from "@/components/ImageModal/imageModal";
import IconButton from "@/components/UI/IconButton/iconButton";
import InstallmentBanner from "@/components/InstallmentBanner/installmentBanner";
const OptionTag = ({ name, color, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row justify-center items-center h-[32px] rounded-[24px] pl-[12px] pr-[12px] text-[14px] bg-[#fff] border border-[#eee] mx-[4px] mb-[12px] active:opacity-60 active:scale-[0.96] transition-all"
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
      {color && (
        <span
          className="w-[12px] h-[12px] rounded-full mr-[8px]"
          style={{ backgroundColor: color }}
        />
      )}
    </button>
  );
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

const ProductInfoWeb = ({ product,settings }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeOption, setActiveOption] = useState(
    product?.options?.[0] || null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState(product?.price);
  const [endPrice, setEndPrice] = useState(product?.endPrice);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const { toggleFav, favorites } = useAppStore();

  useEffect(() => {
    setActiveOption(product?.options?.[0] || null);
  }, [product?.options]);

  useEffect(() => {
    if (activeOption?.price) {
      setPrice(activeOption?.price);
      setEndPrice(activeOption?.endPrice || activeOption?.price);
    } else {
      setPrice(product?.price);
    }
  }, [activeOption]);

  const handleOptionClick = (option, index) => {
    if (option.images.length > 0) {
      setCurrentImageIndex(0);
    }
    setActiveOption(option);
  };

  const isAddToCartDisabled =
    (product?.options?.length > 0 && activeOption === null) ||
    product.out_of_stock;

  const openModal = (index) => {
    setIsModalOpen(true);
    setModalImageIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const shownimages =
    activeOption?.images?.length > 0
      ? activeOption.images
      : product?.image?.map((img) => img.url);

  return (
    <div className="mt-[48px] md:block hidden">
      <Container>
        <div className="flex gap-10 mb-[20px] pb-[40px] border-b border-b-[#eee]">
          <section className="flex gap-4">
            <div className="flex-1">
              {shownimages?.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-[80px] h-[80px] rounded-[12px] mb-4 relative overflow-hidden ${
                    currentImageIndex === i
                      ? "border border-[#975aff] shadow-[0_4px_20px_rgb(0,0,0,0.08)]"
                      : ""
                  }`}
                >
                  <Image
                    src={`${IMAGE_URL}/${img}`}
                    fill
                    style={{ objectFit: "cover" }}
                    alt="Product Thumbnail"
                  />
                  {i === 3 && shownimages?.length > 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">+</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-[16px] w-[450px] h-[450px] relative overflow-hidden cursor-pointer"
              onClick={() => openModal(currentImageIndex)}
            >
              {shownimages && shownimages?.length !== 0 ? (
                <Image
                  src={`${IMAGE_URL}/${shownimages[currentImageIndex]}`}
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Product Image"
                />
              ) : (
                ""
              )}
            </motion.div>
          </section>

          <section className="border-r border-r-[#eee] pr-8">
            <InstallmentBanner price={endPrice} />
            <div className="flex items-center gap-2 mt-[16px] pb-4">
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
              <button
                onClick={handleShare}
                className="flex items-center gap-2 p-2 bg-[#fff] rounded-[8px] border border-[#eee] hover:bg-gray-100 transition"
              >
                <TbShare2 className="text-[22px]" />
                <span className="text-[14px] text-gray-700 font-bold">
                  شارك المنتج
                </span>
              </button>
            </div>
            <h4 className="text-[18px]">{product?.name}</h4>
            {price === endPrice ? (
              <b className="text-[22px] block">
                {Number(endPrice).toLocaleString("en")}{" "}
                <span className="text-[14px]">IQD</span>
              </b>
            ) : (
              <div className="flex flex-col items-start">
                <p className="text-[18px] block line-through text-[#a5a5a5] italic">
                  {Number(price).toLocaleString("en")}
                </p>
                <b className="text-[22px] block">
                  {Number(endPrice).toLocaleString("en")}{" "}
                  <span className="text-[14px]">IQD</span>
                </b>
              </div>
            )}

            {/* <p className="text-[14px] text-gray-600 mt-[8px]">
              {product?.description}
            </p> */}
            {product.out_of_stock ? (
              <p className="text-[14px] text-red-600 mt-[8px]">
                هذا المنتج غير متوفر حالياً
              </p>
            ) : null}
            <p className="text-[14px] text-gray-600 mt-[8px]">
              {product?.shortDescription}
            </p>
            <div className="flex items-center mt-[16px]">
              <TbTruckDelivery className="text-[16px]" />
              <span className="mr-[8px] text-[14px]">
              عادة مايتم توصيل المنتجات {settings[6]?.value}
              </span>
            </div>
            <div className="mt-4 pt-4">
              {product?.options && product?.options.length > 0 && (
                <div>
                  <h5 className="text-[16px] ">الخيارات</h5>
                  <h5 className="text-[14px] text-gray-600">
                    أختر احد الخيارات لاضافتها للسلة
                  </h5>
                </div>
              )}
            </div>
            {product?.options && product?.options.length > 0 && (
              <div className="flex items-center mt-[8px] flex-wrap">
                <div className="ml-[12px] flex flex-wrap">
                  {product?.options.map((option, index) => (
                    <OptionTag
                      key={index}
                      color={option.color}
                      name={option.name}
                      active={option === activeOption}
                      onClick={() => handleOptionClick(option, index)}
                    />
                  ))}
                </div>
              </div>
            )}

            <ProductCtaWeb
              product={{ ...product, l1: activeOption }}
              isAddToCartDisabled={isAddToCartDisabled}
            />
          </section>
        </div>
        <p className="text-[16px] ">تفاصيل المنتج</p>

        <div className="text-[14px] mt-[8px] mb-[24px] flex gap-2 flex-wrap">
          {product?.description
            ?.split("***")
            ?.filter((el) => !!el)
            ?.map((el, i) => (
              <div
                key={i}
                className="pl-4 pr-4 flex items-center justify-center h-[32px] rounded-[24px] bg-[#f6f6f685] text-[14px] border border-[#f6f6f6]"
              >
                {el}
              </div>
            ))}
        </div>
      </Container>
      <ImageModal
        isOpen={isModalOpen}
        initialIndex={modalImageIndex}
        images={product?.image?.map((img) => `${IMAGE_URL}/${img?.url}`)}
        onClose={closeModal}
      />
    </div>
  );
};

export default ProductInfoWeb;
