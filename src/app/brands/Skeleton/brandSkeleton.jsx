import Container from "@/components/UI/Container/container";

export default function BrandSkeleton() {
  return (
    <Container>
      <div className="grid grid-cols-3 gap-4 mt-5 justify-center">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col justify-between items-center">
            <div className="w-32 aspect-1  rounded-2xl bg-[#f6f6f6] animate-pulse-fast"></div>
            <div className="w-24 h-3 rounded bg-[#f6f6f6] animate-pulse-fast mt-2"></div>
          </div>
        ))}
      </div>
    </Container>
  );
}
