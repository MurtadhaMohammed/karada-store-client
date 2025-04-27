"use client";

import Container from "@/components/UI/Container/container";
import Input from "@/components/UI/Input/input";
import { useRouter } from "next/navigation";
import { BsCreditCard2Front } from "react-icons/bs";
import Ripples from "react-ripples";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { apiCall } from "@/lib/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdSecurityUpdateGood } from "react-icons/md";
import { useAppStore } from "@/lib/store";
import { createOrder } from "@/app/checkout/utils/orderUtils";

const InstallmentPage = () => {
  const { getTotal, clearCart } = useCartStore();
  const [cardInfo, setCardInfo] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [Message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const { setInstallment } = useAppStore();
  const {
    isLogin,
    setIsOtp,
    setOtp,
    installmentOrder,
    setInstallmentOrder,
    settings,
    note,
  } = useAppStore();
  const router = useRouter();
  const PlanId = 10;
  const cartTotal = getTotal();
  const noOfMonths = 10;
  const installment = (cartTotal * settings.installment) / noOfMonths;
  const total = installment * noOfMonths;

  const handleInstallment = async () => {
    setLoading(true);
    try {
      const result = await apiCall({
        pathname: "/client/installment/",
        method: "POST",
        data: {
          Identity: cardNumber,
          Amount: total,
          countOfMonth: noOfMonths,
          PlanId,
        },
      });

      if (result.succeeded) {
        setCardInfo({ number: cardNumber, sessionId: result.sessionId });
        setSessionId(result.sessionId);
        setMessage(result.message || "");
        // closeModal("installmentModal");
        setTimeout(() => {
          //   router.push("/checkout?OTPModal=true");
          setShowOTP(true);
        }, 800);
      } else {
        setErrorMessage(result.message || "حدث خطأ أثناء عملية التقسيط.");
      }
    } catch (error) {
      console.error("Installment Error:", error);
      setErrorMessage("حدث خطأ أثناء عملية التقسيط.");
    } finally {
      setLoading(false);
    }
  };

  const handleInstallmentSetup = (installmentId) => {
    if (installmentId) {
      const delivery_cost =
      total > 1000000
        ? parseInt(settings?.extraDelivery) || 0
        : parseInt(settings?.delivery) || 0;
        createOrder({
        order: installmentOrder,
        isLogin,
        setIsOtp,
        setOtp,
        clearCart,
        router,
        installmentId,
        delivery_cost,
        // note
      });
      setInstallmentOrder({});
    }
  };

  const handleInstallmentOtp = async () => {
    setLoading(true);
    try {
      const result = await apiCall({
        pathname: "/client/installment/done",
        method: "POST",
        data: {
          sessionId,
          OTP: parseInt(OTP, 10),
          note,
          PaymentCard: cardNumber,
        },
      });

      if (result.succeeded) {
        handleInstallmentSetup(result.data.installmentId);
        setInstallment(false);
        onFinish();
      } else {
        setErrorMessage(result.message || "حدث خطأ أثناء التحقق من الرمز.");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      setErrorMessage("حدث خطأ أثناء التحقق من الرمز.");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = () => {
    setCardInfo(null);
    setSessionId(null);
    router.push("/orders");
  };

  return (
    <Container>
      <div className="h-[100dvh]">
        {(errorMessage || Message) && (
          <div
            className={
              errorMessage ? "text-red-600 mb-4" : "text-black mb-4 mt-2"
            }
          >
            {errorMessage || Message}
          </div>
        )}
        {/* installment */}
        <div className="rounded-[8px] mt-[16px] mb-[60px]">
          <div className="pt-0">
            <div className="flex bg-white items-center justify-between rounded-[8px] border border-[#eee] p-[16px] pt-[8px] pb-[8px] mt-[16px]">
              <p>القسط الشهري</p>
              <p>IQD {installment}</p>
            </div>
            <div className="flex bg-white items-center justify-between rounded-[8px] border border-[#eee] p-[16px] pt-[8px] pb-[8px] mt-[16px]">
              <p>مجموع السلة</p>
              <p>IQD {cartTotal}</p>
            </div>
            <div className="flex bg-white  items-center justify-between rounded-[8px] border border-[#eee] p-[16px] pt-[8px] pb-[8px] mt-[8px]">
              <p>عدد الاشهر</p>
              <p>{noOfMonths} اشهر</p>
            </div>
            <div className="flex bg-white  items-center justify-between rounded-[8px] border border-[#eee] p-[16px] pt-[8px] pb-[8px] mt-[8px]">
              <p className="text-[#666]">المبلغ الاجمالي:</p>
              <b className="text-[24px]">IQD {total}</b>
            </div>
            <div className="mt-[24px]">
              <p className="mr-[6px] mb-[8px]">
              ادخل رقم الحساب المكون من 10 مراتب او 16 مرتبة          </p>
              <Input
                hint="رقم البطاقة"
                type="tel"
                prefix={<BsCreditCard2Front className="text-[20px]" />}
                value={cardNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  setCardNumber(value);
                  if (value.length !== 10 && value.length !== 16) {
                    setErrorMessage("ادخل رقم البطاقه او رقم الحساب");
                  } else {
                    setErrorMessage("");
                  }
                }}
                disabled={showOTP}
              />
            </div>
            {showOTP && (
              <div className="rounded-[8px] mt-[16px] mb-[60px]">
                <div className="mt-[24px]">
                  <p className="mr-[6px] mb-[8px]">ادخل رمز التحقق</p>
                  <Input
                    hint="رمز التحقق"
                    value={OTP}
                    prefix={<MdSecurityUpdateGood className="text-[20px]" />}
                    onChange={(e) => setOTP(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
          <Container>
            <div
              className="active:scale-[0.96] transition-all shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mb-[20px]"
              style={{
                display: "inline-flex",
                borderRadius: 16,
                overflow: "hidden",
                width: "100%",
              }}
            >
              <Ripples className="!grid w-[100%]">
                <button
                  onClick={showOTP ? handleInstallmentOtp : handleInstallment}
                  className="flex items-center justify-center h-[56px] rounded-[16px] bg-gradient-to-r text-violet-600 p-6 border-2 border-violet-600"
                  disabled={loading}
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin w-8 h-8 text-violet-600" />
                  ) : (
                    <span className="ml-[8px] font-bold text-[18px]">
                      التالي
                    </span>
                  )}
                </button>
              </Ripples>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  );
};

export default InstallmentPage;
