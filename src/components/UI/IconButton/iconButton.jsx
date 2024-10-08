"use client";

import Ripples from "react-ripples";

const IconButton = ({ icon, rounded = 8, disabled=false, ...props }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        borderRadius: rounded,
        overflow: "hidden",
        opacity : disabled ? .4 : 1
      }}
    >
      <Ripples>
        <button
          className={"p-[2px] text-[36px] active:scale-90 transition-all"}
          {...props}
          disabled={disabled}
        >
          {icon}
        </button>
      </Ripples>
    </div>
  );
};

export default IconButton;
