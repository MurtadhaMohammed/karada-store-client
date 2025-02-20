import SearchBar from "@/components/SearchBar/searchBar";
import Container from "@/components/UI/Container/container";

export default function BrandSkeleton() {
  return (
    
    <div>
      <SearchBar />
      <Container>
        <div className="grid md:grid-cols-5  grid-cols-4 gap-3 mt-5 justify-center">
          {[...Array(16)].map((_, index) => (
            <div key={index} className="text-center">
              <div className="aspect-1 overflow-hidden shadow-brand-custom relative rounded-lg p-2 animate-pulse-fast"></div>
              <div className="w-24 h-3 m-auto mt-2 rounded bg-[#f6f6f6] animate-pulse-fast ma"></div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
