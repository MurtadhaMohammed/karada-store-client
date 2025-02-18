"use client";

import {
  useBottomSheetModal,
  BottomSheetModal,
} from "@/components/UI/BottomSheetModal/bottomSheetModal";
import Container from "@/components/UI/Container/container";
import Input from "@/components/UI/Input/input";
import { MdSecurityUpdateGood } from "react-icons/md";
import { useState, useEffect } from "react";
import Ripples from "react-ripples";
import { apiCall } from "@/lib/api";
import { createOrder } from "../../utils/orderUtils";
import { useAppStore } from "@/lib/store";

export const OtpModal = ({
  sessionId,
  cardNumber,
  onFinish,
  order,
  isLogin,
  setIsOtp,
  setOtp,
  clearCart,
  router,
}) => {
  const { closeModal } = useBottomSheetModal();
  const [OTP, setOTP] = useState("");
  const [Note, setNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setInstallment, platform, setPlatform } = useAppStore();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const platformQuery = queryParams.get("platform");
    setPlatform(platformQuery);
  }, []);

  const handleInstallmentSetup = (installmentId) => {
    if (installmentId) {
      createOrder(
        order,
        isLogin,
        setIsOtp,
        setOtp,
        clearCart,
        router,
        installmentId,
        platformQuery
      );
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
          Note,
          PaymentCard: cardNumber,
        },
      });

      if (result.succeeded === true) {
        handleInstallmentSetup(result.data?.installmentId);
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

  return (
    <BottomSheetModal
      title={
        <Container>
          <b> رمز التحقيق</b>
        </Container>
      }
      detent={"content-height"}
      name="OTPModal"
      onClose={closeModal}
      footer={
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
            <Ripples className="!grid w-full">
              <button
                onClick={handleInstallmentOtp}
                className="flex items-center justify-center  h-[56px] rounded-[16px]  bg-gradient-to-r text-violet-600   p-6 border-2 border-violet-600"
                disabled={loading}
              >
                {loading ? (
                  <div className="btn-loading"></div>
                ) : (
                  <span className="ml-[8px] font-bold text-[18px]">متابعة</span>
                )}
              </button>
            </Ripples>
          </div>
        </Container>
      }
    >
      <Container>
        {errorMessage && (
          <div className="text-red-600 mb-4">{errorMessage}</div>
        )}
        <div className="rounded-[8px] mt-[16px] mb-[60px]">
          <div className="mt-[24px]">
            <p className="mr-[6px] mb-[8px]">أدخل رمز التحقق </p>
            <Input
              hint="رمز التحقق"
              value={OTP}
              prefix={<MdSecurityUpdateGood className="text-[20px]" />}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
        </div>
      </Container>
    </BottomSheetModal>
  );
};
