import ProductInfo from "./ProductInfo/productInfo";
// import ProductCTA from "./ProductCTA/ProductCTA";
import ListBanner from "@/components/ListBanner/listBanner";
import { URL } from "@/lib/api";

// const defaultItem = {
//   name: "ASUS Dual GeForce RTX",
//   description: "ASUS Dual GeForce RTX™ 4070 OC Edition 12GB GDDR6X",
//   store: "كرادة ستور",
//   price: 120000,
//   image: "/images/3.png",
// };

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

export default async function ProductOne({ params }) {
  let products = await fetch(`${URL}/client/product/product/${params.id}`, {
    method: "GET",
    cache: "no-cache",
  });

  let product = await products.json();
  let relatedItems = await fetch(
    `${URL}/client/product/product/${params.id}/related`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  let relatedData = await relatedItems.json();
  let related = relatedData.relatedProducts || [];

  return (
    <div className="pb-[100px]">
      <ProductInfo product={product?.product} />
      <ListBanner bannerId={2} title="قد يعجبك ايضاً" list={related} />
      {/* <ProductCTA product={product} /> */}
    </div>
  );
}
