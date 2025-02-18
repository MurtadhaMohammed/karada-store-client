"use client";
import { PiInvoice } from "react-icons/pi";
import { useCartStore } from "@/lib/cartStore";

const Invoice = () => {
  const { getTotal, voucher, cart } = useCartStore();

  const subTotal = getTotal() || 0;
  const deliveryCost = 5000;

  // Calculate product discounts
  const productDiscount = cart.reduce((total, item) => {
    const discount =
      item?.product?.discount?.active &&
      item?.product?.discount?.end_at > new Date()
        ? item?.product?.discount?.value || 0
        : 0;
    return total + discount * item.qt;
  }, 0);

  // Calculate voucher discount with capping
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
  const realTotal = subTotal - totalDiscount + deliveryCost;

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
            <p>{subTotal.toLocaleString()} IQD</p>
          </div>
          {productDiscount > 0 && (
            <div className="flex items-center justify-between mt-[8px]">
              <p>خصم المنتجات</p>
              <p>{productDiscount.toLocaleString()}- IQD</p>
            </div>
          )}
          {voucherDiscount > 0 && (
            <div className="flex items-center justify-between mt-[8px]">
              <p>قيمة الخصم</p>
              <p className="text-red-500">
                {voucherDiscount.toLocaleString()}- IQD
              </p>
            </div>
          )}
          <div className="flex items-center justify-between mt-[8px]">
            <p>كلفة التوصيل</p>
            <p>{deliveryCost.toLocaleString()} IQD</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-[8px] border border-[#eee] p-[16px] pt-[8px] pb-[8px] mt-[8px]">
          <p className="text-[#666]">المبلغ النهائي</p>
          <b className="text-[24px]">{roundedTotal.toLocaleString()} IQD</b>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
