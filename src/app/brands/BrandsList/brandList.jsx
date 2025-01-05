"use client";
import Link from "next/link";
import Container from "@/components/UI/Container/container";
import { IMAGE_URL } from "@/lib/api";
import Image from "next/image";

export default function BrandList({ brands }) {
  return (
    <Container>
      <div className="grid md:grid-cols-5 grid-cols-4  gap-3 mt-4 justify-center">
        {brands?.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </Container>
  );
}

function BrandCard({ brand }) {
  return (
    <Link
      href={`/products/brand/${brand.id}`}
      className="cursor-pointer text-center"
    >
      <div className="aspect-1 overflow-hidden shadow-brand-custom relative rounded-lg bg-white">
        <div className="relative w-full h-full">
          <Image
            src={`${IMAGE_URL}/${brand.img}`}
            alt={brand.name}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      <div
        className="mt-1 text-[12px] text-black whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ direction: "ltr" }}
      >
        {brand.name}
      </div>
    </Link>
  );
}
