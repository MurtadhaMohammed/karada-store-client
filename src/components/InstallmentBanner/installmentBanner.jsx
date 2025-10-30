import Image from "next/image";
import { useAppStore } from "@/lib/store";
const InstallmentBanner = ({ price, margin = 0 }) => {
  const { settings } = useAppStore();
  const installedPrice =
    (price * parseFloat(settings?.installment)) / 10 || (price * 1.2) / 10;
    
  return (
    <div
      className={`bg-[#f6f6f6] rounded-[8px] pt-[4px] pb-[4px] pl-[12px] pr-[12px] border border-[#eee] shadow-md active:scale-[0.96] active:opacity-50 transition-all pointer-events-none select-none`}
      style={{ marginTop: margin, marginBottom: margin }}
    >
      <div className="flex items-center ">
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
            قسط طلبك وادفع{" "}
            <b>{Number(installedPrice).toLocaleString("en")} د.ع </b> بالشهر
            ولمدة 10 اشهر لحاملي بطاقة كي كارد من مصرف الرافدين
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstallmentBanner;
