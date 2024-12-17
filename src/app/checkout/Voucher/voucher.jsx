"use client";
import { useState } from "react";
import Button from "@/components/UI/Button/button";
import { HiOutlineTicket } from "react-icons/hi";
import { apiCall } from "@/lib/api";
import { useAppStore } from "@/lib/store";
import { useCartStore } from "@/lib/cartStore";

const Voucher = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [error, setError] = useState("");
  const { userInfo } = useAppStore();
  const setVoucher = useCartStore((state) => state.setVoucher);
  const getSubTotal = useCartStore((state) => state.getSubTotal);
  const getTotal = useCartStore((state) => state.getTotal);

  const applyVoucher = async () => {
    try {
      const response = await apiCall({
        pathname: `/client/voucher/check-voucher`,
        method: "POST",
        data: {
          code: voucherCode,
          user_id: userInfo.id,
        },
      });

      if (response && response.voucher) {
        const voucher = response.voucher;
        const subTotal = getSubTotal();

        if (subTotal < voucher.min_amount) {
          setError(
            `The minimum amount for this voucher is ${voucher.min_amount.toLocaleString()} IQD.`
          );
          return;
        }

        let discount = 0;
        if (voucher.type === "%") {
          discount = (voucher.value / 100) * subTotal;
        } else {
          discount = voucher.value;
        }

        if (voucher.max_amount && discount > voucher.max_amount) {
          discount = voucher.max_amount;
        } else {
          setError("");
        }

        setVoucher(voucher); 
      } else {
        setError("Invalid voucher code");
      }
    } catch (err) {
      console.error("Error applying voucher:", err);
      setError("Error applying voucher");
    }
  };

  return (
    <div className="w-full rounded-[8px] border border-[#eee] mt-[20px] bg-white">
      <div className="flex items-center p-[16px]">
        <HiOutlineTicket className="text-[18px]" />
        <p className="mr-[6px]">كود الخصم</p>
      </div>
      <div className="p-[16px] pt-0 relative">
        <div className="flex gap-2">
          <input
            className="rounded-[8px] border border-[#eee] h-[48px] pl-[16px] pr-[16px] bg-[#F6F6F6] text-[16px] outline-none"
            placeholder="ادخل رمز التخفيظ هنا"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            style={{
              width: "calc(100% - 80px)",
            }}
          />
          <Button
            onClick={applyVoucher}
            className="bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] w-[80px] flex items-center justify-center"
          >
            <span className="text-[16px] -mt-[1px] ml-[12px] mr-[12px]">
              تطبيق
            </span>
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Voucher;