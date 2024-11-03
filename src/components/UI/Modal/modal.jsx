const Modal = (open, onClose, children) => {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="w-[200px] relative z-40 h-[200px] bg-white rounded-[16px]">
        {children}
      </div>
      <div className="fixed inset-0 z-30 bg-black">Backdrop</div>
    </div>
  );
};

export default Modal;
