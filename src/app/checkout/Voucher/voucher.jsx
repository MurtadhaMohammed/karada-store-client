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
  const getVoucherApplicableItems = useCartStore(
    (state) => state.getVoucherApplicableItems
  );
  const getVoucherDiscount = useCartStore((state) => state.getVoucherDiscount);
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
          cart_items: cart.map((item) => ({
            product_id: item.product?.id || item.id,
            productId: item.product?.id || item.id,
            id: item.product?.id || item.id,
            quantity: item.quantity,
            price: item.product?.endPrice || item.product?.price,
          })),
        },
      });

      const errorMessages = {
        "Voucher not found": "القسيمة غير موجودة",
        "Invalid voucher": "القسيمة غير موجودة",
        "Voucher expired": "القسيمة منتهية",
        "Voucher is only valid for first order": "القسيمة تعمل على أول طلب فقط",
        "Voucher usage limit per user reached":
          "وصلت إلى الحد الأقصى لاستخدام القسيمة",
        "Voucher not yet active": "لم يتم تفعيل القسيمة بعد",
        "Voucher usage limit reached": "لقد تم استخدام هذه القسيمة بالفعل",
        "This voucher is not applicable to any items in your cart":
          "هذه القسيمة لا تنطبق على أي من المنتجات في سلتك",
      };

      if (response.error && errorMessages[response.error]) {
        setError(errorMessages[response.error] || response.error);
        setLoading(false);
        return;
      }

      const hasDiscountedItems = cart.some(
        (item) =>  item?.product?.endPrice && item?.product?.endPrice < item?.product?.price
      );

      console.log({hasDiscountedItems})

      if (hasDiscountedItems && !response?.voucher?.apply_over_discount) {
        setLoading(false);
        setError("لا يمكن تطبيق هذه القسيمة على سلة تحتوي على تخفيض.");
        return;
      }
      if (response && response.voucher) {
        const voucher = response.voucher;

        // Check minimum amount based on applicable items
        let checkAmount = 0;
        if (voucher.apply_to_all) {
          checkAmount = getSubTotal();
        } else if (voucher.product_ids && voucher.product_ids.length > 0) {
          // Calculate total for applicable products only
          checkAmount = cart
            .filter((item) => voucher.product_ids.includes(item.product?.id))
            .reduce((total, item) => {
              const price = item.product?.endPrice || item.product?.price || 0;
              return total + price * item.qt;
            }, 0);
        }

        if (checkAmount < voucher.min_amount) {
          setLoading(false);
          setError(
            `الحد الأدنى لهذه القسيمة هو ${voucher.min_amount.toLocaleString()} دينار عراقي.`
          );
          return;
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
              <div className="flex flex-col w-full text-gray-700">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-500 rounded-full ml-2 ">
                    <CiCircleCheck size={24} />
                  </div>
                  <div className="flex-1">
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
                    {!voucherDetails.apply_to_all && (
                      <div className="text-xs text-gray-500 mt-1">
                        يطبق على {getVoucherApplicableItems().length} من{" "}
                        {cart.length} منتجات - خصم:{" "}
                        {getVoucherDiscount().toLocaleString()} د.ع
                      </div>
                    )}
                    {voucherDetails.apply_to_all && (
                      <div className="text-xs text-gray-500 mt-1">
                        يطبق على جميع المنتجات - خصم:{" "}
                        {getVoucherDiscount().toLocaleString()} د.ع
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
