import BrandList from "./BrandsList/brandList";
import { URL } from "@/lib/api";
import BrandSkeleton from "./Skeleton/brandSkeleton";
import SearchBar from "@/components/SearchBar/searchBar";
import ErrorBoundary from "@/components/ErrorBoundry/errorBoundry";

export default async function Brands() {
  try{
    const res = await fetch(`${URL}/app/brand/all`, {
      method: "GET",
      cache: "no-cache",
    });  
  
    if (!res.ok) throw new Error("Failed to fetch data");
  
    const data = await res.json();
  
    return (
      <div className="pb-[100px]">
        <SearchBar/>
        <BrandList brands={data} />
      </div>
    );
  }
  catch (error) {
    console.error("Error fetching view data:", error);
    return <div><ErrorBoundary/></div>;
  }
}
