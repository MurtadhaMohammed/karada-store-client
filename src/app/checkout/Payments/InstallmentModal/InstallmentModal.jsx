"use client";

import {
  useBottomSheetModal,
  BottomSheetModal,
} from "@/components/UI/BottomSheetModal/bottomSheetModal";
import Container from "@/components/UI/Container/container";
import Input from "@/components/UI/Input/input";
import { BsCreditCard2Front } from "react-icons/bs";
import Ripples from "react-ripples";
import { useState } from "react";
import { useCartStore } from "@/lib/cartStore"; 
import { MdSecurityUpdateGood } from "react-icons/md";


export const InstallmentModal = ({ onFinish }) => {
  const { colseModal } = useBottomSheetModal();
  const { cart, getTotal } = useCartStore();
  const [cardNumber, setCardNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  
  const total = 3000000;
  const noOfMonths = 10;
  const installment = total / noOfMonths;

  const handleNextStep = () => { //use this when handle the api call
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      handleFinish();
    }
  };
  const handleFinish = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      Identity: cardNumber,
      Amount: total,
      countOfMonth:noOfMonths,
      }),
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:3003/api/client/installment/`, requestOptions);
      const result = await response.text();
      console.log(result);
      setCurrentStep(2); //and disable this
      onFinish({ number: cardNumber });
      
    } catch (error) {
      console.error(error);
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
      onClose={colseModal}
      
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
                onClick={handleFinish}
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
                prefix={<MdSecurityUpdateGood className="text-[20px]" />}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>
        )}
      </Container>
    </BottomSheetModal>
  );
};
