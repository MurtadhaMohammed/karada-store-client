import {
  TbSmartHome,
  TbCategory,
  TbShoppingCart,
  TbHeart,
} from "react-icons/tb";

const NavItem = ({ isActive = false, icon, label }) => {
  let activeStyle = isActive
    ? "text-violet-600 border-t border-t-violet-600"
    : "";
  return (
    <div
      className={`h-[70px] flex flex-col items-center justify-center active:scale-[0.94] mt-[1px] transition-all ${activeStyle}`}
    >
      {icon}
      <p className="text-[14px] mt-[4px]">{label}</p>
    </div>
  );
};

const BottomNabar = () => {
  return (
    <div className="h-[80px] fixed bottom-0 left-0 right-0 z-10 bg-white flex gap-4 justify-evenly items-center border-t border-t-[#f0f0f0] pb-[12px]">
      <NavItem
        icon={<TbSmartHome className="text-[26px]" />}
        label={"الرئيسية"}
        isActive
      />
      <NavItem
        icon={<TbCategory className="text-[26px]" />}
        label={"الاقسام"}
      />
      <NavItem
        icon={<TbShoppingCart className="text-[26px]" />}
        label={"سلة التسوق"}
      />

      <NavItem icon={<TbHeart className="text-[26px]" />} label={"المفضلة"} />
    </div>
  );
};

export default BottomNabar;
