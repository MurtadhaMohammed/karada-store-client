"use client";
import Image from "next/image";
import Container from "../UI/Container/container";

import IconButton from "../UI/IconButton/iconButton";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Suspense } from "react";
import { useAppStore } from "@/lib/store";

const MainHeader = () => {
  const { setIsMenu } = useAppStore();

  return (
    <header className="shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-b-[#f0f0f0] sticky top-0 bg-white z-10">
      <Suspense
        fallback={<div className="h-[60px] w-[200px] bg-black"></div>}
      ></Suspense>
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
