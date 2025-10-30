import SearchBar from "@/components/SearchBar/searchBar";
import Categories from "@/components/Categories/categories";
import SliderBanner from "@/components/SliderBanner/sliderBanner";
import ListBanner from "@/components/ListBanner/listBanner";
import OffersBanner from "@/components/offersBanner/offersBanner";
import SingleBannerPure from "@/components/SingleBannerPure/singleBannerPure";
import Link from "next/link";
import { FaUpLong } from "react-icons/fa6";

import { URL } from "@/lib/api";
import ErrorBoundary from "@/components/ErrorBoundry/errorBoundry";
import BrandBanner from "@/components/brandBanner/brandBanner";
import GridBanner from "@/components/GridBanner/gridBanner";
import Container from "@/components/UI/Container/container";

async function getViews() {
  const res = await fetch(`${URL}/client/view/homeView`, {
    method: "GET",
    cache: "no-cache",
    // next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function Home({ searchParams }) {
  try {
    const oiaoia = searchParams?.oiaoia;
    if (oiaoia === "true") {
      return (
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between h-[50vh]">
            <img src="./logoo8.gif" className="w-[300px] h-[300px]" />
            <div className="flex items-center justify-center ">
              <img src="./logoo9.png" className="w-[300px] h-[300px]" />
              <div className="flex items-center justify-center ">
                <p className="text-2xl text-red-600 font-bold text-center">
                  +15 <br /> social <br /> credits
                </p>
                <FaUpLong className="h-[90px] w-[90px] text-green-500" />
              </div>
            </div>
          </div>
          <audio autoPlay loop>
            <source src="/sound.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <p>made by iaie & aiau & aui</p>
        </Container>
      );
    }

    const viewData = await getViews();
    const banners = viewData.banners;

    const renderBanner = (banner) => {
      const bannerContent = () => {
        switch (banner.type) {
          case "Slider":
            return <SliderBanner banners={banner} />;
          case "SinglePure":
            return <SingleBannerPure banner={banner} />;
          case "Brand":
            return <BrandBanner list={banner.brand_ids} />;
          case "List":
            return (
              <ListBanner
                bannerId={banner.id}
                title={banner.title}
                list={banner?.products || []}
              />
            );
          case "OfferBanner":
            return (
              <OffersBanner
                bannerId={banner.id}
                title={banner.title}
                list={banner?.products || []}
              />
            );
          case "Category":
            return <Categories list={banner.categories} />;
          case "grid":
            return (
              <GridBanner
                banner={banner}
                bannerImage={banner?.img}
                link={banner?.link || "/"}
                grid={banner?.grid}
                hasBanner={banner?.has_banner}
                bannerAlignment={banner?.bannerAlignment}
              />
            );
          case "CreativeBanner":
            return (
              <ListBanner
                bannerId={banner.id}
                title={banner.title}
                list={banner?.products || []}
                isCreative
              />
            );
          default:
            return null;
        }
      };

      if (banner.link && banner.link.startsWith("/view")) {
        return (
          <Link key={banner.id} href={banner.link}>
            {bannerContent()}
          </Link>
        );
      }

      return <div key={banner.id}>{bannerContent()}</div>;
    };
    return (
      <div className="pb-[100px]">
        {!oiaoia && <SearchBar />}
        {banners && banners.length > 0 ? (
          banners.map((banner) => renderBanner(banner))
        ) : (
          <div>
            <ErrorBoundary />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching view data:", error);
    return (
      <div>
        <ErrorBoundary />
      </div>
    );
  }
}
