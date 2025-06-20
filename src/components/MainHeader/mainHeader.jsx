"use client";
import Image from "next/image";
import Container from "../UI/Container/container";
import IconButton from "../UI/IconButton/iconButton";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAppStore } from "@/lib/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Motion from "../Motion/motion";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect } from "react";
import DotAlert from "../UI/DotAlert/dotAlert";
import useScrollPosition from "@/hooks/useScrollPosition";

const MainHeader = () => {
  const { setIsMenu, pageTitle, setPageTitle, setIsOtp, isOtp } = useAppStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { scrollDirection, scrollPosition } = useScrollPosition();

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setPageTitle("سلة التسوق");
        break;
      case "/checkout":
        setPageTitle("تأكيد الطلب");
        break;
      case "/login":
        setPageTitle("تسجيل الدخول");
        break;
      case "/brands":
        setPageTitle("جميع الماركات");
      case "/orders":
        setPageTitle("قائمة الطلبات");
        break;
      case "/policies/privicy":
        setPageTitle("سياسة الخصوصية");
        break;
      case "/policies/payments":
        setPageTitle("سياسة الدفع");
        break;
      case "/policies/refund":
        setPageTitle("سياسة الإسترجاع");
        break;
      case "/policies/delivery":
        setPageTitle("سياسة التوصيل");
        break;
      case "/products/search/all":
        setPageTitle("البحث");
        break;
      case "/contactUs":
        setPageTitle("التواصل مع الدعم");
        break;

      default:
        break;
    }
  }, [pathname]);

  if (pathname.split("/")[1] === "product") return;

  if (
    pathname !== "/" &&
    pathname !== "/categories" &&
    `${pathname}?from=${searchParams.get("from")}` !== "/cart?from=home" &&
    pathname !== "/faivorates" &&
    pathname !== "/brands" &&
    pathname !== "/info"
  )
    return (
      <header
        className={`md:hidden h-[64px] shadow-[0_4px_20px_rgb(0,0,0,0.06)] border-b border-b-[#f0f0f0]  bg-white z-20 ${
          pathname === "/login" ? "fixed top-0 right-0 left-0" : "sticky top-0"
        }`}
      >
        <Motion y={-6}>
          <Container>
            <div className="flex items-center justify-between h-[64px]">
              <div className="flex gap-4 items-center">
                {pathname === "/login" && isOtp ? (
                  <>
                    <IconButton
                      onClick={() => setIsOtp(false)}
                      icon={<IoIosArrowForward className="text-[26px]" />}
                    />
                    <p className="text-[18px] font-bold mt-[2px]">
                      {pageTitle}
                    </p>
                  </>
                ) : (
                  <>
                    <IconButton
                      onClick={() => router.back()}
                      icon={<IoIosArrowForward className="text-[26px]" />}
                    />
                    <p className="text-[18px] font-bold mt-[2px]">
                      {pageTitle}
                    </p>
                  </>
                )}
              </div>
              {/* <Image src={"/logo2.png"} width={110} height={24} /> */}
            </div>
          </Container>
        </Motion>
      </header>
    );

  return (
    <header
      className={`md:hidden shadow-[0_4px_20px_rgb(0,0,0,0.06)] border-b border-b-[#f0f0f0] bg-white z-20 transition-all duration-300 ${
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
        <div className="flex items-center justify-between h-[64px]">
          <div className="relative">
            <IconButton
              onClick={() => setIsMenu(true)}
              icon={<HiOutlineMenuAlt3 />}
            />
          </div>
          <Image src={"/logoo.png"} width={120} height={24} alt="image" />
        </div>
      </Container>
    </header>
  );
};

export default MainHeader;
