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
import { apiCall } from "@/lib/api";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const InstallmentModal = ({ onFinish }) => {
  const { closeModal, openModal } = useBottomSheetModal();
  const { getTotal } = useCartStore();
  const [cardNumber, setCardNumber] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [Message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const PlanId = 10;
  const total = getTotal();
  const noOfMonths = 10;
  const installment = total / noOfMonths;

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

      if (result.succeeded === true) {
        onFinish({ number: cardNumber, sessionId: result?.sessionId });
        setSessionId(result?.sessionId);
        setMessage(result.message || "");
        closeModal("installmentModal");
        setTimeout(() => {
          router.push("/checkout?OTPModal=true");
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
                onClick={handleInstallment}
                className="flex items-center justify-center h-[56px] rounded-[16px] bg-gradient-to-r text-violet-600 p-6 border-2 border-violet-600"
                disabled={loading}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin w-8 h-8 text-violet-600" />
                ) : (
                  <span className="ml-[8px] font-bold text-[18px]">التالي</span>
                )}
              </button>
            </Ripples>
          </div>
        </Container>
      }
    >
      <Container>
        {(errorMessage || Message) && (
          <div
            className={
              errorMessage ? "text-red-600 mb-4" : "text-black mb-4 mt-2"
            }
          >
            {errorMessage || Message}
          </div>
        )}
        <div className="rounded-[8px] mt-[16px] mb-[60px]">
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
              <p className="mr-[6px] mb-[8px]">
                اكتب رقم الحساب المكون من 10 مراتب
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
