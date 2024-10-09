import Image from "next/image";
import Button from "../UI/Button/button";

const InstallmentBanner = () => {
  return (
    <div className="bg-[#f6f6f6] rounded-[8px] border border-[#eee] pt-[8px] pb-[8px] pl-[12px] pr-[12px] shadow-md active:scale-[0.96] active:opacity-50 transition-all">
      <b className="text-[14px] mb-[4px] block">
        قسط طلبك وادفع IQD 45٬000 بالشهر ولمدة 10 اشهر
      </b>
      <div className="flex items-center">
        <Image
          src={"/images/qicard.png"}
          width={30}
          height={20}
          className="rounded-[4px] ml-[8px]"
        />
        <div>
          <p className="text-[16px]">لحاملي بطاقة كي كارد من مصرف الرافدين</p>
        </div>
      </div>
    </div>
  );
};

export default InstallmentBanner;
