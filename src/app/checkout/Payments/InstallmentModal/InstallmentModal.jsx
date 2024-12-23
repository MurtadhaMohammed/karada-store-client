"use client";

import {
  useBottomSheetModal,
  BottomSheetModal,
} from "@/components/UI/BottomSheetModal/bottomSheetModal";
import Container from "@/components/UI/Container/container";
import Input from "@/components/UI/Input/input";
import { BsCreditCard2Front } from "react-icons/bs";
import Ripples from "react-ripples";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cartStore"; 
import { MdSecurityUpdateGood } from "react-icons/md";
import { apiCall } from "@/lib/api";

export const InstallmentModal = ({ onFinish }) => {
  const { closeModal, openModal } = useBottomSheetModal();
  const { getTotal } = useCartStore();
  const [cardNumber, setCardNumber] = useState("");
  const [Note, setNote] = useState("");
  const [OTP, setOTP] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionId, setSessionId] = useState(null);

  const total = getTotal();
  const noOfMonths = 10;
  const installment = total / noOfMonths;

  useEffect(() => {
    console.log("Current Step:", currentStep);
    if (currentStep === 1) {
      handleInstallment();
    }
  }, [currentStep]);

  const handleInstallment = async () => {
    try {
      const result = await apiCall({
        pathname: "/client/installment/",
        method: "POST",
        data: {
          Identity: cardNumber,
          Amount: total,
          countOfMonth: noOfMonths,
        },
      });

      if (result.succeeded === true) {
        console.log("Installment Success:", result);
        onFinish({ number: cardNumber });
        setSessionId(result?.sessionId);
        // closeModal();
        setCurrentStep(2);
        openModal("OTPModal");
      }
    } catch (error) {
      console.error("Installment Error:", error);
    }
  };

  const handleInstallmentOtp = async () => {
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

      console.log("OTP Verification Result:", result);
      closeModal();
    } catch (error) {
      console.error("OTP Verification Error:", error);
    }
  };

  return (
    <BottomSheetModal
      title={
        <Container>
          <b>الشراء بالتقسيط</b>
        </Container>
      }
      detent={"content-height"}
      name="installmentModal"
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
                onClick={() => {
                  currentStep === 1 ? handleInstallment() : handleInstallmentOtp();
                }}
                className="flex items-center justify-center  h-[56px] rounded-[16px]  bg-gradient-to-r text-violet-600   p-6 border-2 border-violet-600"
              >
                <span className="ml-[8px] font-bold text-[18px]">
                  {currentStep === 1 ? "التالي" : "متابعة"}
                </span>
              </button>
            </Ripples>
          </div>
        </Container>
      }
    >
      <Container>
        {currentStep === 1 && (
          <div className="rounded-[8px]  mt-[16px] mb-[60px]">
            <div className="pt-0">
              <div className="flex items-center justify-between rounded-[8px] border border-[#eee] p-[16px] pt-[8px] pb-[8px] mt-[16px]">
                <p>القسط الشهري</p>
                <p>IQD {installment}</p>
              </div>
              <div className="flex items-center justify-between rounded-[8px] border border-[#eee] p-[16px] pt-[8px] pb-[8px] mt-[8px]">
                <p>عدد الاشهر</p>
                <p>{noOfMonths} اشهر</p>
              </div>

              <div className="flex items-center justify-between rounded-[8px] border border-[#eee] p-[16px] pt-[8px] pb-[8px] mt-[8px]">
                <p className="text-[#666]">المبلغ الاجمالي:</p>
                <b className="text-[24px]">IQD {total}</b>
              </div>

              <div className="mt-[24px]">
                <p className="mr-[6px]  mb-[8px]">
                  اكتب رقم الجساب المكون من 10 مراتب
                </p>
                <Input
                  hint="رقم البطاقة"
                  prefix={<BsCreditCard2Front className="text-[20px]" />}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
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
        )}
      </Container>
    </BottomSheetModal>
  );
};
