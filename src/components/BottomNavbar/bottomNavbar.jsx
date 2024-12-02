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
  TbBrandFirebase,
} from "react-icons/tb";

import Container from "../UI/Container/container";
import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/lib/cartStore";

const NavItem = ({ isActive = false, icon, label, to = "/", count = 0 }) => {
  //   const router = useRouter();

  let activeStyle = isActive
    ? "!text-violet-600 border-t !border-t-violet-600"
    : "border-t border-t-transparent";
  return (
    <Link href={to} className="flex-1">
      <div
        //onClick={() => router.replace(to)}
        className={`h-[70px] flex-1 flex flex-col items-center justify-center active:scale-[0.94] -mt-[1px] pt-1 transition-all ${activeStyle} relative`}
      >
        {icon}
        <p className="text-[14px] mt-[4px] font-bold">{label}</p>
        {count !== 0 && (
          <div className=" absolute top-1 -left-1 flex items-center justify-center h-5 w-5 rounded-full bg-violet-600 text-[#fff] text-[12px]">
            {count}
          </div>
        )}
      </div>
    </Link>
  );
};

const BottomNabar = () => {
  const { getItemsTotal } = useCartStore();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const screenView = [
    "/",
    "/categories",
    "/cart?from=home",
    "/faivorates",
    "/brands",
    "/orders",
  ];

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/cart");
    router.prefetch("/categories");
    router.prefetch("/faivorates");
    router.prefetch("/brands");
    router.prefetch("/products/search/all");
    router.prefetch("/contactUs");
  }, [router]);

  return (
    <div
      className="h-[80px] fixed left-0 right-0 z-10 bg-white  border-t border-t-[#f0f0f0] pb-[12px] transition-all md:hidden block"
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
      <Container>
        <div className="flex gap-4 justify-evenly items-center">
          <NavItem
            icon={<TbSmartHome className="text-[24px]" />}
            label={"الرئيسية"}
            isActive={pathname === "/"}
          />
          <NavItem
            to="/categories"
            icon={
              pathname === "/categories" ? (
                <TbCategoryFilled className="text-[24px]" />
              ) : (
                <TbCategory className="text-[24px]" />
              )
            }
            label={"الفئات"}
            isActive={pathname === "/categories"}
          />
          <NavItem
            to="/brands"
            icon={
              pathname === "/brands" ? (
                <TbBrandFirebase className="text-[24px]" />
              ) : (
                <TbBrandFirebase className="text-[24px]" />
              )
            }
            label={"الماركات"}
            isActive={pathname === "/brands"}
          />
          <NavItem
            to="/cart?from=home"
            icon={
              pathname === "/cart" ? (
                <TbShoppingCartFilled className="text-[24px]" />
              ) : (
                <TbShoppingCart className="text-[24px]" />
              )
            }
            label={"السلة"}
            isActive={pathname === "/cart"}
            count={getItemsTotal() || 0}
          />

          {/* <NavItem
            to="/faivorates"
            icon={
              pathname === "/faivorates" ? (
                <TbHeartFilled className="text-[24px]" />
              ) : (
                <TbHeart className="text-[24px]" />
              )
            }
            label={"الطلبات"}
            isActive={pathname === "/faivorates"}
          /> */}
          <NavItem
            to="/faivorates"
            icon={
              pathname === "/faivorates" ? (
                <TbHeartFilled className="text-[24px]" />
              ) : (
                <TbHeart className="text-[24px]" />
              )
            }
            label={"المفضلة"}
            isActive={pathname === "/faivorates"}
          />
        </div>
      </Container>
    </div>
  );
};

export default BottomNabar;
