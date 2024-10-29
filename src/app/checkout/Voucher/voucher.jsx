"use client";
import { useState, useEffect } from "react";
import Button from "@/components/UI/Button/button";
import { HiOutlineTicket } from "react-icons/hi";
import { apiCall } from "@/lib/api";
import { useAppStore } from "@/lib/store";
import { useCartStore } from "@/lib/cartStore";

const Voucher = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [totalPrice, setTotalPrice] = useState(100);
  const [error, setError] = useState("");
  const { userInfo } = useAppStore();
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    const calculatedTotalPrice = cart.reduce(
      (total, item) => total + item.product.price * item.qt,
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, [cart]);

  const applyVoucher = async () => {
    console.log("Attempting to apply voucher");
    try {
      const response = await apiCall({
        pathname: `/client/voucher/check-voucher`,
        method: "POST",
        data: {
          code: voucherCode,
          user_id: userInfo.id,
        },
      });
      if (response.ok) {
        console.log("Voucher applied successfully");
        setError("");
      } else {
        setError("Invalid voucher code");
      }
    } catch (err) {
      console.error("Error applying voucher:", err);
      setError("Error applying voucher");
    }
  };
  

  return (
    <div className="w-full rounded-[8px] border border-[#eee] mt-[20px]">
      <div className="flex items-center p-[16px]">
        <HiOutlineTicket className="text-[18px]" />
        <p className="mr-[6px]">كود الخصم</p>
      </div>
      <div className="p-[16px] pt-0 relative">
        <div className="flex gap-2">
          <input
            className="rounded-[8px] border border-[#eee] h-[48px]  pl-[16px] pr-[16px] bg-[#F6F6F6] text-[16px] outline-none"
            placeholder="ادخل رمز التخفيظ هنا"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            style={{
              width: "calc(100% - 80px)",
            }}
          />
          <Button
            onClick={applyVoucher}
            className="bg-gradient-to-r from-indigo-600 to-violet-600  text-[#fff] w-[80px] flex items-center justify-center"
          >
            <span className="text-[16px] -mt-[1px] ml-[12px] mr-[12px]">
              تطبيق
            </span>
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {/* <p className="mt-2">Total Price: {totalPrice}</p> */}
      </div>
    </div>
  );
};

export default Voucher;
