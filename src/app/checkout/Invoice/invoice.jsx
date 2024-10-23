"use client"
import { PiInvoice } from "react-icons/pi";
import { useCartStore } from "@/lib/cartStore";

const Invoice = () => {
  const { getSubTotal, getTotal } = useCartStore();
  
  const subTotal = getSubTotal();
  const discount = 20000;
  const deliveryCost = 5350; 
  const realTotal = subTotal - discount + deliveryCost;

  const roundToNearest250 = (num) => {
    return Math.ceil(num / 250) * 250;
  };

  const roundedTotal = roundToNearest250(realTotal);

  return (
    <div className="rounded-[8px] border border-[#eee] mt-[24px]">
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
          <div className="flex items-center justify-between mt-[8px]">
            <p>قيمة الخصم</p>
            <p>{discount.toLocaleString()} IQD</p>
          </div>
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
