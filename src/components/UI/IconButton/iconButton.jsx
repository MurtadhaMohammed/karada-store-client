"use client";

import Ripples from "react-ripples";

const IconButton = ({ icon, ...props }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <Ripples>
        <button
          className="p-[2px] text-[36px] active:scale-90 transition-all"
          {...props}
        >
          {icon}
        </button>
      </Ripples>
    </div>
  );
};

export default IconButton;
