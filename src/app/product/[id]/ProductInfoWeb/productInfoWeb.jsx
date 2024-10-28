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

const ProductInfoWeb = ({ product }) => {
  const [setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeOption, setActiveOption] = useState(null);
  const { addItem } = useCartStore();

  const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites_product")) || [];
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
      // Find the index of the image that matches the option's img
      const imageIndex = product?.image?.findIndex(
        (img) => img.url === option.img
      );
      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex); // Update the current image index state
      }
      setActiveOption(index); // Set the active option
      product.l1 = product?.options[index]; // Update the product option
    }
  };

  const handleAddToCart = () => {
    addItem(product, product.l1);
  };

  return (
    <div className="mt-[48px] ">
      <Container>
        <div className="flex gap-10 mb-[40px] pb-[40px] border-b border-b-[#eee]">
          <section className="flex gap-4">
            <div className="flex-1">
              {product?.image?.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentImageIndex(i)} // Click to select image
                  className={`w-[80px] h-[80px] rounded-[12px] mb-4 relative overflow-hidden ${
                    currentImageIndex === i
                      ? "border border-[#975aff] shadow-[0_4px_20px_rgb(0,0,0,0.08)]"
                      : ""
                  }`}
                >
                  <Image
                    src={`${IMAGE_URL}/${img?.url}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
            <motion.div
              key={currentImageIndex} // important for animating between images
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-[16px] w-[450px] h-[450px] relative overflow-hidden"
            >
              <Image
                src={`${IMAGE_URL}/${product?.image[currentImageIndex]?.url}`}
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          </section>

          <section className="border-r border-r-[#eee] pr-8">
            <h4 className="text-[18px] mt-[16px]">{product?.name}</h4>
            {product?.price === product?.endPrice ? (
              <b className="text-[22px] block">
                {Number(product?.endPrice).toLocaleString("en")}{" "}
                <span className="text-[14px]">IQD</span>
              </b>
            ) : (
              <div className="flex flex-col items-start">
                <p className="text-[18px] block line-through text-[#a5a5a5] italic">
                  {Number(product?.price).toLocaleString("en")}
                </p>
                <b className="text-[22px] block">
                  {Number(product?.endPrice).toLocaleString("en")}{" "}
                  <span className="text-[14px]">IQD</span>
                </b>
              </div>
            )}

            <p className="text-[14px] text-gray-600 mt-[8px]">
              {product?.description}
            </p>
            <div className="flex items-center mt-[16px]">
              <TbTruckDelivery className="text-[16px]" />
              <span className="mr-[8px] text-[14px]">
                عادة مايتم توصيل المنتجات في 3-5 أيام
              </span>
            </div>
            <div className="mt-4 pt-4">
              {product?.options && product?.options.length > 0 && (
                <h5 className="text-[16px] ">الخيارات</h5>
              )}
            </div>
            {product?.options && product?.options.length > 0 && (
              <div className="flex items-center mt-[8px]">
                <div className="ml-[12px]">
                  {product?.options.map((option, index) => (
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

            <ProductCtaWeb product={product} onAddToCart={handleAddToCart} />
          </section>
        </div>
      </Container>
    </div>
  );
};

export default ProductInfoWeb;
