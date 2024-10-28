"use client";

import Ripples from "react-ripples";

const IconButton = ({ icon, rounded = 8, disabled = false, ...props }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        borderRadius: rounded,
        overflow: "hidden",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Ripples onClick={e=> e.preventDefault()}>
        <button
          type="button"
          className={"p-[2px] text-[36px] active:scale-90 transition-all"}
          disabled={disabled}
          {...props}
        >
          {icon}
        </button>
      </Ripples>
    </div>
  );
};

export default IconButton;
