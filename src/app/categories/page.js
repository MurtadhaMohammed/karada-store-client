import SearchBar from "@/components/SearchBar/searchBar";
import CategoryProductList from "./ProductsList/productsList";
import Categories from "@/components/Categories/categories";
import { URL } from "@/lib/api";
import ErrorBoundary from "@/components/ErrorBoundry/errorBoundry";

async function getCategories() {
  const res = await fetch(`${URL}/app/category/all`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

const Category = async () => {
  try {
    const category = await getCategories();

  return (
    <div className="pb-[100px]">
      <SearchBar />
      <Categories isBanner={false} list={category} />
      <CategoryProductList />
    </div>
  );
  }
  catch (error) {
    console.error("Error fetching view data:", error);
    return <div><ErrorBoundary/></div>;
  }
};

export default Category;
