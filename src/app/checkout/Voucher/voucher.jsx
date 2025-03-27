"use client";

import { useState } from "react";
import Button from "@/components/UI/Button/button";
import { HiOutlineTicket } from "react-icons/hi";
import { CiCircleCheck } from "react-icons/ci";
import { apiCall } from "@/lib/api";
import { useAppStore } from "@/lib/store";
import { useCartStore } from "@/lib/cartStore";

const Voucher = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [error, setError] = useState("");
  const { userInfo } = useAppStore();
  const setVoucher = useCartStore((state) => state.setVoucher);
  const cart = useCartStore((state) => state.cart);
  const clearVoucher = useCartStore((state) => state.clearVoucher);
  const getSubTotal = useCartStore((state) => state.getSubTotal);
  const getTotal = useCartStore((state) => state.getTotal);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucherDetails, setVoucherDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const applyVoucher = async () => {
    try {
      setLoading(true);
      const response = await apiCall({
        pathname: "/client/voucher/check-voucher",
        method: "POST",
        data: {
          code: voucherCode,
          user_id: userInfo.id,
        },
      });

      const errorMessages = {
        "Voucher not found": "القسيمة غير موجودة",
        "Invalid voucher": "القسيمة غير موجودة",
        "Voucher expired": "القسيمة منتهية",
        "Voucher is only valid for first order": "القسيمة تعمل على أول طلب فقط",
        "Voucher usage limit per user reached": "وصلت إلى الحد الأقصى لاستخدام القسيمة",
        "Voucher not yet active": "لم يتم تفعيل القسيمة بعد",
        "Voucher usage limit reached": "لقد تم استخدام هذه القسيمة بالفعل",
      };
      
      if (response.error && errorMessages[response.error]) {
        setError(errorMessages[response.error]);
        setLoading(false);
        return;
      }
      
      console.log(cart);

      const hasDiscountedItems = cart.some(
        (item) => item?.product?.endPrice < item?.product?.price 
      );

      if (hasDiscountedItems && !response?.voucher?.apply_over_discount) {
        setLoading(false);
        setError("لا يمكن تطبيق هذه القسيمة على سلة تحتوي على تخفيض.");
        return;
      }
      if (response && response.voucher) {
        const voucher = response.voucher;
        const subTotal = getSubTotal();

        if (subTotal < voucher.min_amount) {
          setLoading(false);
          setError(
            `الحد الأدنى لهذه القسيمة هو ${voucher.min_amount.toLocaleString()} دينار عراقي.`
          );
          return;
        }

        let discount =
          voucher.type === "%"
            ? (voucher.value / 100) * subTotal
            : voucher.value;
        if (voucher.max_amount && discount > voucher.max_amount) {
          discount = voucher.max_amount;
        }

        setError("");
        setLoading(false);
        setVoucher(voucher);
        setVoucherDetails(voucher);
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
    setVoucherDetails(null);
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
              <div className="flex items-center w-full text-gray-700">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-500 rounded-full ml-2 ">
                  <CiCircleCheck size={24} />
                </div>
                <div>
                  <span className="text-gray-500 text-sm">كود الخصم</span>
                  <span className="font-semibold text-indigo-600 p-1">
                    {voucherDetails.code}
                  </span>
                  <span className="text-gray-500 text-sm">بقيمة</span>
                  <span className="font-semibold text-indigo-600 p-1">
                    {voucherDetails.type === "%"
                      ? `${voucherDetails.value}%`
                      : `${voucherDetails.value.toLocaleString()} IQD`}
                  </span>
                </div>
              </div>

              <Button
                onClick={removeVoucher}
                className="border border-gray-300 text-gray-500 w-20 flex items-center justify-center rounded"
              >
                <span className="text-sm">الغاء</span>
              </Button>
            </>
          )}
        </div>

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Voucher;
