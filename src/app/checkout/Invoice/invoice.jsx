"use client";
import { PiInvoice } from "react-icons/pi";
import { useCartStore } from "@/lib/cartStore";
import { useAppStore } from "@/lib/store";

const Invoice = () => {
  const { voucher, getTotal, getSubTotal, cart } = useCartStore();
  const { settings } = useAppStore();
  const total = getTotal();
  const subTotal = getSubTotal();
  const totalDiscount = subTotal - total;

  // Calculate old delivery_cost as fallback
  const oldDeliveryCost =
    subTotal > 1000000
      ? parseInt(settings?.extraDelivery) || 0
      : parseInt(settings?.delivery) || 0;

  // Find the highest delivery value from products
  const productDeliveries = cart
    .map((item) => item.product?.delivery)
    .filter((delivery) => delivery != null && delivery !== "");

  const highestDelivery =
    productDeliveries.length > 0
      ? Math.max(...productDeliveries.map((d) => parseInt(d) || 0))
      : null;

  // Use highest delivery if available, otherwise use old delivery_cost
  const delivery_cost =
    highestDelivery !== null ? highestDelivery : oldDeliveryCost;

  const totalAfterVoucher = total - (voucher?.value || 0);
  const realTotal = totalAfterVoucher + delivery_cost;

  const roundToNearest250 = (num) => {
    const _total = Math.ceil(num / 250) * 250;
    return _total < 0 ? 0 : _total;
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
            <p>{total?.toLocaleString("en")} د.ع</p>
          </div>
          {totalDiscount > 0 && (
            <div className="flex items-center justify-between mt-[8px]">
              <p>قيمة الخصم</p>
              <p className="text-red-500">
                {totalDiscount?.toLocaleString("en")}- د.ع
              </p>
            </div>
          )}
          {voucher && voucher?.value > 0 && (
            <div className="flex items-center justify-between mt-[8px]">
              <p>خصم القسيمة</p>
              <p className="text-green-600">
                {voucher?.value?.toLocaleString("en")}- د.ع
              </p>
            </div>
          )}
          <div className="flex items-center justify-between mt-[8px]">
            <p>كلفة التوصيل</p>
            <p>{delivery_cost?.toLocaleString("en")} د.ع</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-[8px] border border-[#eee] p-[16px] pt-[8px] pb-[8px] mt-[8px]">
          <p className="text-[#666]">المبلغ النهائي</p>
          <b className="text-[24px]">
            {roundedTotal?.toLocaleString("en")} د.ع
          </b>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
