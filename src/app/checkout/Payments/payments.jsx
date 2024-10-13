"use client";
import { BsCreditCard2Front } from "react-icons/bs";
import { useState } from "react";
import BottomSheetModal from "@/components/BottomSheetModal/bottomSheetModal";

const Payments = () => {
  const [selected, setSelected] = useState("cash");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    window.history.pushState(null, "", window.location.href); // Ensure back navigation works
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.history.back(); // Simulate a back action when modal is closed
  };

  const payments = [
    {
      value: "cash",
      label: "الدفع عند الاستلام",
    },
    {
      value: "master",
      label: "ماستر او فيزا كارد",
      info: "6330 4909...",
    },
    {
      value: "installment",
      label: "شراء بالتقسيط",
      info: "6103...",
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
            onClick={openModal}
            className={`flex items-start justify-between rounded-[8px] p-[12px] mt-[8px] active:opacity-55 ${
              el?.value === selected
                ? "border border-violet-600"
                : "border border-[#eee]"
            } transition-all`}
          >
            <div>
              <p>{el.label}</p>
              {el?.value === selected && el?.info && (
                <p className={"text-[#a5a5a5] text-[12px]"}>{el?.info}</p>
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

      <BottomSheetModal isOpen={isModalOpen} onClose={closeModal} height="40vh">
        <h2 className="text-lg font-semibold">Custom Content Inside Modal</h2>
        <p>
          This content is passed as children to the BottomSheetModal component.
        </p>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Close Modal
        </button>
      </BottomSheetModal>
    </div>
  );
};

export default Payments;
