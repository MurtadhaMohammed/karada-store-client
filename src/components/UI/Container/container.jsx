"use client"

import useIsScreenMd from "@/hooks/useIsScreenMd";

const Container = ({ children, noPadding }) => {
  const isScreenMd = useIsScreenMd()
  return (
    <div
      className="m-auto"
      style={{
        paddingLeft: noPadding && !isScreenMd ? 0 : 14,
        paddingRight: noPadding && !isScreenMd ? 0 : 14,
        maxWidth: noPadding && !isScreenMd ? 'calc(1000px - 32px)' : 1000
      }}
    >
      {children}
    </div>
  );
};

export default Container;
