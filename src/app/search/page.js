import SearchBar from "@/components/SearchBar/searchBar";
import ProductList from "./ProductList/productList";

export default async function Search() {
  return (
    <div className="pb-[100px]">
      <SearchBar isSearch />
      <ProductList/>
    </div>
  );
}
