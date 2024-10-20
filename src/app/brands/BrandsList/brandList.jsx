import Link from 'next/link';
import Container from "@/components/UI/Container/container";
import { IMAGE_URL } from "@/lib/api";

export default function BrandList({ brands }) {
  return (
   <Container>
     <div className="grid grid-cols-3 gap-4 mt-5 justify-center ">
      {brands?.map((brand) => (
        <div key={brand.id} className="flex flex-col items-center justify-center">
          <Link href={`/brands/${brand.id}`}>
            <div className="flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer aspect-1 overflow-hidden shadow-brand-custom">
              <img src={`${IMAGE_URL}/${brand.img}`} alt={brand.name} />
            </div>
          </Link>
          <div className="mt-2 font-bold text-sm text-black">{brand.name}</div>
        </div>
      ))}
    </div>
   </Container>
  );
}
