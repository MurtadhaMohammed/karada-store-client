"use client";
import React, { useState } from "react";
import Button from "@/components/UI/Button/button";
import { HiOutlineTicket } from "react-icons/hi";
import { apiCall } from "@/lib/api";

const Voucher = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [totalPrice, setTotalPrice] = useState(100); // Example initial total price
  const [error, setError] = useState("");

  const applyVoucher = async () => {
    try {
      const response = await apiCall({
        pathname: `/client/voucher/create-order`,
        method: "POST",
        data: order,
      });
      if (response.ok) {
        const voucher = response;
        if (voucher) {
          let newTotalPrice = totalPrice;
          if (voucher.type === "%") {
            newTotalPrice -= newTotalPrice * (voucher.value / 100);
          } else if (voucher.type === "#") {
            newTotalPrice -= voucher.value;
          }
          setTotalPrice(newTotalPrice);
          setError("");
        }
      } else {
        setError("Invalid voucher code");
      }
    } catch (err) {
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
            className="rounded-[8px] border border-[#eee] h-[48px] pl-[16px] pr-[16px] bg-[#F6F6F6] text-[16px] outline-none"
            placeholder="ادخل رمز التخفيظ هنا"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            style={{
              width: "calc(100% - 80px)",
            }}
          />
          <Button
            className="bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] w-[80px] flex items-center justify-center"
            onClick={applyVoucher}
          >
            <span className="text-[16px] -mt-[1px] ml-[12px] mr-[12px]">
              تطبيق
            </span>
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-2">Total Price: {totalPrice}</p>
      </div>
    </div>
  );
};

export default Voucher;
