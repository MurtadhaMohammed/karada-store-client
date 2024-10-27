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

const ProductCTA = ({ product, disabled = false, onAddToCart }) => {
  const { getQty, increase, decrease, removeItem, getItemsTotal } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/cart");
  }, [router]);

  let qty = getQty(product?.id);

  const handleClear = () => removeItem(product);
  const handleIncrease = () => increase(product);
  const handleDecrease = () => decrease(product);

  return (
    <div
      className="fixed -bottom-1 z-10 w-full border-t border-t-[#eee]"
      style={{
        background:
          qty === 0 ? "linear-gradient(to right, #4f46e5, #7c3aed)" : "#fff",
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
    </div>
  );
};

export default ProductCTA;
