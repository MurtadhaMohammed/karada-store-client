"use client";

import { useAppStore } from "@/lib/store";
import IconButton from "../UI/IconButton/iconButton";
import Drawer from "../UI/Drawer/drawer";
import { CgClose } from "react-icons/cg";
import { LuUser, LuSettings2, LuLogOut } from "react-icons/lu";
import { BiSupport, BiBook, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DotAlert from "../UI/DotAlert/dotAlert";
import Button from "../UI/Button/button";
import Modal from "../Modal/modal";
import { useState, useEffect } from "react";
import { apiCall } from "@/lib/api";
import { FaTruck } from "react-icons/fa6";
import { TbCreditCardRefund } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { useSearchParams } from "next/navigation";

const MenuItem = ({
  isDot = false,
  title,
  icon,
  onClick = () => {},
  isLink = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center mb-[28px] active:scale-[0.96] active:opacity-60 transition-all ${
        isLink ? "app-link" : ""
      }`}
    >
      {icon}
      <div className="relative">
        {isDot && <DotAlert customStyle="top-1 -left-4" />}
        <div className="mr-[16px] text-[16px]">{title}</div>
      </div>
    </button>
  );
};

const SideMenu = () => {
  const {
    isMenu,
    setIsMenu,
    isLogin,
    setIsLogin,
    userInfo,
    updateUserInfo,
    setIsOtp,
    setOtp,
    platform,
    setPlatform,
  } = useAppStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const platformQuery = searchParams.get("platform");
    setPlatform(platformQuery);
  }, []);

  const logout = () => {
    localStorage.removeItem("karada-token");
    localStorage.removeItem("karada-refreshToken");
    localStorage.removeItem("karada-user");
    updateUserInfo(null);
    setOtp(null);
    setIsOtp(false);
    setIsLogin(false);
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      const resp = await apiCall({
        pathname: `/client/auth/deleteAccount`,
        method: "DELETE",
        data: {
          phone: userInfo.phone,
        },
      });
      if (resp?.success) {
        setLoading(false);
        setIsModalOpen(false);
        logout();
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
            onClick={() => {
              setIsMenu(false);
              router.push("/contactUs");
            }}
          />
          <MenuItem
            title={
              <div className="flex items-center gap-16">
                <span>سياسات الإستخدام</span>
                <div onClick={() => setShowPolicies(!showPolicies)}>
                  {showPolicies ? (
                    <BiChevronUp className="text-[24px]" />
                  ) : (
                    <BiChevronDown className="text-[24px]" />
                  )}
                </div>
              </div>
            }
            icon={<MdOutlinePrivacyTip className="text-[24px]" />}
            onClick={() => setShowPolicies(!showPolicies)}
            isLink
          />
          {showPolicies && (
            <div className="mr-7">
              <MenuItem
                title={"سياسة الخصوصية"}
                icon={<BiBook className="text-[20px]" />}
                onClick={() => {
                  setIsMenu(false);
                  router.push("/policies/privicy");
                }}
              />
              <MenuItem
                title={"التوصيل"}
                icon={<FaTruck className="text-[20px]" />}
                onClick={() => {
                  setIsMenu(false);
                  router.push("/policies/delivery");
                }}
              />
              <MenuItem
                title={"سياسة لدفع"}
                icon={<MdOutlinePayment className="text-[20px]" />}
                onClick={() => {
                  setIsMenu(false);
                  router.push("/policies/payments");
                }}
              />
              <MenuItem
                title={"سياسة الإسرجاع "}
                icon={<TbCreditCardRefund className="text-[20px]" />}
                onClick={() => {
                  setIsMenu(false);
                  router.push("/policies/refund");
                }}
              />
            </div>
          )}
          {/* <MenuItem
            title={"مشاركة التطبيق"}
            icon={<LuShare2 className="text-[24px]" />}
          /> */}
          {isLogin && (
            <MenuItem
              onClick={logout}
              title={"تسجيل خروج"}
              icon={<LuLogOut className="text-[24px]" />}
            />
          )}
        </div>
      </section>
      <div className="flex p-8 absolute bottom-4 items-center justify-center w-full">
        {isLogin && (platform === "ios" || platform === "android") && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="text-[#ff0000] font-semiBold hover:bg-[#ffebee] transition-all border-[#ff0000] border w-full"
          >
            حذف الحساب
          </Button>
        )}
      </div>

      {isModalOpen && (
        <Modal
          title="تأكيد الحذف"
          description="هل أنت متأكد أنك تريد حذف الحساب؟ "
          primaryButton={{
            text: "حذف",
            onClick: deleteAccount,
          }}
          secondaryButton={{
            text: "إلغاء",
            onClick: () => setIsModalOpen(false),
          }}
          isLoading={loading}
        />
      )}

      <p className="absolute bottom-4 text-center left-0 right-0 text-[14px] text-[#a5a5a5]">
        Powered by{" "}
        {platform === "ios" || platform === "android" ? (
          <a
            className="text-[#0000ff]"
            href="https://puretik.com"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                "https://puretik.com",
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            PureTik
          </a>
        ) : (
          <a
            className="text-[#0000ff]"
            href="https://puretik.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            PureTik
          </a>
        )}
      </p>
    </Drawer>
  );
};

export default SideMenu;
