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

const ProductCTA = ({ product, disabled }) => {
  const { getQty, increase, decrease, removeItem, addItem } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/cart");
  }, [router]);

  let qty = getQty(product);

  const handleIncrease = () => increase(product);
  const handleDecrease = () => decrease(product);
  const handleClear = () => removeItem(product);

  return (
    <div className="fixed -bottom-1 left-0 right-0 z-20 w-full">
      {qty === 0 ? (
        <Container>
          <motion.button
            key="add-to-cart"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.1,
            }}
            className={`p-4 shadow-md mb-[20px]  flex w-full h-full items-center justify-center  rounded-full  bg-gradient-to-r ${
              disabled
                ? "from-[#f6f6f6] to-[#eee] text-[#a5a5a5]"
                : "from-indigo-600 to-purple-600 text-[#fff]"
            }  active:scale-90 transition-all ${
              disabled ? "pointer-events-none" : ""
            }`}
            onClick={() => addItem(product)}
          >
            <FaPlus className="text-[18px]" />
            <b className="mr-[6px] text-[18px]">أضافة الى السلة</b>
          </motion.button>
        </Container>
      ) : (
        <div className="pt-[16px] pb-[20px]  border-t border-t-[#eee] bg-white">
          <Container>
            <div>
              <div className="flex items-center justify-between">
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
                      duration: 0.3,
                      ease: [0.42, 0, 0.58, 1],
                    }}
                    className="text-[18px] mx-4"
                  >
                    {qty}
                  </motion.p>
                  {qty === 1 ? (
                    <IconButton
                      onClick={handleClear}
                      rounded={"50%"}
                      className="p-[8px] w-[42px] h-[42px] bg-[#f6f6f6] border border-[#eee] flex items-center justify-center rounded-full"
                      icon={<FiTrash2 className="text-[22px] text-[#ff0000]" />}
                    />
                  ) : (
                    <IconButton
                      onClick={handleDecrease}
                      rounded={"50%"}
                      className="p-[8px] w-[42px] h-[42px] bg-[#f6f6f6] border border-[#eee] flex items-center justify-center rounded-full"
                      icon={<FiMinus className="text-[38px]" />}
                    />
                  )}
                </div>

                <motion.div
                  key={"cart"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{
                    duration: 0.2,
                    // ease: [0.24, 0, 0.58, 1],
                  }}
                >
                  <div
                    className="h-[56px]  active:scale-[0.96]  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                    style={{
                      borderRadius: 28,
                      overflow: "hidden",
                    }}
                  >
                    <Ripples className="w-full">
                      <button
                        onClick={() => router.push("/cart?from=product")}
                        className="flex items-center justify-between w-[200px] h-[56px]  rounded-[28px]  bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] px-6 app-link"
                      >
                        <span className="ml-[8px] font-bold text-[18px]">
                          عرض السلة
                        </span>
                        <FaArrowLeft className="text-[22px]" />
                      </button>
                    </Ripples>
                  </div>
                </motion.div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default ProductCTA;
