"use client";

import Container from "@/components/UI/Container/container";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export const Section = ({
  title,
  subtitle,
  link,
  action,
  icon,
  hasAccess = true,
}) => {
  const router = useRouter();
  const { updateUserInfo, setOtp, setIsOtp, isLogin, setIsLogin } =
    useAppStore();

  const logout = () => {
    localStorage.removeItem("karada-token");
    localStorage.removeItem("karada-refreshToken");
    localStorage.removeItem("karada-user");
    updateUserInfo(null);
    setOtp(null);
    setIsOtp(false);
    setIsLogin(false);
  };

  if (!hasAccess && !isLogin) return;

  return (
    <button
      className={`block w-full text-right active:opacity-45 transition-all ${
        link ? "app-link" : ""
      }`}
      onClick={() => {
        if (link) {
          router.push(link);
        } else
          switch (action) {
            case "logout":
              logout();
              break;

            default:
              break;
          }
      }}
    >
      <Container>
        <div className="flex items-center justify-between py-[16px] bg-[#fff] rounded-[12px] px-4 pl-2 border border-[#eee] mb-[12px]">
          <div className="flex items-center">
            <div>{icon}</div>
            <div className="mr-[12px]">
              <h3 className="text-[16px] font-bold">{title}</h3>
              <p className="text-[14px] text-[#a5a5a5]">{subtitle}</p>
            </div>
          </div>
          <div>
            <IoIosArrowBack className="text-[32px]" />
          </div>
        </div>
      </Container>
    </button>
  );
};
