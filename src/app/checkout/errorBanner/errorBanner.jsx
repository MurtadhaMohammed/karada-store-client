"use client";
import React, { useState, useEffect } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { useAppStore } from "@/lib/store";

const ErrorBanner = () => {
  const { errorMessage } = useAppStore();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [errorMessage]);

  return (
    showError && (
      <div className="sticky top-0 bg-white rounded-[8px] pt-[4px] pb-[4px] pl-[12px] pr-[12px] my-[16px] border border-[#eee] shadow-md active:scale-[0.96] active:opacity-50 transition-all pointer-events-none select-none">
        <div className="flex items-center gap-[8px]">
          <IoWarningOutline className="h-[40px] w-[44px] text-red-500" />
          <p className="text-[16px] block tight-custom flex-1">
            {errorMessage}
          </p>
        </div>
      </div>
    )
  );
};

export default ErrorBanner;
