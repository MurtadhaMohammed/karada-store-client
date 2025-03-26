import { useState } from "react";
import { BottomSheetModal, useBottomSheetModal } from "../UI/BottomSheetModal/bottomSheetModal";
import Container from "../UI/Container/container";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCall } from "@/lib/api";

const CancelationModal = ({ orderId }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [customReason, setCustomReason] = useState("");

  const { closeModal } = useBottomSheetModal("cancelationModal");

  const queryClient = useQueryClient();

  const { mutate: update, isPending: isUpdateLoading } = useMutation({
    mutationFn: (data) =>
      apiCall({
        pathname: `/client/order/cancel-order/${orderId}`,
        method: "PUT",
        auth: true,
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      closeModal();
    },
  });

  const reasons = [
    { id: "ordered-by-mistake", label: "طلبت المنتج بالخطأ" },
    { id: "too-expensive", label: "أشعر أن السعر مرتفع" },
    { id: "found-cheaper-elsewhere", label: "رأيته في مكان اخر بسعر أقل" },
    { id: "change-payment-method", label: "أريد تغيير طريقة الدفع" },
    { id: "change-delivery-address", label: "أريد تغيير عنوان التوصيل" },
    { id: "other", label: "سبب آخر" },
  ];
  

  const handleSubmit = () => {
    const selectedReasonLabel =
      selectedReason === "other" ? customReason : reasons.find((r) => r.id === selectedReason)?.label;

    if (!selectedReasonLabel) return;

    update({ "cancel_reason": selectedReasonLabel });
  };

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
            <div key={reason.id} className="flex cursor-pointer transition-all">
              <div
                className={`w-full h-[48px] border-2 rounded-lg flex items-center px-3 transition-all ${
                  selectedReason === reason.id ? "border-[#6746E0]" : "border-[#eee]"
                }`}
                onClick={() => setSelectedReason(reason.id)}
              >
                <div className="h-[16px] w-[16px] rounded-full border border-[#6746E0] flex items-center justify-center ml-2">
                  {selectedReason === reason.id && (
                    <div className="h-[8px] w-[8px] rounded-full bg-[#6746E0]"></div>
                  )}
                </div>
                <span className="text-gray-800">{reason.label}</span>
              </div>
            </div>
          ))}

          {selectedReason === "other" && (
            <textarea
              placeholder="اكتب السبب هنا..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className="w-full mt-2 p-2 border border-[#6746E0] rounded-lg outline-none text-gray-800"
              rows={3}
            />
          )}

          <div className="mt-4">
            <button
              className="bg-[#fff] border border-[#6746E0] w-full h-[56px] rounded-[16px] flex items-center justify-center"
              disabled={!selectedReason || (selectedReason === "other" && !customReason.trim())}
              onClick={handleSubmit}
            >
              <span>{isUpdateLoading ? "جارٍ الإرسال..." : "إرسال السبب"}</span>
            </button>
          </div>
        </div>
      </Container>
    </BottomSheetModal>
  );
};

export default CancelationModal;
