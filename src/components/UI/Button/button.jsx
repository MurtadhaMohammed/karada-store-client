"use client";

import Ripples from "react-ripples";

const Button = ({ icon, children, size = "md", style }) => {
  const sizes = {
    height: {
      md: 48,
      sm: 32,
    },
    font: {
      md: 18,
      sm: 16,
    },
  };

  return (
    <div
      style={{
        display: "inline-flex",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <Ripples>
        <button
          className="flex items-center gap-1  active:scale-90 transition-all"
          style={{
            height: sizes?.height[size],
            fontSize: sizes.font[size],
            padding: icon ? "0px 12px 0px 4px" : "0px 12px",
            ...style,
          }}
        >
          {children} {icon}
        </button>
      </Ripples>
    </div>
  );
};

export default Button;
