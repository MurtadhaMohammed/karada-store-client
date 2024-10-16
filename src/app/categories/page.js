import SearchBar from "@/components/SearchBar/searchBar";
import ProductList from "./ProductsList/productsList";
import Categories from "@/components/Categories/categories";
import { URL, IMAGE_URL } from "@/lib/api";

async function getCategories() {
  const res = await fetch(`${URL}/client/category/category`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

const Category = async () => {
  const category = await getCategories();
  const categories = category.categories.map((cat) => ({
    id: cat.id,
    name: cat.title,
    img: `${IMAGE_URL}/${cat.img}`,
  }));

  return (
    <div className="pb-[100px]">
      <SearchBar />
      <Categories isBanner={false} list={categories} />
      <ProductList />
    </div>
  );
};

export default Category;
