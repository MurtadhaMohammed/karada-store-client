"use client";

import { useState } from "react";

const Input = ({ hint, value, prefix = null, onChange, type = "text" }) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => setIsFocus(true);
  const handleBlur = () => setIsFocus(false);

  return (
    <div className="w-full relative">
      <label
        className={`absolute right-[16px] transition-all duration-200  ${
          isFocus || value
            ? "top-[-10px] text-sm text-black bg-white rounded-md block pl-[6px] pr-[6px]"
            : "top-[11px] text-[#a5a5a5]"
        }`}
        style={{ pointerEvents: "none" }}
      >
        {hint}
      </label>

      <input
        className="w-full border border-[#eee] h-[48px] pr-[16px] pl-[16px] outline-none rounded-[8px]"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        type={type}
        onChange={onChange}
      />
      {prefix && (
        <div className="absolute left-[16px] top-1/2 transform -translate-y-1/2 flex items-center">
          {prefix}
        </div>
      )}
    </div>
  );
};

export default Input;
