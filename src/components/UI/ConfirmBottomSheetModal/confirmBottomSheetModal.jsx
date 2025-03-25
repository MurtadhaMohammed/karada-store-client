"use client";

import { Sheet } from "react-modal-sheet";

export const ConfirmBottomSheetModal = ({
  isOpen = false,
  onClose,
  footer = null,
  title = null,
  detent = "full-height",
  children,
}) => {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} detent={detent}>
      <Sheet.Container>
        {/* <Sheet.Header /> */}
        <Sheet.Content>
        {title && <div className="pt-6">{title}</div>}
          <Sheet.Scroller className="w-full">{children}</Sheet.Scroller>
          {footer && <div>{footer}</div>}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
};
