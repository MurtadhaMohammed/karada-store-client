import Button from "@/components/UI/Button/button";
import { HiOutlineTicket } from "react-icons/hi";

const Voucher = () => {
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
            style={{
              width: "calc(100% - 80px)",
            }}
          />
          <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] w-[80px] flex items-center justify-center">
            <span className="text-[16px] -mt-[1px] ml-[12px] mr-[12px]">
              تطبيق
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Voucher;
