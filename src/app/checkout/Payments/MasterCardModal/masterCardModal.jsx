"use client";

import {
  useBottomSheetModal,
  BottomSheetModal,
} from "@/components/UI/BottomSheetModal/bottomSheetModal";
import Container from "@/components/UI/Container/container";
import Input from "@/components/UI/Input/input";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa6";
import { BsCreditCard2Front } from "react-icons/bs";
import Ripples from "react-ripples";

export const MasterCardModal = ({ onFinish }) => {
  const { closeModal } = useBottomSheetModal();
  return (
    <BottomSheetModal
      title={
        <Container>
          <b>الدفع باستخدام الماستر او الفيزا كادر</b>
        </Container>
      }
      detent={"content-height"}
      name="paymentModal"
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
                onClick={() => onFinish({ number: "69892..." })}
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
        <div className="rounded-[8px] border border-[#eee] mt-[16px] mb-[60px]">
          <div className="flex items-center p-[16px]">
            <FaCcVisa className="text-[18px]" />
            <FaCcMastercard className="text-[18px] mr-[6px]" />
            <p className="mr-[6px]">ادخل معلومات البطاقة</p>
          </div>
          <div className="p-[16px] pt-0">
            <Input hint="اسم حامل البطاقة" />
            <div className="h-[12px]"></div>
            <Input
              hint="رقم البطاقة"
              prefix={<BsCreditCard2Front className="text-[20px]" />}
            />
            <div className="h-[12px]"></div>
            <div className="flex gap-3 items-center">
              <Input hint="تاريخ انتهاء الصلاحية" />
              <Input hint="cvv" />
            </div>
          </div>
        </div>
      </Container>
    </BottomSheetModal>
  );
};
