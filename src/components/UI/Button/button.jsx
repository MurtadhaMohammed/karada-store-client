"use client";

import Ripples from "react-ripples";

const Button = ({
  icon,
  children,
  size = "md",
  className,
  rounded = 8,
  onClick = () => {},
}) => {
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
      className="active:scale-90 transition-all"
      style={{
        display: "inline-flex",
        borderRadius: rounded,
        overflow: "hidden",
        height: sizes?.height[size],
      }}
    >
      <Ripples>
        <button
          className={`flex items-center gap-2 ${className} whitespace-nowrap`}
          style={{
            height: sizes?.height[size],
            fontSize: sizes.font[size],
            padding: icon ? "0px 12px 0px 8px" : "0px 12px",
            borderRadius: rounded,
          }}
          onClick={onClick}
        >
          {children} {icon}
        </button>
      </Ripples>
    </div>
  );
};

export default Button;
