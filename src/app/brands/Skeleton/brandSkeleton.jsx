import Container from "@/components/UI/Container/container";

export default function BrandSkeleton() {
  return (
    <Container>
      <div className="grid grid-cols-3 gap-4 mt-10 justify-center">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col justify-between items-center p-4">
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg bg-gray-200 animate-pulse-fast"></div>
            <div className="w-3/4 h-7 rounded bg-gray-200 animate-pulse-fast mt-4"></div>
          </div>
        ))}
      </div>
    </Container>
  );
}
