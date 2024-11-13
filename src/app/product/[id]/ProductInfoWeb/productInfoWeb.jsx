"use client";
import Container from "@/components/UI/Container/container";
import useScrollPosition from "@/hooks/useScrollPosition";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TbTruckDelivery } from "react-icons/tb";
import { IMAGE_URL } from "@/lib/api";
import "swiper/css";
import "swiper/css/navigation";
import { useCartStore } from "@/lib/cartStore";
import ProductCtaWeb from "../ProductCTAWeb/productCtaWeb";
import ImageModal from "@/components/ImageModal/imageModal";

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

const ProductInfoWeb = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeOption, setActiveOption] = useState(
    product?.options?.[0] || null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState(product?.price);
  const [endPrice, setEndPrice] = useState(product?.endPrice);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  useEffect(() => {
    setActiveOption(product?.options?.[0] || null);
  }, [product?.options]);

  useEffect(() => {
    if (activeOption?.price) {
      setPrice(activeOption?.price);
      setEndPrice(activeOption?.price); //TODO : handl endprice from BE
    } else setPrice(product?.price);
  }, [activeOption]);

  const handleOptionClick = (option, index) => {
    if (option.images.length > 0) {
      setCurrentImageIndex(0);
    }
    setActiveOption(option);
  };

  const isAddToCartDisabled =
    product?.options?.length > 0 && activeOption === null;

  const openModal = (index) => {
    setIsModalOpen(true);
    setModalImageIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const shownimages = activeOption?.images?.length > 0 ? activeOption.images : product?.image?.map(img => img.url);

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
            <h4 className="text-[18px] mt-[16px]">{product?.name}</h4>
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
            <p className="text-[14px] text-gray-600 mt-[8px]">
              {product?.shortDescription}
            </p>
            <div className="flex items-center mt-[16px]">
              <TbTruckDelivery className="text-[16px]" />
              <span className="mr-[8px] text-[14px]">
                عادة مايتم توصيل المنتجات في 3-5 أيام
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
            ?.split("-")
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
        {/* <ul className="text-[14px] text-gray-600 mt-[8px] mb-[24px]">
          {product?.description
            ?.split("-")
            ?.filter((el) => !!el)
            ?.map((el, i) => (
              <li>
                {i + 1} -
                {el}
              </li>
            ))}
        </ul> */}
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
