import { useState } from "react";
import { BottomSheetModal } from "../UI/BottomSheetModal/bottomSheetModal";
import Container from "../UI/Container/container";

const CancelationModal = ({ orderId }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [customReason, setCustomReason] = useState("");

  const reasons = [
    { id: "gotAnotherOrder", label: "تم الحصول على طلب آخر" },
    { id: "changedMind", label: "تغيرت الرغبة" },
    { id: "delayedDelivery", label: "تأخر التوصيل" },
    { id: "other", label: "سبب آخر", isCustom: true },
  ];

  return (
    <BottomSheetModal
      name="cancelationModal"
      detent="content-height"
      title={
        <Container>
          <b>سبب إلغاء الطلب</b>
        </Container>
      }
    >
      <Container>
        <div className="flex flex-col gap-3 mt-4 mb-4">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="flex cursor-pointer transition-all"
              onClick={() => setSelectedReason(reason.id)}
            >
              <div
                className={`w-full h-[48px] border-2 rounded-lg flex items-center px-3 transition-all ${
                  selectedReason === reason.id ? "border-[#6746E0]" : "border-[#eee]"
                }`}
              >
                <div className="h-[16px] w-[16px] rounded-full border border-[#6746E0] flex items-center justify-center ml-2">
                  {selectedReason === reason.id && (
                    <div className="h-[8px] w-[8px] rounded-full bg-[#6746E0]"></div>
                  )}
                </div>

                {reason.isCustom ? (
                  <input
                    type="text"
                    placeholder="سبب آخر"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full outline-none border-none bg-transparent text-gray-800"
                  />
                ) : (
                  <span className="text-gray-800">{reason.label}</span>
                )}
              </div>
            </div>
          ))}

          <div className="mt-4">
            <button
              className="bg-[#fff] border border-[#6746E0] w-full h-[56px] rounded-[16px] flex items-center justify-center"
              disabled={!selectedReason || (selectedReason === "other" && !customReason.trim())}
            >
              <span>إرسال السبب</span>
            </button>
          </div>
        </div>
      </Container>
    </BottomSheetModal>
  );
};

export default CancelationModal;
