"use client";

import Link from "next/link";
import Ripples from "react-ripples";
import Container from "@/components/UI/Container/container";
import Input from "@/components/UI/Input/input";
import { OtpInput } from "reactjs-otp-input";
import { useCallback, useEffect, useState, useRef } from "react";
import { apiCall, URL } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store";
import OtpInputs from "@/components/Otp/OtpInputs";
import { validateIraqiPhoneNumber } from "@/helper/phoneValidation";
import { processPendingOrder } from "@/app/checkout/utils/orderUtils";
import { useCartStore } from "@/lib/cartStore";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderCreated, setOrderCreated] = useState(false);
  const autoLoginAttemptedRef = useRef(false);
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
  const { clearCart } = useCartStore();
  const handleChange = (otp) => setOtp(otp);
  const globalPhone = userInfo?.phone;

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
  };
  const handleLogin = async () => {
    if (isOtp) {
      setError("تم إرسال رمز التحقق بالفعل");
      return;
    }

    if (loading) {
      return;
    }

    let formattedPhone = phone;
    if (phone !== "07700000000" && validateIraqiPhoneNumber(phone) === false)
      return setError("يرجى إدخال رقم هاتف صالح");

    if (!formattedPhone.startsWith("07") && formattedPhone.startsWith("7")) {
      formattedPhone = "0" + formattedPhone;
    }

    // Get pending order data from URL if available
    const orderData = searchParams.get("orderData");
    if (orderData) {
      try {
        // Parse and save order data in localStorage
        const decodedOrderData = JSON.parse(decodeURIComponent(orderData));
        console.log("Saving order data:", decodedOrderData);
        localStorage.setItem("pending_order", JSON.stringify(decodedOrderData));
      } catch (err) {
        console.error("Error parsing order data:", err);
      }
    }

    console.log("Sending login request with phone:", formattedPhone);
    setLoading(true);
    try {
      const resp = await apiCall({
        pathname: `/client/auth/login`,
        method: "POST",
        data: {
          name,
          phone: formattedPhone,
        },
      });

      console.log("Login response:", resp);
      setLoading(false);
      if (resp?.message == "Login Success") {
        setIsOtp(true);
        setError(null);
        router.replace(`/login?phone=${formattedPhone}`);
      } else {
        setError("فشل إرسال رمز التحقق، يرجى التأكد من رقم الهاتف");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
      setError("حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى");
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    const phoneFromParams = searchParams.get("phone");

    // Format phone number correctly
    let formattedPhone = phoneFromParams || globalPhone;

    // Make sure phone starts with "07"
    if (!formattedPhone.startsWith("07") && formattedPhone.startsWith("7")) {
      formattedPhone = "0" + formattedPhone;
    }

    console.log("Verifying OTP for phone:", formattedPhone);

    try {
      const resp = await apiCall({
        pathname: `/client/auth/verify`,
        method: "POST",
        data: {
          otp,
          phone: formattedPhone,
        },
      });

      if (resp.accessToken) {
        localStorage.setItem("karada-token", resp.accessToken);
        localStorage.setItem("karada-refreshToken", resp.refreshToken);
        localStorage.setItem("karada-user", JSON.stringify(resp.user));
        updateUserInfo(resp.user);
        setIsLogin(true);
        const hasPendingOrder = localStorage.getItem("pending_order") !== null;
        if (hasPendingOrder) {
          try {
            setOrderCreated(true);
            console.log("OTP verification successful. User tokens saved.");
            console.log(
              "Processing pending order for verified user:",
              resp.user
            );

            // Keep loading state active while processing order
            setLoading(true);
            setError("جاري إنشاء الطلب...");

            // Process the order directly after successful OTP verification
            const orderResult = await processPendingOrder(resp.user, clearCart);

            console.log("Order processing result:", orderResult);

            if (orderResult?.order) {
              // Order was created successfully
              localStorage.removeItem("pending_order"); // Clear pending order
              setError("تم إنشاء الطلب بنجاح! سيتم توجيهك إلى صفحة الطلبات...");
              setLoading(false);
              // Show success message before redirect
              setTimeout(() => {
                router.replace("/orders");
              }, 1500);
            } else {
              // Order creation failed, redirect to checkout
              setLoading(false);
              setError("فشل إنشاء الطلب. سيتم إعادة توجيهك إلى صفحة الدفع.");
              setTimeout(() => {
                router.replace("/checkout");
              }, 2000);
            }
          } catch (err) {
            console.error("Error processing pending order:", err);
            setLoading(false);
            router.replace("/");
          }
        } else {
          setLoading(false);
          router.replace("/");
        }
      } else {
        setLoading(false);
        setError("يرجى إدخال رمز التحقق صحيح");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setLoading(false);
      setError("حدث خطأ أثناء التحقق من الرمز");
    }
  };
  useEffect(() => {
    const phoneFromParams = searchParams.get("phone");
    const orderData = searchParams.get("orderData");

    // Save order data if available
    if (orderData) {
      try {
        const decodedOrderData = JSON.parse(decodeURIComponent(orderData));
        console.log("Auto-saving order data:", decodedOrderData);
        localStorage.setItem("pending_order", JSON.stringify(decodedOrderData));
      } catch (err) {
        console.error("Error parsing order data:", err);
      }
    }
    if (phoneFromParams && !autoLoginAttemptedRef.current && !isOtp) {
      setPhone(phoneFromParams);
      autoLoginAttemptedRef.current = true; // Prevent multiple attempts      // Automatically trigger login when redirected with phone parameter
      const autoLogin = async () => {
        setLoading(true);
        try {
          // Format phone number correctly
          let formattedPhone = phoneFromParams;

          // Make sure phone starts with "07"
          if (
            !formattedPhone.startsWith("07") &&
            formattedPhone.startsWith("7")
          ) {
            formattedPhone = "0" + formattedPhone;
          } // Try to get user name from pending order data first, then fallback to localStorage
          let userName = "Guest User";
          try {
            const pendingOrderStr = localStorage.getItem("pending_order");
            if (pendingOrderStr) {
              const pendingOrderData = JSON.parse(pendingOrderStr);
              if (pendingOrderData?.order?.user_name) {
                userName = pendingOrderData.order.user_name;
                console.log("Using user name from pending order:", userName);
              }
            }
          } catch (err) {
            console.error("Error parsing pending order for user name:", err);
          }

          // Fallback to localStorage if no name found in pending order
          if (userName === "Guest User") {
            userName =
              localStorage.getItem("karada-account-name") || "Guest User";
            console.log("Using fallback user name:", userName);
          }

          const resp = await apiCall({
            pathname: `/client/auth/login`,
            method: "POST",
            data: {
              name: userName,
              phone: formattedPhone,
            },
          });

          if (resp?.message === "Login Success") {
            setIsOtp(true);
            setError(null);
          } else {
            setError("فشل إرسال رمز التحقق، يرجى المحاولة مرة أخرى");
          }
        } catch (err) {
          console.error("Auto login error:", err);
          setError("حدث خطأ أثناء إرسال رمز التحقق");
        } finally {
          setLoading(false);
        }
      };

      autoLogin();
    } else if (phoneFromParams && !isOtp) {
      // Just set the phone if already attempted but not in OTP mode
      setPhone(phoneFromParams);
    }
  }, [searchParams, isOtp, setIsOtp, setError]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const _name = localStorage.getItem("karada-account-name");
      if (_name) setName(_name);
    }
  }, [isLogin]);

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
