import SearchBar from "@/components/SearchBar/searchBar";
import Categories from "@/components/Categories/categories";
import SliderBanner from "@/components/SliderBanner/sliderBanner";
import ListBanner from "@/components/ListBanner/listBanner";
import SingleBanner from "@/components/SingleBanner/singleBanner";
import { URL } from "@/lib/api";
import OrderCard from "./orders/OrderCard/orderCard";
import Container from "@/components/UI/Container/container";
import ErrorBoundary from "@/components/ErrorBoundry/errorBoundry";
// import Image from "next/image";

// const creaitveList = [
//   {
//     name: "Power Supply",
//     description: "Deepcool DA700 700W Power Supply",
//     store: "كرادة ستور",
//     price: 305000,
//     image: "/images/cam.png",
//   },
//   {
//     name: "ريلمي G13",
//     description: "ريلمي 13 برو بلس 5G - دبل سيم - 256/8 كيكابايت - اخضر",
//     store: "كرادة ستور",
//     price: 145000,
//     image: "/images/card2.png",
//   },
//   {
//     name: "ASUS Dual GeForce RTX",
//     description: "ASUS Dual GeForce RTX™ 4070 OC Edition 12GB GDDR6X",
//     store: "كرادة ستور",
//     price: 120000,
//     image: "/images/card3.png",
//   },
//   {
//     name: "ipone 16 pro max",
//     description: "512 GB,nutureal titanium",
//     store: "كرادة ستور",
//     price: 135000,
//     image: "/images/card4.png",
//   },
// ];

// const defaultList = [
//   {
//     name: "Power Supply",
//     description: "Deepcool DA700 700W Power Supply",
//     store: "كرادة ستور",
//     price: 305000,
//     image: "/images/1.png",
//   },
//   {
//     name: "ريلمي G13",
//     description: "ريلمي 13 برو بلس 5G - دبل سيم - 256/8 كيكابايت - اخضر",
//     store: "كرادة ستور",
//     price: 145000,
//     image: "/images/2.png",
//   },
//   {
//     name: "ريلمي G13",
//     description: "ريلمي 13 برو بلس 5G - دبل سيم - 256/8 كيكابايت - اخضر",
//     store: "كرادة ستور",
//     price: 145000,
//     image: "/images/4.png",
//   },
//   {
//     name: "ASUS Dual GeForce RTX",
//     description: "ASUS Dual GeForce RTX™ 4070 OC Edition 12GB GDDR6X",
//     store: "كرادة ستور",
//     price: 120000,
//     image: "/images/3.png",
//   },
//   {
//     name: "ipone 16 pro max",
//     description: "512 GB,nutureal titanium",
//     store: "كرادة ستور",
//     price: 135000,
//     image: "/images/iphone.png",
//   },
// ];

async function getBanners() {
  const res = await fetch(`${URL}/client/banner/all-banners`, {
    method: "GET",
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function Home() {
  const banners = await getBanners();
  const renderBanner = (banner) => {
    switch (banner.type) {
      case "Slider":
        return <SliderBanner key={banner.id} banners={banner} />;
      case "Single":
        return <SingleBanner key={banner.id} banner={banner} />;
      case "List":
        return (
          <ListBanner
            bannerId={banner.id}
            key={banner.id}
            title={banner.title}
            list={banner?.products || []}
          />
        );
      case "Category":
        return <Categories key={banner.id} list={banner.categories} />;
      case "CreativeBanner":
        return (
          <ListBanner
            bannerId={banner.id}
            key={banner.id}
            title={banner.title}
            list={banner?.products || []}
            isCreative
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="pb-[100px]">
      <SearchBar />
      {/* <div className="md:hidden">
      <Container>
        <OrderCard
          order={{
            id: 2,
            orderStatus: "Processing",
            images: ["", "", "", "", ""],
          }}
        />
      </Container>
      </div> */}
      {/* <SliderBanner />
      <Categories />
      <ListBanner title="احدث المنتجات" list={creaitveList} isCreative />
      <ListBanner title="كافة مستلزمات الكمبيوتر " list={defaultList} />
      <SingleBanner /> */}
      {banners?.map((banner) => renderBanner(banner))}
    </div>
  );
}
