"use client";

import Container from "../UI/Container/container";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import IconButton from "../UI/IconButton/iconButton";

const SubHeader = () => {
  const router = useRouter();
  return (
    <header className="shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-b-[#f0f0f0] sticky top-0 bg-white z-10">
      <Container>
        <div className="flex items-center justify-between h-[60px]">
          <div className="flex gap-4 items-center">
            <IconButton
              onClick={() => router.back()}
              icon={<IoIosArrowForward className="text-[26px]" />}
            />
            <p className="text-[16px] font-bold mt-[2px]">
              كافة مستلزمات الكمبيوتر{" "}
            </p>
          </div>
          {/* <Image src={"/logo2.png"} width={110} height={24} /> */}
        </div>
      </Container>
    </header>
  );
};

export default SubHeader;
