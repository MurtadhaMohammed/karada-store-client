import Input from "@/components/UI/Input/input";
import { GrLocation } from "react-icons/gr";

const Address = () => {
  return (
    <div className=" rounded-[8px] border border-[#eee] mt-[20px]">
      <div className="flex items-center p-[16px]">
        <GrLocation className="text-[18px]" />
        <p className="mr-[6px]">تفاصيل العنوان</p>
      </div>
      <div className="p-[16px] pt-0">
        <Input hint="العنوان الكامل" />
        {/* <div className="h-[8px]"></div>
        <Input hint="اقرب نقطة دالة" /> */}
        <div className="h-[12px]"></div>
        <Input hint="رقم الهاتف" />
        <div className="h-[12px]"></div>
        <Input hint="ملاحظات" />
      </div>
    </div>
  );
};

export default Address;
