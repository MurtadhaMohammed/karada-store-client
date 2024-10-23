import Container from "@/components/UI/Container/container";

export default function BrandSkeleton() {
  return (
    <Container>
      <div className="grid md:grid-cols-4  grid-cols-3 gap-4 mt-5 justify-center">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="text-center">
            <div className="aspect-1 overflow-hidden shadow-brand-custom relative rounded-lg p-2 animate-pulse-fast"></div>
            <div className="w-24 h-3 m-auto mt-2 rounded bg-[#f6f6f6] animate-pulse-fast ma"></div>
          </div>
        ))}
      </div>
    </Container>
  );
}
