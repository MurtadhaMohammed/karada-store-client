import BrandList from "./BrandsList/brandList";
import { URL } from "@/lib/api";
import BrandSkeleton from "./Skeleton/brandSkeleton";
import SearchBar from "@/components/SearchBar/searchBar";
import ErrorBoundary from "@/components/ErrorBoundry/errorBoundry";

export default async function Brands() {
  try{
    const res = await fetch(`${URL}/client/brand/all-brands?page=1&limit=100`, {
      method: "GET",
      cache: "no-cache",
    });  
  
    if (!res.ok) throw new Error("Failed to fetch data");
  
    const data = await res.json();

    console.log(data.records)
  
    return (
      <div className="pb-[100px]">
        <SearchBar/>
        <BrandList brands={data.records} />
      </div>
    );
  }
  catch (error) {
    console.error("Error fetching view data:", error);
    return <div><ErrorBoundary/></div>;
  }
}
