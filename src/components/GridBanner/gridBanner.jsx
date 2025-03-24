"use client";

import Container from "../UI/Container/container";

const GridBanner = () => {
  let hasBanner = false;
  const bannerAlignment = "bottom"; //| // "bottom" | "left" | "right" = "left"; // Change as needed

  const list = [{}, {}, {}, {}];
  const banner = {}; // Example banner object

  const parseGridCols = () => {
    let cols = Math.ceil(list.length / 2);
    return cols < 2 ? 2 : cols;
  };

  return (
    <div className="py-[16px]">
      <Container>
        <div
          className={`grid gap-2 ${
            ["left", "right"].includes(bannerAlignment)
              ? "grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {/* Banner (Top/Left) */}
          {hasBanner &&
            (bannerAlignment === "top" || bannerAlignment === "left") &&
            banner && (
              <div
                className={`bg-[#eee] rounded-[12px] flex items-center justify-center ${
                  ["top", "bottom"].includes(bannerAlignment)
                    ? "w-full aspect-[3/1]" // Wide for top/bottom
                    : "h-full aspect-[1/1]" // Square for left/right
                }`}
              ></div>
            )}

          {/* Grid Items */}
          <div
            className={`grid gap-2 relative ${`grid-cols-${parseGridCols()}`}`}
          >
            {list.map((_, i) => (
              <div
                key={i}
                className="w-full aspect-w-1 aspect-h-1 bg-[#eee] rounded-[12px]"
              ></div>
            ))}
          </div>
          {/* Banner (Bottom/Right) */}
          {hasBanner &&
            (bannerAlignment === "bottom" || bannerAlignment === "right") &&
            banner && (
              <div
                className={`bg-[#eee] rounded-[12px] flex items-center justify-center ${
                  ["top", "bottom"].includes(bannerAlignment)
                    ? "w-full aspect-[3/1]" // Wide for top/bottom
                    : "h-full aspect-[1/1]" // Square for left/right
                }`}
              ></div>
            )}
        </div>
      </Container>
    </div>
  );
};

export default GridBanner;
