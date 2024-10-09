"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  TbSmartHome,
  TbCategory,
  TbCategoryFilled,
  TbShoppingCart,
  TbShoppingCartFilled,
  TbHeart,
  TbHeartFilled,
} from "react-icons/tb";


const NavItem = ({ isActive = false, icon, label, to = "/" }) => {
  const router = useRouter();

  let activeStyle = isActive
    ? "!text-violet-600 border-t !border-t-violet-600"
    : "";
  return (
    <div
      onClick={() => router.replace(to)}
      className={`h-[70px] flex flex-col items-center justify-center active:scale-[0.94] mt-[1px] transition-all ${activeStyle}`}
    >
      {icon}
      <p className="text-[14px] mt-[4px]">{label}</p>
    </div>
  );
};

const BottomNabar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const screenView = ["/", "/categories", "/cart?from=home", "/faivorates"];
  return (

      <div
        className="h-[80px] fixed left-0 right-0 z-10 bg-white flex gap-4 justify-evenly items-center border-t border-t-[#f0f0f0] pb-[12px] transition-all"
        style={{
          bottom: screenView?.find(
            (el) =>
              el === pathname ||
              el === `${pathname}?from=${searchParams.get("from")}`
          )
            ? 0
            : "-80px",
        }}
      >
        <NavItem
          icon={<TbSmartHome className="text-[26px]" />}
          label={"الرئيسية"}
          isActive={pathname === "/"}
        />
        <NavItem
          to="/categories"
          icon={
            pathname === "/categories" ? (
              <TbCategoryFilled className="text-[26px]" />
            ) : (
              <TbCategory className="text-[26px]" />
            )
          }
          label={"الاقسام"}
          isActive={pathname === "/categories"}
        />
        <NavItem
          to="/cart?from=home"
          icon={
            pathname === "/cart" ? (
              <TbShoppingCartFilled className="text-[26px]" />
            ) : (
              <TbShoppingCart className="text-[26px]" />
            )
          }
          label={"سلة التسوق"}
          isActive={pathname === "/cart"}
        />

        <NavItem
          to="/faivorates"
          icon={
            pathname === "/faivorates" ? (
              <TbHeartFilled className="text-[26px]" />
            ) : (
              <TbHeart className="text-[26px]" />
            )
          }
          label={"المفضلة"}
          isActive={pathname === "/faivorates"}
        />
      </div>

  );
};

export default BottomNabar;
