import SearchBar from "@/components/SearchBar/searchBar";
import Categories from "@/components/Categories/categories";
import SliderBanner from "@/components/SliderBanner/sliderBanner";
import ListBanner from "@/components/ListBanner/listBanner";
import SingleBanner from "@/components/SingleBanner/singleBanner";
// import Image from "next/image";

const creaitveList = [
  {
    name: "Power Supply",
    description: "Deepcool DA700 700W Power Supply",
    store: "كرادة ستور",
    price: 305000,
    image: "/images/cam.png",
  },
  {
    name: "ريلمي G13",
    description: "ريلمي 13 برو بلس 5G - دبل سيم - 256/8 كيكابايت - اخضر",
    store: "كرادة ستور",
    price: 145000,
    image: "/images/card2.png",
  },
  {
    name: "ASUS Dual GeForce RTX",
    description: "ASUS Dual GeForce RTX™ 4070 OC Edition 12GB GDDR6X",
    store: "كرادة ستور",
    price: 120000,
    image: "/images/card3.png",
  },
  {
    name: "ipone 16 pro max",
    description: "512 GB,nutureal titanium",
    store: "كرادة ستور",
    price: 135000,
    image: "/images/card4.png",
  },
];

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


const res = await fetch(
  "http://85.208.51.126:3002/api/client/banner/all-banners",
  {
    method: "GET",
    cache: "no-cache",
  }
);

const data = await res.json();

// Filter banners based on their type
const singleBanners = data.banners.filter((banner) => banner.type === "Single");
const sliderBanners = data.banners.filter((banner) => banner.type === "Slider");

export default function Home() {
  return (
    <div className="pb-[100px]">
      {/* <MainHeader /> */}
      <SearchBar />
      <SliderBanner data={sliderBanners} />
      <Categories />
      <ListBanner title="احدث المنتجات" list={creaitveList} isCreative />
      <ListBanner title="كافة مستلزمات الكمبيوتر " list={defaultList} />
      {singleBanners.map((banner) => (
        <SingleBanner key={banner.id} banner={banner} />
      ))}
      {/* <Container>
        <h1 className="font-[family-name:var(--font-rubik)]">مرحبا بالجميع</h1>
      </Container> */}
    </div>
  );
}
