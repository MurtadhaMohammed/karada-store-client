"use client";

import { useEffect } from "react";

const BottomSheetModal = ({ isOpen, onClose, children, height = "50vh" }) => {
  useEffect(() => {
    const handleBack = (event) => {
      if (isOpen) {
        onClose(); // Call the close function when the back button is pressed
        event.preventDefault(); // Prevent the default back navigation
        return true;
      }
      return false;
    };

    if (isOpen) {
      // Use `replaceState` so that no new history entry is created on each modal open
      window.history.replaceState({ modal: true }, "", window.location.href);

      // Listen to the `popstate` event to handle the back button
      window.onpopstate = handleBack;
    }

    return () => {
      // Reset the `onpopstate` handler when the modal is closed
      window.onpopstate = null;
    };
  }, [isOpen, onClose]);

  // Render the modal only when it's open
  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ height: height }} // Dynamic height of the modal based on props
    >
      <div className="p-4 relative">
        {/* Content area */}
        {children}
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BottomSheetModal;
