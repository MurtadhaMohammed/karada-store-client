import Image from "next/image";
import Button from "../UI/Button/button";

const InstallmentBanner = () => {
  return (
    <div className="bg-[#f6f6f6] rounded-[8px] border border-[#eee] pt-[4px] pb-[4px] pl-[12px] pr-[12px] shadow-md active:scale-[0.96] active:opacity-50 transition-all">
      <div className="flex items-center">
        <div className="h-[50px] w-[54px] grid relative ml-[8px]">
          <Image
            alt="image"
            src={"/images/qicard.png"}
            fill
            style={{ objectFit: "cover" }} 
          />
        </div>
        <div>
          <p className="text-[14px] block tight-custom flex-1">
            قسط طلبك وادفع IQD 45٬000 بالشهر ولمدة 10 اشهر لحاملي بطاقة كي كارد
            من مصرف الرافدين
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstallmentBanner;
