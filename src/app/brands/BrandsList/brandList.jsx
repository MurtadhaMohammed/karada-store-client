"use client";
import Link from "next/link";
import Container from "@/components/UI/Container/container";
import { IMAGE_URL } from "@/lib/api";
import { useState, useEffect } from "react";

export default function BrandList({ brands }) {
  return (
    <Container>
      <div className="grid grid-cols-3 gap-4 mt-10 justify-center">
        {brands?.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </Container>
  );
}

function BrandCard({ brand }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false); 

  useEffect(() => {
    const loadImage = () => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = `${IMAGE_URL}/${brand.img}`;
        img.onload = () => resolve(); 
        img.onerror = () => reject(); 
      });
    };

    loadImage()
      .then(() => setIsImageLoaded(true))
      .catch(() => console.error("Image failed to load"));

  }, [brand.img]); 

  return (
    isImageLoaded && (
      <div className="flex flex-col items-center justify-center">
        <Link href={`/brands/${brand.id}`}>
          <div className="flex flex-col items-center  justify-center p-4 rounded-lg cursor-pointer aspect-1 overflow-hidden shadow-brand-custom">
            <img
              src={`${IMAGE_URL}/${brand.img}`}
              alt={brand.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="mt-2 font-bold text-sm text-black">{brand.name}</div>
      </div>
    )
  );
}
