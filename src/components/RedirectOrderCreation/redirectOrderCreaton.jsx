"use client";
import { ConfirmBottomSheetModal } from "../UI/ConfirmBottomSheetModal/confirmBottomSheetModal";
import Container from "@/components/UI/Container/container";
import { useRouter } from "next/navigation";

const RedirectOrderCreation = () => {
  const router = useRouter();

  return (
    <ConfirmBottomSheetModal
      isOpen={true}
      detent="content-height"
      title={
        <Container>
          <b>تم انشاء الطلب بنجاح</b>
        </Container>
      }
    >
     <Container>
     <div className="flex flex-col gap-3 pb-4 mt-6">
        <p>توجه إلى</p>
        <button
          onClick={() => {
            router.replace("/");
            onClose?.();
          }}
          className="bg-[#fff] border border-violet-600 py-2 rounded-lg"
        >
        الصفحة الرئيسية
        </button>
        <button
          onClick={() => {
            router.replace("/orders");
            onClose?.();
          }}
          className="bg-[#f6f6f6] border py-2 rounded-lg"
        >
          الطلبات السابقة
        </button>
      </div>
     </Container>
    </ConfirmBottomSheetModal>
  );
};

export default RedirectOrderCreation;
