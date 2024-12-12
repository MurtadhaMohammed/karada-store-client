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

const AUTH_TOKEN = process.env.NEXT_PUBLIC_QI_MERCHANT_KEY;
const API_URL = process.env.NEXT_PUBLIC_QI_API_URL;

export const InstallmentModal = ({ onFinish }) => {
  const { colseModal } = useBottomSheetModal();
  const { cart, getTotal } = useCartStore();
  const [cardNumber, setCardNumber] = useState("");

  const total = getTotal();
  const installment = total / 10;
  const handleFinish = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Merchant ${AUTH_TOKEN}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        Identity: cardNumber,
        Amount: total,
      }),
      redirect: "follow",
    };

    try {
      const response = await fetch(`${API_URL}/aqsati/ThirdParty/api/Integration/GetCustomerInformation`, requestOptions);
      const result = await response.text();
      console.log(result);
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
                <span className="ml-[8px] font-bold text-[18px]">متابعة</span>
              </button>
            </Ripples>
          </div>
        </Container>
      }
    >
      <Container>
        <div className="rounded-[8px]  mt-[16px] mb-[60px]">
          <div className="pt-0">
            <div className="flex items-center justify-between rounded-[8px] border border-[#eee] p-[16px] pt-[8px] pb-[8px] mt-[16px]">
              <p>القسط الشهري</p>
              <p>IQD {installment}</p>
            </div>
            <div className="flex items-center justify-between rounded-[8px] border border-[#eee] p-[16px] pt-[8px] pb-[8px] mt-[8px]">
              <p>عدد الاشهر</p>
              <p>10 شهر</p>
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
      </Container>
    </BottomSheetModal>
  );
};
