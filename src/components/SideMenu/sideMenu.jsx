"use client";

import { useAppStore } from "@/lib/store";
import IconButton from "../UI/IconButton/iconButton";
import Drawer from "../UI/Drawer/drawer";
import { CgClose } from "react-icons/cg";
import { LuUser, LuSettings2, LuLogOut, LuShare2 } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DotAlert from "../UI/DotAlert/dotAlert";

const MenuItem = ({ isDot = false, title, icon, onClick = () => {} , isLink= false}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center mb-[28px] active:scale-[0.96] active:opacity-60 transition-all ${isLink ? "app-link" :""}`}
    >
      {icon}
      <div className="relative">
        {isDot && <DotAlert customStyle="top-1 -left-4" />}
        <p className="mr-[16px] text-[16px]">{title}</p>
      </div>
    </button>
  );
};

const SideMenu = () => {
  const { isMenu, setIsMenu, isLogin, setIsLogin, userInfo, updateUserInfo } =
    useAppStore();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("karada-token");
    localStorage.removeItem("karada-refreshToken");
    updateUserInfo();
    setIsLogin(false);
  };

  return (
    <Drawer position="right" isOpen={isMenu} onClose={() => setIsMenu(false)}>
      <div className="absolute left-4 top-4 z-10">
        <IconButton
          icon={<CgClose className="text-[28px]" />}
          onClick={() => setIsMenu(false)}
        />
      </div>
      <section>
        <div className="bg-[#efeefd] h-[200px] relative">
          <div className=" absolute bottom-0 right-0 left-0 p-4">
            {isLogin ? (
              <div className="flex items-center">
                <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#fff] border border-[#ddd] rounded-full">
                  <LuUser className="text-[#666] text-[22px] " />
                </div>
                <div className="mr-[8px]">
                  <b className="text-[16px]">{userInfo?.name}</b>
                  <p className="text-[14px]">{userInfo?.phone}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#fff] border border-[#ddd] rounded-full">
                  <LuUser className="text-[#666] text-[22px] " />
                </div>
                <div className="mr-[8px]">
                  <Link
                    href={"/login"}
                    prefetch={true}
                    onClick={() => setIsMenu(false)}
                    className="text-[16px] text-[#0000ff] underline active:opacity-55 transition-all"
                  >
                    تسجيل الدخول
                  </Link>
                  <p className="text-[14px]">سجل دخولك ليصلك كل جديد</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          {isLogin && (
            <MenuItem
              onClick={() => {
                setIsMenu(false);
                router.push("/orders");
              }}
              isLink
              title={"قائمة الطلبات"}
              icon={<LuSettings2 className="text-[24px]" />}
            />
          )}
          <MenuItem
            title={"التواصل مع الدعم"}
            icon={<BiSupport className="text-[24px]" />}
            onClick={()=>{
              setIsMenu(false);
              router.push("/contactUs");
            }}
          />
          <MenuItem
            title={"مشاركة التطبيق"}
            icon={<LuShare2 className="text-[24px]" />}
          />
          {isLogin && (
            <MenuItem
              onClick={logout}
              title={"تسجيل خروج"}
              icon={<LuLogOut className="text-[24px]" />}
            />
          )}
        </div>
      </section>
      <p className="absolute bottom-4 text-center left-0 right-0 text-[14px] text-[#a5a5a5]">
        Pawered by{" "}
        <a className="text-[#0000ff]" href="puretike.com" target="_blank">
          PureTike
        </a>
      </p>
    </Drawer>
  );
};

export default SideMenu;
