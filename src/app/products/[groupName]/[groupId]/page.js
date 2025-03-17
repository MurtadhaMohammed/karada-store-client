import SearchBar from "@/components/SearchBar/searchBar";
import ProductList from "./ProductList/productList";

export default async function Products({ params }) {
  const { groupId, groupName } = params;
  return (
    <div className="pb-[20px]">
      <SearchBar />
      <ProductList groupId={groupId} groupName={groupName} />
    </div>
  );
}
