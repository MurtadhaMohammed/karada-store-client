"use client";
import { ConfirmBottomSheetModal } from "../UI/ConfirmBottomSheetModal/confirmBottomSheetModal";
import Container from "@/components/UI/Container/container";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { RiShoppingBag3Line } from "react-icons/ri";

const RedirectOrderCreation = ({ onClose = () => {} }) => {
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
      isHeader={false}
    >
      <Container>
        <div className="flex flex-col gap-3 pb-4 mt-6">
          <p>توجه إلى</p>
          <button
            onClick={() => {
              router.replace("/");
              onClose();
            }}
            className="bg-[#fff] border border-violet-600 py-3 rounded-lg flex items-center justify-center active:scale-[0.97] transition-transform duration-100"
          >
            الصفحة الرئيسية{" "}
            <FaHome size={20} color="#6547E0" className="mr-2" />
          </button>
          <button
            onClick={() => {
              router.replace("/orders");
              onClose();
            }}
            className="bg-[#f6f6f6] border py-3 rounded-lg flex items-center justify-center active:scale-[0.97] transition-transform duration-100"
          >
            الطلبات السابقة <RiShoppingBag3Line size={20} className="mr-2" />
          </button>
        </div>
      </Container>
    </ConfirmBottomSheetModal>
  );
};

export default RedirectOrderCreation;
