import SearchBar from "@/components/SearchBar/searchBar";
import ProductList from "./ProductsList/productsList";
import Categories from "@/components/Categories/categories";

const IMAGE_URL =
  "https://drlab.us-east-1.linodeobjects.com/karada-store";

const Category = async () => {
  const resCategories = await fetch(
    "http://85.208.51.126:3002/api/client/category/category"
  );
  const categoryData = await resCategories.json();
  const categories = categoryData.categories.map((cat) => ({
    id: cat.id, 
    name: cat.title,
    img: `${IMAGE_URL}/${cat.img}`, 
  }));

  const resProducts = await fetch("http://85.208.51.126:3002/api/client/product/product");
  const productData = await resProducts.json();
  
  const productsByCategory = categories.map((category) => ({
    category,
    products: productData.products
      .filter((prod) => prod.category_id === category.id) 
      .map((prod) => ({
        name: prod.name,
        image: `${IMAGE_URL}/${prod.thumbnail1}`, 
        price: prod.price,
      })),
  }));

  return (
    <div className="pb-[100px]">
      <SearchBar />
      <Categories isBanner={false} list={categories} />
      {productsByCategory.map(({ category, products }) => (
        <div key={category.id}>
          <ProductList list={products} />
        </div>
      ))}
    </div>
  );
};

export default Category;
