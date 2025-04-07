"use client";

import Link from "next/link";
import Ripples from "react-ripples";
import Container from "@/components/UI/Container/container";
import Input from "@/components/UI/Input/input";
import { OtpInput } from "reactjs-otp-input";
import { useEffect, useState } from "react";
import { apiCall, URL } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store";
import OtpInputs from "@/components/Otp/OtpInputs";
import { validateIraqiPhoneNumber } from "@/helper/phoneValidation";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const searchParams = useSearchParams();
  const {
    setIsLogin,
    isLogin,
    updateUserInfo,
    otp,
    setOtp,
    isOtp,
    setIsOtp,
    userInfo,
  } = useAppStore();
  const handleChange = (otp) => setOtp(otp);
  const globalPhone = userInfo?.phone;

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
  };

  const handleLogin = async () => {
    if (phone !== "07700000000" && validateIraqiPhoneNumber(phone) === false)
      return setError("يرجى إدخال رقم هاتف صالح");
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
    if (resp?.message == "Login Success") {
      setIsOtp(true);
      setError(null);
      router.replace(`/login?phone=${phone}`);
    } else {
      setError("يرجى إدخال رقم هاتف صالح");
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    const phoneFromParams = searchParams.get("phone");
    const resp = await apiCall({
      pathname: `/client/auth/verify`,
      method: "POST",
      data: {
        otp,
        phone: phoneFromParams || globalPhone,
      },
    });
    setLoading(false);
    if (resp.accessToken) {
      router.replace("/");
      localStorage.setItem("karada-token", resp.accessToken);
      localStorage.setItem("karada-refreshToken", resp.refreshToken);
      localStorage.setItem("karada-user", JSON.stringify(resp.user));
      updateUserInfo(resp.user);
      setIsLogin(true);
    } else {
      setError("يرجى إدخال رمز التحقق صحيح");
    }
  };

  useEffect(() => {
    const phoneFromParams = searchParams.get("phone");
    if (phoneFromParams) {
      setPhone(phoneFromParams);
    }
  }, [searchParams]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const _name = localStorage.getItem("karada-account-name");
      if (_name) setName(_name);
    }
  }, [isLogin]);

  useEffect(() => {
    if (otp?.length === 6 && !loading) {
      handleVerify();
    }
  }, [otp]);

  if (isOtp)
    return (
      <div className="pt-[60px] h-[100vh] overflow-hidden">
        <Container>
          <div className="mt-[36px]">
            <div className="text-center mb-[16px]">
              <p className="text-[18px] font-bold">أدخل رمز التحقق</p>
              <span className="text-[#a5a5a5] block mt-[4px]">
                سوف تصلك رسالة تأكيد عبر ال SMS.
              </span>
            </div>
            <div>
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                isInputNum={true}
                // separator={<span className="m-1"></span>}
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
                  direction: "ltr",
                  gap: "8px",
                }}
              />
              {/* <OtpInputs onChange={handleChange} /> */}
            </div>
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
        <div>
          {error && (
            <p className="text-red-500 flex items-center justify-center p-[16px]">
              {error}
            </p>
          )}
        </div>
      </div>
    );

  return (
    <div className="pt-[60px]">
      <Container>
        <div className="mt-[26px]">
          <div className="mb-[16px] text-center">
            {/* <b className="text-[18px]">مرحباً بك.</b> */}
          </div>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            hint="إسم المستخدم"
          />
          <div className="h-[16px]"></div>
          <Input value={phone} onChange={handlePhoneChange} hint="رقم الهاتف" />
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
                  {loading ? "يرجى الإنتظار..." : "تسجيل دخول"}
                </span>
              </button>
            </Ripples>
          </div>
        </Container>
      </div>
      <div>{error && <p className="text-red-500 p-[16px] ">{error}</p>}</div>
    </div>
  );
};

export default LoginForm;
