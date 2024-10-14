"use client";

import { Sheet } from "react-modal-sheet";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const useBottomSheetModal = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const openModal = (name) => {
    router.push(pathname + "?" + createQueryString(name, "true"));
  };

  const colseModal = () => {
    router.back();
  };

  return { colseModal, openModal };
};

export const BottomSheetModal = ({
  name = "",
  footer = null,
  title = null,
  detent = "full-height", // content-height
  onClose,
  children,
}) => {
  const searchParams = useSearchParams();

  if (!searchParams.get(name)) return null;

  return (
    <Sheet isOpen={searchParams.get(name)} onClose={onClose} detent={detent}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          {title && <div>{title}</div>}
          <Sheet.Scroller className="w-full">{children}</Sheet.Scroller>
          {footer && <div>{footer}</div>}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
};
