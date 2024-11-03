import SearchBar from "@/components/SearchBar/searchBar";
import ProductList from "./ProductsList/productsList";
import Categories from "@/components/Categories/categories";
import { URL } from "@/lib/api";

async function getCategories() {
  const res = await fetch(`${URL}/client/category/category?limit=100`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

const Category = async () => {
  const category = await getCategories();

  return (
    <div className="pb-[100px]">
      <SearchBar />
      <Categories isBanner={false} list={category?.categories} />
      <ProductList />
    </div>
  );
};

export default Category;
