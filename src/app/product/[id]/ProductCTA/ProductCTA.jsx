"use client";
import { motion } from "framer-motion"; // Import framer-motion components
import Container from "@/components/UI/Container/container";
import IconButton from "@/components/UI/IconButton/iconButton";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import Ripples from "react-ripples";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { useEffect } from "react";

const ProductCTA = ({ product, onAddToCart, selectedOption, disabled }) => {
  const { getQty, increase, decrease, removeItem, getItemsTotal, cart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/cart");
  }, [router]);

  let qty = getQty(product?.id, selectedOption);

  const handleIncrease = () => increase(product, selectedOption);
  const handleDecrease = () => decrease(product, selectedOption);
  const handleClear = () => removeItem(product, selectedOption);

  return (
    <div
      className="fixed -bottom-1 left-0 right-0 z-20 w-full border-t border-t-[#eee]"
      style={{
        background:
          qty === 0 
            ? disabled 
              ? "linear-gradient(to right, #9ca3af, #d1d5db)" 
              : "linear-gradient(to right, #4f46e5, #7c3aed)"
            : "#fff",
        height: qty === 0 ? 64 : 160,
        transition: ".3s ease-in-out",
      }}
    >
      <Container>
        {qty === 0 ? (
          <motion.button
            key="add-to-cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.42, 0, 0.58, 1],
            }}
            className={`p-4 flex w-full h-full items-center justify-center text-[#fff] ${
              disabled ? "pointer-events-none" : ""
            }`}
            onClick={onAddToCart}
          >
            <FaPlus className="text-[18px]" />
            <b className="mr-[6px] text-[18px]">أضافة الى السلة</b>
          </motion.button>
        ) : (
          <motion.div
            key="quantity-control"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              duration: qty === 0 ? 0.9 : 0,
              // ease: [0.42, 0, 0.58, 1],
            }}
          >
            <div className="flex items-center justify-between pl-4 pr-4 pb-2  h-[78px]">
              <div className="flex items-center ">
                <IconButton
                  onClick={handleIncrease}
                  rounded={"50%"}
                  className="p-[8px] w-[42px] h-[42px] bg-[#f6f6f6] border border-[#eee] flex items-center justify-center rounded-full"
                  icon={<FiPlus className="text-[38px]" />}
                />
                <motion.p
                  key={qty}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.42, 0, 0.58, 1],
                  }}
                  className="text-[18px] mx-4"
                >
                  {qty}
                </motion.p>
                <IconButton
                  onClick={handleDecrease}
                  rounded={"50%"}
                  className="p-[8px] w-[42px] h-[42px] bg-[#f6f6f6] border border-[#eee] flex items-center justify-center rounded-full"
                  icon={<FiMinus className="text-[38px]" />}
                />
              </div>
              <IconButton
                onClick={handleClear}
                rounded={"8px"}
                className="p-[8px] w-[42px] h-[42px] bg-[#f6f6f6] border border-[#eee] flex items-center justify-center rounded-full"
                icon={<FiTrash2 className="text-[22px] text-[#ff0000]" />}
              />
            </div>
          </motion.div>
        )}
      </Container>
      {qty > 0 && (
        <Container>
          <motion.div
            key={"cart"}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{
              duration: 0.3,
              // ease: [0.24, 0, 0.58, 1],
            }}
          >
            <div
              className="h-[56px] active:scale-[0.96]  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
              style={{
                display: "inline-flex",
                borderRadius: 28,
                overflow: "hidden",
                width: "100%",
              }}
            >
              <Ripples className="!grid w-full">
                <button
                  onClick={() => router.push("/cart?from=product")}
                  className="flex items-center justify-between h-[56px] w-full rounded-[28px]  bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] p-4 app-link"
                >
                  <span className="text-[18px] text-indigo-600 font-bold flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#f6f6f6]">
                    {getItemsTotal()}
                  </span>
                  <span className="ml-[8px] font-bold text-[18px]">
                    عرض السلة
                  </span>
                  <FaArrowLeft className="text-[22px]" />
                </button>
              </Ripples>
            </div>
          </motion.div>
        </Container>
      )}
    </div>
  );
};

export default ProductCTA;
