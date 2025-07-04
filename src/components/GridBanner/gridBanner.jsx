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
                  className={`bg-[#eee] rounded-[12px] flex items-center justify-center pure-skeleton relative overflow-hidden ${
                    ["top", "bottom"].includes(bannerAlignment)
                      ? "w-full aspect-[3/1]" // Wide for top/bottom
                      : "h-full aspect-[1/1]" // Square for left/right
                  }`}
                >
                  <Image
                    src={`${IMAGE_URL}/${bannerImage}`}
                    className="w-full h-full object-cover "
                    alt=""
                    fill
                  />
                </div>
              </Link>
            )}

          {/* Grid Items */}
          <div
            className={`grid gap-2 relative ${`grid-cols-${
              ["top", "bottom"].includes(bannerAlignment) ? grid?.length : 2
            }`}`}
          >
            {grid?.map((_, i) => (
              <div
                key={i}
                className="w-full aspect-w-1 aspect-h-1 bg-[#eee] rounded-[12px] overflow-hidden relative"
              >
                <Link href={_.link} className="pure-skeleton">
                  <Image
                    src={`${IMAGE_URL}/${_.image}`}
                    className="w-full h-full object-cover rounded-[12px]"
                    alt=""
                    fill
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
                  className={`bg-[#eee] rounded-[12px] pure-skeleton relative flex items-center justify-center ${
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
