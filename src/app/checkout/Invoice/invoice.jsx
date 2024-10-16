import { PiInvoice } from "react-icons/pi";

const Invoice = () => {
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
            <p>350,000 IQD</p>
          </div>
          <div className="flex items-center justify-between mt-[8px]">
          <p>قيمة الخصم</p>
            <p>20,000 IQD</p>
          </div>
          <div className="flex items-center justify-between  mt-[8px]">
            <p>كلفة التوصيل</p>
            <p>5,000 IQD</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-[8px] border border-[#eee] p-[16px] pt-[8px] pb-[8px] mt-[8px]">
          <p className="text-[#666]">المبلغ النهائي</p>
          <b className="text-[24px]">335,000 IQD</b>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
