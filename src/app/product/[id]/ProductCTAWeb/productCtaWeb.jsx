import { useCartStore } from "@/lib/cartStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import IconButton from "@/components/UI/IconButton/iconButton";

const ProductCtaWeb = ({ product, isAddToCartDisabled }) => {
  const {
    getQty,
    increase,
    decrease,
    removeItem,
    getItemsTotal,
    cart,
    addItem,
  } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/cart");
  }, [router]);

  let qty = getQty(product?.id);

  const handleClear = () => {
    removeItem(product);
  };
  const handleIncrease = () => increase(product);
  const handleDecrease = () => decrease(product);

  return (
       <div className="mt-[24px] flex items-center gap-4">
      {qty === 0 ? (
        <button
          onClick={() => addItem(product)}
          className={`h-[48px] w-[180px] rounded-[24px] flex items-center justify-center transition-all active:scale-95 ${
            isAddToCartDisabled
              ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
              : "bg-[#fff] text-violet-600 border border-violet-600"
          }`}
          disabled={isAddToCartDisabled}
        >
          <FaPlus className="text-[18px]" />
          <b className="mr-[6px] text-[18px]">أضافة الى السلة</b>
        </button>
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
          <div className="flex items-center pl-4 pr-4">
            <IconButton
              onClick={handleIncrease}
              rounded={"50%"}
              className="p-[8px] w-[42px] h-[42px] bg-[#f6f6f6] border border-[#eee] flex items-center justify-center rounded-full"
              icon={<FiPlus className="text-[38px] text-violet-600" />}
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
                icon={<FiMinus className="text-[38px] text-violet-600" />}
              />
            )}
          </div>
        </motion.div>
      )}
      {qty !== 0 && (
        <button
          onClick={() => router.push("/cart")}
          className="h-[48px] w-[130px] rounded-[24px] bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] flex items-center justify-center border border-violet-600 transition-all active:scale-95"
        >
          <b className="mr-[6px] text-[18px]">عرض السلة</b>
        </button>
      )}
    </div>
  );
};

export default ProductCtaWeb;
