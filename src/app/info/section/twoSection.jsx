"use client";

import Container from "@/components/UI/Container/container";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export const TwoSection = ({
  titles = [],
  subtitle = "",
  links = [],
  icons = [],
  hasAccess = true,
}) => {
  const router = useRouter();
  const { updateUserInfo, setOtp, setIsOtp, isLogin, setIsLogin } =
    useAppStore();

  if (!hasAccess && !isLogin) return null;

  return (
    <Container>
      <div className="flex w-full gap-1">
        {titles.map((title, index) => (
          <button
            key={index}
            className="block w-full flex items-center justify-center active:opacity-45 w-full transition-all app-links mt-[16px]"
            onClick={() => {
              if (links[index]) {
                router.push(links[index]);
              }
            }}
          >
            <div className="flex items-center justify-center bg-white w-[100%] gap-3 rounded-[16px] px-[16px] py-[16px]">
              <div>{icons[index]}</div>
              <h3 className="text-[16px] text-cente">{title}</h3>
            </div>
          </button>
        ))}
      </div>
    </Container>
  );
};
