"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  title,
  description,
  primaryButton,
  secondaryButton,
  onClose,
  isLoading = false, 
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      setIsMounted(false);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const modalContent = (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} 
    >
      <div
        className="p-6 border w-80 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3> 
          <div className="mt-2 px-6 py-2"> 
            <p className="text-l text-gray-500">{description}</p> 
          </div>
          <div className="flex justify-center mt-4 gap-3">
            {secondaryButton && (
              <button
                onClick={secondaryButton.onClick || onClose}
                disabled={isLoading} 
                className={`px-3 py-2 bg-gray-300 text-gray-900 text-sm font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {secondaryButton.text}
              </button>
            )}
            {primaryButton && (
              <button
                onClick={primaryButton.onClick}
                disabled={isLoading} 
                className={`px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (
                  "جارٍ الحذف"
                ) : (
                  primaryButton.text
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return isMounted ? createPortal(modalContent, document.body) : null;
};

export default Modal;
