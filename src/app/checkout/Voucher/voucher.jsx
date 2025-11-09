"use client";

import { useState } from "react";
import Button from "@/components/UI/Button/button";
import { HiOutlineTicket } from "react-icons/hi";
import { CiCircleCheck } from "react-icons/ci";
import { apiCall } from "@/lib/api";
// import { useAppStore } from "@/lib/store";
import { useCartStore } from "@/lib/cartStore";

const Voucher = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [error, setError] = useState("");
  // const { userInfo } = useAppStore();
  // const setVoucher = useCartStore((state) => state.setVoucher);
  const cart = useCartStore((state) => state.cart);
  const clearVoucher = useCartStore((state) => state.clearVoucher);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voucherAmount, setVoucherAmount] = useState(0);
  const [voucherMsg, setVoucherMsg] = useState("");

  const applyVoucher = async () => {
    try {
      setLoading(true);
      const response = await apiCall({
        pathname: "/app/order/voucher",
        method: "POST",
        auth: true,
        data: {
          code: voucherCode,
          items: cart.map((item) => ({
            productId: item.product.id,
            qty: item.qt,
            l1: item.product.l1?.uuid,
          })),
        },
      });

      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }

      if (response && response.id) {
        setError("");
        setLoading(false);
        setVoucherAmount(response.value);
        setVoucherMsg(response.msg || "");
        setVoucherApplied(true);
      } else {
        setError("هذه القسيمة غير صالحة.");
      }
    } catch (err) {
      console.error("Error applying voucher:", err);
      setLoading(false);
      setError("هنالك مشكلة في تطبيق القسيمة.");
    }
  };

  const removeVoucher = () => {
    setVoucherCode("");
    clearVoucher();
    setVoucherApplied(false);
    setError("");
  };

  return (
    <div className="w-full rounded-[8px] border border-[#eee] mt-[20px] bg-white">
      <div className="flex items-center p-[16px]">
        <HiOutlineTicket className="text-[18px]" />
        <p className="mr-[6px]">كود الخصم</p>
      </div>

      <div className="p-4 pt-0 relative">
        <div className="flex gap-2 items-center">
          {!voucherApplied ? (
            <>
              <input
                className="rounded-lg border border-gray-300 h-12 px-4 w-full bg-gray-100 text-gray-800 text-sm focus:outline-none focus:border-indigo-500"
                placeholder="ادخل رمز التخفيض هنا"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
              />
              <Button
                onClick={applyVoucher}
                className={`${
                  loading
                    ? "animate-pulse bg-gradient-to-r from-indigo-600 to-violet-600 text-white w-20  flex items-center justify-center"
                    : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white w-20  flex items-center justify-center"
                }`}
              >
                <span className="text-sm">تطبيق</span>
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-col w-full text-gray-700">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-500 rounded-full ml-2 ">
                    <CiCircleCheck size={24} />
                  </div>
                  <div className="flex-1">
                    {voucherMsg && voucherMsg.trim() !== "" ? (
                      // Display message voucher
                      <div>
                        <span className="text-gray-500 text-sm">كود الخصم</span>
                        <span className="font-semibold text-indigo-600 p-1">
                          {voucherCode}
                        </span>
                        <div className=" ">{voucherMsg}</div>
                      </div>
                    ) : (
                      // Display regular discount voucher
                      <div>
                        <div>
                          <span className="text-gray-500 text-sm">
                            كود الخصم
                          </span>
                          <span className="font-semibold text-indigo-600 p-1">
                            {voucherCode}
                          </span>
                          <span className="text-gray-500 text-sm">بقيمة</span>
                          <span className="font-semibold text-indigo-600 p-1">
                            {`${voucherAmount.toLocaleString("en")} IQD`}
                          </span>
                        </div>
                        {/* {!voucherDetails.apply_to_all && (
                          <div className="text-xs text-gray-500 mt-1">
                            يطبق على {getVoucherApplicableItems().length} من{" "}
                            {cart.length} منتجات - خصم:{" "}
                            {getVoucherDiscount().toLocaleString()} د.ع
                          </div>
                        )} */}
                        {/* {voucherDetails.apply_to_all && (
                          <div className="text-xs text-gray-500 mt-1">
                            يطبق على جميع المنتجات - خصم:{" "}
                            {getVoucherDiscount().toLocaleString()} د.ع
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={removeVoucher}
                    className="border border-gray-300 text-gray-500 w-20 flex items-center justify-center rounded"
                  >
                    <span className="text-sm">الغاء</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Voucher;
