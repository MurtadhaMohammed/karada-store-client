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

const MainHeader = () => {
  const { setIsMenu, pageTitle, setPageTitle } = useAppStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

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
    pathname !== "/faivorates"
  )
    return (
      <header className="h-[68px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-b-[#f0f0f0] sticky top-0 bg-white z-10">
        <Motion y={-6}>
          <Container>
            <div className="flex items-center justify-between h-[68px]">
              <div className="flex gap-4 items-center">
                <IconButton
                  onClick={() => router.back()}
                  icon={<IoIosArrowForward className="text-[26px]" />}
                />
                <p className="text-[18px] font-bold mt-[2px]">{pageTitle}</p>
              </div>
              {/* <Image src={"/logo2.png"} width={110} height={24} /> */}
            </div>
          </Container>
        </Motion>
      </header>
    );

  return (
    <header className="shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-b-[#f0f0f0] sticky top-0 bg-white z-10">
      <Container>
        <div className="flex items-center justify-between h-[68px]">
          <IconButton
            onClick={() => setIsMenu(true)}
            icon={<HiOutlineMenuAlt3 />}
          />
          <Image src={"/logo2.png"} width={110} height={24} alt="image" />
        </div>
      </Container>
    </header>
  );
};

export default MainHeader;
