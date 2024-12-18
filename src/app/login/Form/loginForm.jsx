"use client";

import Link from "next/link";
import Ripples from "react-ripples";
import Container from "@/components/UI/Container/container";
import Input from "@/components/UI/Input/input";
import { OtpInput } from "reactjs-otp-input";
import { useEffect, useState } from "react";
import { apiCall, URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

const LoginForm = () => {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setIsLogin, isLogin , updateUserInfo, otp, isOtp,setOtp,setIsOtp} = useAppStore();

  const handleChange = (otp) => setOtp(otp);

  const handleLogin = async () => {
    setLoading(true);
    const resp = await apiCall({
      pathname: `/client/auth/login`,
      method: "POST",
      data: {
        name,
        phone,
      },
    });

    setLoading(false);
    if (resp?.otp) {
      setOtp(parseInt(resp?.otp));
      setIsOtp(true);
      router.replace(`/login?phone=${phone}`);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    const phoneFromParams = new URLSearchParams(window.location.search).get("phone");
    const resp = await apiCall({
      pathname: `/client/auth/verify`,
      method: "POST",
      data: {
        otp,
        phone: phoneFromParams || userInfo.phone,
      },
    });
    setLoading(false);
    if (resp.accessToken) {
      localStorage.setItem("karada-token", resp.accessToken);
      localStorage.setItem("karada-refreshToken", resp.refreshToken);
      localStorage.setItem("karada-account-name", userInfo?.name);
      updateUserInfo(resp.accessToken)
      router.replace("/");
      setIsLogin(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const _name = localStorage.getItem("karada-account-name");
      if (_name) setName(_name);
    }
  }, [isLogin]);

  if (isOtp)
    return (
      <div>
        <Container>
          <div className="mt-[36px]">
            <div className="text-center mb-[16px]">
              <p className="text-[18px] font-bold">أدخل رمز التحقق</p>
              <span className="text-[#a5a5a5] block mt-[4px]">
                سوف تصلك رسالة تأكيد عبر ال SMS.
              </span>
            </div>
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={6}
              separator={<span className="m-1"></span>}
              inputStyle={{
                width: 48,
                height: 48,
                border: "1px solid #eee",
                borderRadius: 6,
                outlineColor: "#7c3aed",
              }}
              containerStyle={{
                width: "100%",
                justifyContent: "center",
              }}
            />
          </div>
        </Container>

        <div className="fixed z-10 w-full bottom-[20px]">
          <Container>
            <div
              className="active:scale-[0.96] transition-all shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
              style={{
                display: "inline-flex",
                borderRadius: 16,
                overflow: "hidden",
                width: "100%",
              }}
            >
              <Ripples className="!grid w-full">
                <button
                  onClick={handleVerify}
                  className="flex items-center justify-center  h-[56px] rounded-[16px]  bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] p-6"
                >
                  <span className="ml-[8px] font-bold text-[18px]">
                    {loading ? "جار المصادقة..." : "تأكـــيد"}
                  </span>
                </button>
              </Ripples>
            </div>
          </Container>
        </div>
      </div>
    );

  return (
    <div>
      <Container>
        <div className="mt-[26px]">
          <div className="mb-[16px] text-center">
            {/* <b className="text-[18px]">مرحباً بك.</b> */}
          </div>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            hint="اسم المستخدم"
          />
          <div className="h-[16px]"></div>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            hint="رقم الهاتف"
          />
        </div>
      </Container>

      <div className="fixed z-10 w-full bottom-[20px]">
        <Container>
          <div
            className="active:scale-[0.96] transition-all"
            style={{
              display: "inline-flex",
              borderRadius: 16,
              overflow: "hidden",
              width: "100%",
            }}
          >
            <Ripples className="!grid w-full">
              <button
                onClick={handleLogin}
                className="flex items-center justify-center  h-[56px] rounded-[16px] border border-violet-600  text-violet-600 p-6"
              >
                <span className="ml-[8px] font-bold text-[18px]">
                  {loading ? "يرجى الانتضار..." : "تسجيل دخول"}
                </span>
              </button>
            </Ripples>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default LoginForm;
