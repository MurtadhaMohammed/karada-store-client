"use client";
import Image from "next/image";
import Container from "../UI/Container/container";
import IconButton from "../UI/IconButton/iconButton";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAppStore } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";
import Motion from "../Motion/motion";
import { IoIosArrowForward } from "react-icons/io";

const MainHeader = () => {
  const { setIsMenu } = useAppStore();
  const pathname = usePathname();
  const router = useRouter();

  if (
    pathname !== "/" &&
    pathname !== "/categories" &&
    pathname !== "catrs" &&
    pathname !== "faivorates"
  )
    return (
      <header className="h-[60px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-b-[#f0f0f0] sticky top-0 bg-white z-10">
        <Motion y={-6}>
          <Container>
            <div className="flex items-center justify-between h-[60px]">
              <div className="flex gap-4 items-center">
                <IconButton
                  onClick={() => router.back()}
                  icon={<IoIosArrowForward className="text-[26px]" />}
                />
                <p className="text-[16px] font-bold mt-[2px]">
                  كافة مستلزمات الكمبيوتر
                </p>
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
        <div className="flex items-center justify-between h-[60px]">
          <IconButton
            onClick={() => setIsMenu(true)}
            icon={<HiOutlineMenuAlt3 />}
          />
          <Image src={"/logo2.png"} width={110} height={24} />
        </div>
      </Container>
    </header>
  );
};

export default MainHeader;
