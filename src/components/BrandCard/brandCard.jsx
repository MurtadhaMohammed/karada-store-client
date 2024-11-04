"use client"

import { IMAGE_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";


function BrandCard({ brand }) {
  return (
    <Link
      href={`/products/brand/${brand.id}`}
      className="cursor-pointer text-center"
    >
      <div className="aspect-1 overflow-hidden shadow-brand-custom relative rounded-lg p-2">
        <div className="relative w-full h-full">
          <Image
            src={`${IMAGE_URL}/${brand?.img}`}
            alt={brand?.name}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <div className="mt-2 font-bold text-sm text-black">{brand.name}</div>
    </Link>
  );
}

export default BrandCard;
