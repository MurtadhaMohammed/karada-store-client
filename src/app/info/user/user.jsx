"use client";
import Container from "@/components/UI/Container/container";
import { useAppStore } from "@/lib/store";
import Link from "next/link";
import { LuUser } from "react-icons/lu";

const UserInfo = () => {
  const { isLogin, userInfo } = useAppStore();
  return (
    <div className="mb-[16px] mt-[16px]">
      <Container>
        <div className="py-[12px] relative bg-gradient-to-r to-indigo-600 from-purple-600 rounded-[16px] shadow-md">
          <div className=" py-4 text-[#fff]">
            {isLogin ? (
              <div className="flex items-center justify-center">
                <div className="flex items-center flex-col">
                  <div className="w-[52px] h-[52px] flex items-center justify-center bg-[#fff]  rounded-full">
                    <LuUser className="text-[#666] text-[22px]" />
                  </div>
                  <div className="mt-[8px] text-center">
                    <b className="text-[18px]">{userInfo?.name}</b>
                    <p className="text-[16px]">{userInfo?.phone}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col text-center">
                <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#fff]  rounded-full">
                  <LuUser className="text-[#666] text-[22px] " />
                </div>
                <div className="mt-[8px]">
                  <Link
                    href={"/login"}
                    prefetch={true}
                    className="text-[18px] text-[#fff] underline active:opacity-55 transition-all"
                  >
                    تسجيل الدخول
                  </Link>
                  <p className="text-[14px]">سجل دخولك ليصلك كل جديد</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserInfo;
