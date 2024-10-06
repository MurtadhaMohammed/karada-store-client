import {
  TbSmartHome,
  TbCategory,
  TbShoppingCart,
  TbHeart,
} from "react-icons/tb";
import { BsBox2Heart } from "react-icons/bs";

const BottomNabar = () => {
  return (
    <div className="h-[80px] fixed bottom-0 left-0 right-0 z-10 bg-white flex gap-4 justify-evenly items-center border-t border-t-[#f0f0f0] pb-[12px]">
      <div className="h-[70px] flex flex-col items-center justify-center active:scale-[0.94] transition-all text-gray-700">
        <TbSmartHome className="text-[26px]" />
        <p className="text-[14px] mt-[4px]">الرئيسية</p>
      </div>
      <div className="h-[70px] flex flex-col items-center justify-center active:scale-[0.94] transition-all text-gray-700">
        <TbCategory className="text-[26px]" />
        <p className="text-[14px] mt-[4px]">الاقسام</p>
      </div>
      <div className="h-[70px] flex flex-col items-center justify-center active:scale-[0.94] transition-all text-gray-700">
        <TbShoppingCart className="text-[26px]" />
        <p className="text-[14px] mt-[4px]">سلة التسوق</p>
      </div>
      <div className="h-[70px] flex flex-col items-center justify-center active:scale-[0.94] transition-all text-gray-700">
        <TbHeart className="text-[26px]" />
        <p className="text-[14px] mt-[4px]">المفضلة</p>
      </div>
    </div>
  );
};

export default BottomNabar;
