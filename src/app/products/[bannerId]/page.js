import SearchBar from "@/components/SearchBar/searchBar";
import ProductList from "./ProductList/productList";

export default async function Products({ params }) {
  return (
    <div className="pb-[100px]">
      <SearchBar />
      <ProductList bannerId={params.bannerId} />
    </div>
  );
}
