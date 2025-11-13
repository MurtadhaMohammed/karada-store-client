import { ConfirmBottomSheetModal } from "../UI/ConfirmBottomSheetModal/confirmBottomSheetModal";
import Container from "../UI/Container/container";
import CancelationModal from "@/components/CancelationModal/cancelationModal";
import { useBottomSheetModal } from "@/components/UI/BottomSheetModal/bottomSheetModal";

const ConfirmModal = ({ isOpen, onClose, orderId }) => {
  const { openModal } = useBottomSheetModal();

  return (
    <div>
      <ConfirmBottomSheetModal
        isOpen={isOpen}
        onClose={onClose}
        detent="content-height"
        title={
          <Container>
            <b>هل أنت متأكد من الغاء الطلب؟</b>
          </Container>
        }
      >
        <Container>
          <div className="pb-6">
            <b className="text-[14px] mt-4 block w-full">
              سيتم الغاء الطلب بشكل نهائي
            </b>
            <div className="flex justify-between mt-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  openModal("cancelationModal");
                }}
                className="w-1/2 shadow-md  bg-[#fff] cursor-pointer border border-[red] h-[48px] text-red-500 rounded-[12px]"
              >
                نعم
              </button>
              <button
                onClick={onClose}
                className="w-1/2 shadow-md bg-[#f6f6f6] cursor-pointer h-[48px] rounded-[12px]"
              >
                كلا
              </button>
            </div>
          </div>
        </Container>
      </ConfirmBottomSheetModal>
      <CancelationModal orderId={orderId} />
    </div>
  );
};

export default ConfirmModal;
