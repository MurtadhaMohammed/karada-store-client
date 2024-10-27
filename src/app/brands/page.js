import BrandList from "./BrandsList/brandList";
import { URL } from "@/lib/api";
import BrandSkeleton from "./Skeleton/brandSkeleton";
import SearchBar from "@/components/SearchBar/searchBar";

export default async function Brands() {
  const res = await fetch(`${URL}/client/brand/all-brands`, {
    method: "GET",
    cache: "no-cache",
  });

  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();

  return (
    <div className="pb-[100px]">
      <SearchBar/>
      <BrandList brands={data.records} />

      {/* <BrandSkeleton /> */}
    </div>
  );
}
