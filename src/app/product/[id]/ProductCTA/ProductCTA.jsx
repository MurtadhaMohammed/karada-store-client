"use client";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion components
import Container from "@/components/UI/Container/container";
import IconButton from "@/components/UI/IconButton/iconButton";
import { useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import Ripples from "react-ripples";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";

const ProductCTA = () => {
  const [qty, setQty] = useState(0);
  const router = useRouter();

  const handleIncrease = () => setQty(qty + 1);
  const handleDecrease = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };

  // Adjust the minHeight to keep it consistent between states
  const containerHeight = qty === 0 ? "80px" : "140px"; // Adjust as needed for both states

  return (
    <div
      className="fixed bottom-0 z-10 w-full border-t border-[#eee]"
      style={{
        background:
          qty === 0 ? "linear-gradient(to right, #4f46e5, #7c3aed)" : "#fff",
        paddingBottom: qty !== 0 ? "20px" : "0px",
        minHeight: containerHeight, // Set consistent height for both states
        transition: ".3s ease-in-out", // Smooth transition
      }}
    >
      <Container>
        <AnimatePresence mode="wait">
          {qty === 0 ? (
            <motion.button
              key="add-to-cart"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.2,
                ease: [0.42, 0, 0.58, 1],
              }}
              className="p-6 flex w-full h-full items-center justify-center active:opacity-50 text-[#fff]"
              onClick={() => setQty(1)}
            >
              <FaPlus className="text-[18px]" />
              <b className="mr-[6px] text-[18px]">أضافة الى السلة</b>
            </motion.button>
          ) : (
            <motion.div
              key="quantity-control"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: qty === 0 ? 0.4 : 0,
                // ease: [0.42, 0, 0.58, 1],
              }}
            >
              <div className="flex items-center p-6 pt-4 justify-evenly">
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
                    duration: 0.2,
                    ease: [0.42, 0, 0.58, 1],
                  }}
                  className="pl-[6px] pr-[6px] mt-1 text-[18px] font-bold"
                >
                  {qty}
                </motion.p>
                <IconButton
                  rounded={"50%"}
                  onClick={handleDecrease}
                  className="p-[8px] w-[42px] h-[42px] bg-[#f6f6f6] border border-[#eee] flex items-center justify-center rounded-full"
                  icon={<FiMinus className="text-[38px]" />}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      {qty > 0 && (
        <Container>
          <motion.div
            key={"cart"}
            className="active:scale-[0.96]  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
            style={{
              display: "inline-flex",
              borderRadius: 28,
              overflow: "hidden",
              width: "100%",
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              duration: 0.4,
              //ease: [0.24, 0, 0.58, 1],
            }}
          >
            <Ripples className="!grid w-full">
              <button
                onClick={() => router.push("cart")}
                className="flex items-center justify-between h-[56px] rounded-[28px]  bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] p-4"
              >
                <span className="text-[18px] text-indigo-600 font-bold flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#f6f6f6]">
                  {qty}
                </span>
                <span className="ml-[8px] font-bold text-[18px]">
                  عرض السلة
                </span>
                <FaArrowLeft className="text-[22px]" />
              </button>
            </Ripples>
          </motion.div>
        </Container>
      )}
    </div>
  );
};

export default ProductCTA;
