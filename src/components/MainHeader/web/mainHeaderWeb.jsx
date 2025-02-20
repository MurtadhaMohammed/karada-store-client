"use client";
import Image from "next/image";
import Container from "../../UI/Container/container";
import { useAppStore } from "@/lib/store";
import { usePathname } from "next/navigation";
import useScrollPosition from "@/hooks/useScrollPosition";
import { LuUser } from "react-icons/lu";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { TbShoppingCart, TbHeart } from "react-icons/tb";
import { RiShoppingBag3Line } from "react-icons/ri";

const MainHeaderWeb = () => {
  const { userInfo, isLogin, setIsLogin, updateUserInfo,setIsOtp,setOtp } = useAppStore();
  const pathname = usePathname();
  const { scrollDirection, scrollPosition } = useScrollPosition();
  const user = userInfo
  const logout = () => {
    localStorage.removeItem("karada-token");
    localStorage.removeItem("karada-refreshToken");
    localStorage.removeItem("karada-user");
    updateUserInfo(null);
    setIsOtp(false);
    setOtp(null);
    setIsLogin(false);
  };

  return (
    <header
      className={`md:block hidden md:shadow-none shadow-[0_4px_20px_rgb(0,0,0,0.06)] bg-white z-20 transition-all duration-300 ${
        scrollDirection === "up" && scrollPosition !== 0
          ? "sticky top-0"
          : "relative"
      }`}
      style={{
        transform:
          scrollDirection === "up" || scrollPosition <= 70
            ? "translateY(0)"
            : "translateY(-100%)",
      }}
    >
      <Container>
        <div className="flex items-center justify-between h-[68px]">
          <div className="flex items-center gap-4">
            <div className="w-[28px] h-[28px] flex items-center justify-center bg-[#fff] border border-[#ddd] rounded-full">
              <LuUser className="text-[#666] text-[18px]" />
            </div>
            {isLogin ? (
              <div className="flex items-center gap-4">
                <b className="text-[16px]">{user?.name}</b>
                <div className="h-3 w-[1px] bg-[#ccc]"></div>
                <p className="text-[14px] text-[#a5a5a5]">{user?.phone}</p>
                <div className="h-3 w-[1px] bg-[#ccc]"></div>
                <button
                  className="text-[14px] text-[#0000ff] underline transition-all active:scale-90"
                  onClick={logout}
                >
                  تسجيل خروج
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href={"/login"}
                  prefetch={true}
                  onClick={() => setIsMenu(false)}
                  className="text-[14px] text-[#0000ff] underline active:opacity-55 transition-all"
                >
                  تسجيل الدخول
                </Link>
                <div className="h-3 w-[1px] bg-[#ccc]"></div>
                <p className="text-[14px] text-[#a5a5a5]">
                  سجل دخولك ليصلك كل جديد
                </p>
              </div>
            )}
          </div>

          <Link href="/">
            <Image src={"/logoo.png"} width={130} height={24} alt="image" />
          </Link>
        </div>
      </Container>

      <div className=" bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] border-t border-t-[#eee]">
        <Container>
          <div className="flex h-[60px] items-center justify-between">
            <div className="flex items-center gap-4 h-full">
              <Link
                href={"/"}
                className={`text-[14px] h-full ${
                  pathname === "/" ? "bg-[#975affa8]" : ""
                } pl-[12px] pr-[12px] flex items-center transition-all active:scale-95`}
              >
                الرئيسية
              </Link>
              <Link
                href={"/categories"}
                className={`text-[14px] h-full ${
                  pathname === "/categories" ? "bg-[#975affa8]" : ""
                } pl-[12px] pr-[12px] flex items-center transition-all active:scale-95`}
              >
                الفئات
              </Link>
              <Link
                href={"/brands"}
                className={`text-[14px] h-full ${
                  pathname === "/brands" ? "bg-[#975affa8]" : ""
                } pl-[12px] pr-[12px] flex items-center transition-all active:scale-95`}
              >
                العلامات التجارية
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={"/products/search/all"}
                className="flex items-center gap-2 transition-all active:scale-95"
              >
                <p className="text-[14px]">البحث</p>
                <FiSearch className="text-[18px]" />
              </Link>
              <div className="h-4 w-[1px] bg-[#ccc]"></div>
              <Link
                href={"/cart"}
                className="flex items-center gap-2 transition-all active:scale-95"
              >
                <p className="text-[14px]">السلة</p>
                <TbShoppingCart className="text-[18px] -mt-[1px]" />
              </Link>
              <div className="h-4 w-[1px] bg-[#ccc]"></div>
              <Link
                href={"/faivorates"}
                className="flex items-center gap-2 transition-all active:scale-95"
              >
                <p className="text-[14px]">المفضلة</p>
                <TbHeart className="text-[18px]" />
              </Link>
              <div className="h-4 w-[1px] bg-[#ccc]"></div>
              <Link
                href={"/orders"}
                className="flex items-center gap-2 transition-all active:scale-95"
              >
                <p className="text-[14px]">الطلبات</p>
                <RiShoppingBag3Line className="text-[18px] -mt-[1px]" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default MainHeaderWeb;
