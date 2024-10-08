import SearchBar from "@/components/SearchBar/searchBar";
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
    name: "ipone 16 pro max",
    description: "512 GB,nutureal titanium",
    store: "كرادة ستور",
    price: 135000,
    image: "/images/iphone.png",
  },
];


export default function ProductOne({ params }) {
  return (
    <div className="pb-[100px]">
      <ProductInfo item={defaultItem} />
      <ListBanner title="قد يعجبك ايضاً" list={defaultList} />
      <ProductCTA/>
    </div>
  );
}
