"use client";
import { PiInvoice } from "react-icons/pi";
import { useCartStore } from "@/lib/cartStore";
import { useAppStore } from "@/lib/store";

const Invoice = () => {
  const { voucher, cart } = useCartStore();
  const { settings } = useAppStore();

  const subTotal = cart.reduce(
    (total, item) => total + item?.product?.price * item.qt,
    0
  );
  const delivery_cost = parseInt(settings?.delivery) || 0;

  // Updated product discount calculation
  const productDiscount = cart.reduce((total, item) => {
    // Check if endPrice is valid and in the future
    const isValidEndPrice =
      item?.product?.endPrice &&
      item?.product?.endPrice < item?.product?.price &&
      new Date(item?.product?.endPrice_date) > new Date();

    const discount = isValidEndPrice
      ? (item?.product?.price - item?.product?.endPrice) * item.qt
      : 0;

    return total + discount;
  }, 0);

  let voucherDiscount = 0;
  if (voucher) {
    if (voucher.type === "%") {
      voucherDiscount = (voucher.value / 100) * subTotal;
    } else {
      voucherDiscount = voucher.value || 0;
    }

    if (voucher.max_amount && voucherDiscount > voucher.max_amount) {
      voucherDiscount = voucher.max_amount;
    }
  }

  const totalDiscount = (productDiscount || 0) + (voucherDiscount || 0);
  const realTotal = subTotal - totalDiscount + delivery_cost;

  const roundToNearest250 = (num) => {
    const total = Math.ceil(num / 250) * 250;
    return total < 0 ? 0 : total;
  };

  const roundedTotal = roundToNearest250(realTotal || 0);

  return (
    <div className="rounded-[8px] border border-[#eee] mt-[24px] bg-white">
      <div className="flex items-center p-[16px]">
        <PiInvoice className="text-[18px]" />
        <p className="mr-[6px]">تفاصيل الفاتورة</p>
      </div>
      <div className="p-[16px] pt-0">
        <div className="rounded-[8px] border border-[#eee] p-[16px]">
          <div className="flex items-center justify-between">
            <p>المجموع</p>
            <p>{subTotal.toLocaleString()} د.ع</p>
          </div>
          {totalDiscount > 0 && (
            <div className="flex items-center justify-between mt-[8px]">
              <p>قيمة الخصم</p>
              <p className="text-red-500">
                {totalDiscount.toLocaleString()}- د.ع
              </p>
            </div>
          )}
          <div className="flex items-center justify-between mt-[8px]">
            <p>كلفة التوصيل</p>
            <p>{delivery_cost.toLocaleString()} د.ع</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-[8px] border border-[#eee] p-[16px] pt-[8px] pb-[8px] mt-[8px]">
          <p className="text-[#666]">المبلغ النهائي</p>
          <b className="text-[24px]">{roundedTotal.toLocaleString()} د.ع</b>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
