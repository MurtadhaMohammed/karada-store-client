"use client";

import { IMAGE_URL } from "@/lib/api";
import Container from "../UI/Container/container";
import Link from "next/link";
import Image from "next/image";

const GridBanner = ({
  bannerImage,
  link,
  grid,
  hasBanner,
  bannerAlignment,
  banner,
}) => {
  const parseGridCols = () => {
    let cols = Math.ceil(grid?.length / 2);
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
              <Link href={link}>
                <div
                  className={`bg-[#eee] rounded-[12px] flex items-center justify-center ${
                    ["top", "bottom"].includes(bannerAlignment)
                      ? "w-full aspect-[3/1]" // Wide for top/bottom
                      : "h-full aspect-[1/1]" // Square for left/right
                  }`}
                >
                  <Image
                    src={`${IMAGE_URL}/${bannerImage}`}
                    className="w-full h-full object-cover rounded-[12px]"
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>
            )}

          {/* Grid Items */}
          <div
            className={`grid gap-2 relative ${`grid-cols-${parseGridCols()}`}`}
          >
            {grid?.map((_, i) => (
              <div
                key={i}
                className="w-full aspect-w-1 aspect-h-1 bg-[#eee] rounded-[12px] overflow-hidden"
              >
                <Link href={_.link}>
                  <Image
                    src={`${IMAGE_URL}/${_.image}`}
                    className="w-full h-full object-cover rounded-[12px]"
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Link>
              </div>
            ))}
          </div>
          {/* Banner (Bottom/Right) */}
          {hasBanner &&
            (bannerAlignment === "bottom" || bannerAlignment === "right") &&
            banner && (
              <Link href={link}>
                <div
                  className={`bg-[#eee] rounded-[12px] flex items-center justify-center ${
                    ["top", "bottom"].includes(bannerAlignment)
                      ? "w-full aspect-[3/1]" // Wide for top/bottom
                      : "h-full aspect-[1/1]" // Square for left/right
                  }`}
                >
                  <Image
                    src={`${IMAGE_URL}/${bannerImage}`}
                    className="w-full h-full object-cover rounded-[12px]"
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>
            )}
        </div>
      </Container>
    </div>
  );
};

export default GridBanner;
