"use client";
import Link from "next/link";
import Container from "@/components/UI/Container/container";
import { IMAGE_URL } from "@/lib/api";
import Image from "next/image";

export default function BrandList({ brands }) {
  return (
    <Container>
      <div className="grid md:grid-cols-5 grid-cols-3 gap-4 mt-6 justify-center">
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
      <div className="mt-2 font-bold text-sm text-black">{brand.name}</div>
    </Link>
  );
}
