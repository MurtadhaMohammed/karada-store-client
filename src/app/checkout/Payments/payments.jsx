"use client";
import { BsCreditCard2Front } from "react-icons/bs";
import { useState } from "react";
import {
  MasterCardModal,
  useMasterCardModal,
} from "./MasterCardModal/masterCardModal";
import {
  BottomSheetModal,
  useBottomSheetModal,
} from "@/components/UI/BottomSheetModal/bottomSheetModal";
import { InstallmentModal } from "./InstallmentModal/InstallmentModal";

const Payments = () => {
  const [selected, setSelected] = useState("cash");
  const [cardInfo, setCardInfo] = useState({});
  const { openModal, colseModal } = useBottomSheetModal();

  const payments = [
    {
      value: "cash",
      label: "الدفع عند الاستلام",
    },
    {
      value: "master",
      label: "ماستر او فيزا كارد",
    },
    {
      value: "installment",
      label: "شراء بالتقسيط",
    },
  ];

  return (
    <div className="rounded-[8px] border border-[#eee] mt-[24px]">
      <div className="flex items-center p-[16px]">
        <BsCreditCard2Front className="text-[18px]" />
        <p className="mr-[6px]">حدد طريقة الدفع</p>
      </div>
      <div className="p-[16px] pt-0">
        {payments?.map((el, i) => (
          <div
            key={i}
            // onClick={() => setSelected(el?.value)}
            onClick={() => {
              if (el?.value === "master") openModal("paymentModal");
              else if (el?.value === "installment")
                openModal("installmentModal");
              else {
                setCardInfo({});
                setSelected("cash");
              }
            }}
            className={`flex items-start justify-between rounded-[8px] p-[12px] mt-[8px] active:opacity-55 ${
              el?.value === selected
                ? "border border-violet-600"
                : "border border-[#eee]"
            } transition-all`}
          >
            <div>
              <p>{el.label}</p>
              {el?.value === selected && cardInfo?.number && (
                <p className={"text-[#a5a5a5] text-[12px]"}>
                  {cardInfo?.number}
                </p>
              )}
            </div>
            <div
              className={`w-[24px] h-[24px] flex items-center justify-center rounded-full border-2 ${
                el?.value === selected ? "border-violet-600" : "border-[#ccc]"
              } rounded-full`}
            >
              <div
                className={`w-[12px] h-[12px] ${
                  el?.value === selected ? "bg-violet-600" : "bg-[#fff]"
                } rounded-full`}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <MasterCardModal
        onFinish={(value) => {
          setCardInfo(value);
          setSelected("master");
          colseModal();
        }}
      />
      <InstallmentModal
        onFinish={(value) => {
          setCardInfo(value);
          setSelected("installment");
          colseModal();
        }}
      />
    </div>
  );
};

export default Payments;