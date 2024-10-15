import ProductInfo from "./ProductInfo/productInfo";
import ProductCTA from "./ProductCTA/ProductCTA";
import ListBanner from "@/components/ListBanner/listBanner";

const defaultItem = {
  name: "ASUS Dual GeForce RTX",
  description: "ASUS Dual GeForce RTX™ 4070 OC Edition 12GB GDDR6X",
  store: "كرادة ستور",
  price: 120000,
  image: "/images/3.png",
};

const defaultList = [
  {
    name: "Power Supply",
    description: "Deepcool DA700 700W Power Supply",
    store: "كرادة ستور",
    price: 305000,
    image: "/images/1.png",
  },
  {
    name: "ريلمي G13",
    description: "ريلمي 13 برو بلس 5G - دبل سيم - 256/8 كيكابايت - اخضر",
    store: "كرادة ستور",
    price: 145000,
    image: "/images/2.png",
  },
  {
    name: "ريلمي G13",
    description: "ريلمي 13 برو بلس 5G - دبل سيم - 256/8 كيكابايت - اخضر",
    store: "كرادة ستور",
    price: 145000,
    image: "/images/4.png",
  },
  {
    name: "ASUS Dual GeForce RTX",
    description: "ASUS Dual GeForce RTX™ 4070 OC Edition 12GB GDDR6X",
    store: "كرادة ستور",
    price: 120000,
    image: "/images/3.png",
  },
  {
    name: "iphone 16 pro max",
    description: "512 GB,nutureal titanium",
    store: "كرادة ستور",
    price: 135000,
    image: "/images/iphone.png",
  },
];
// console.log(product)

export default async function ProductOne({ params }) {
  let products = await fetch(
    `http://85.208.51.126:3002/api/client/product/product/${params.id}`
  );
  let product = await products.json();
  console.log(product);

  let brandId = product.brand.id;
  let categoryId = product.category.id;

  let relatedByBrandResponse = await fetch(`http://85.208.51.126:3002/api/client/brand/brands/${brandId}`);
  let relatedByBrand = await relatedByBrandResponse.json();

  let relatedByCategoryResponse = await fetch(`http://85.208.51.126:3002/api/client/category/category/${categoryId}`);
  let relatedByCategory = await relatedByCategoryResponse.json();

  let combinedRelatedProducts = [...relatedByBrand, ...relatedByCategory];

  console.log(combinedRelatedProducts);
// Log the combined related products
console.log(combinedRelatedProducts);
  return (
    <div className="pb-[100px]">
      <ProductInfo item={product} />
      <ListBanner title="قد يعجبك ايضاً" list={defaultList} />
      <ProductCTA />
    </div>
  );
}
