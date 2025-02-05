import SearchBar from "@/components/SearchBar/searchBar";
import Categories from "@/components/Categories/categories";
import SliderBanner from "@/components/SliderBanner/sliderBanner";
import ListBanner from "@/components/ListBanner/listBanner";
import SingleBanner from "@/components/SingleBanner/singleBanner";
import OffersBanner from "@/components/offersBanner/offersBanner";
import SingleBannerPure from "@/components/SingleBannerPure/singleBannerPure";
import Link from "next/link";

import { URL } from "@/lib/api";
import ErrorBoundary from "@/components/ErrorBoundry/errorBoundry";
async function getViews() {
  const res = await fetch(`${URL}/client/view/homeView`, {
    method: "GET",
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function Home() {
  try {
    const viewData = await getViews();

    const banners = viewData.banners;

    const renderBanner = (banner) => {
      const bannerContent = () => {
        switch (banner.type) {
          case "Slider":
            return <SliderBanner banners={banner} />;
          case "SinglePure":
            return <SingleBannerPure banner={banner} />;
          case "Single":
            return <SingleBanner banner={banner} />;
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

      // Wrap banner content in a link only if the link starts with "/view"
      if (banner.link && banner.link.startsWith("/view")) {
        return (
          <Link key={banner.id} href={banner.link} passHref>
            <a>{bannerContent()}</a>
          </Link>
        );
      }

      // Render the banner content normally if no valid link is found
      return <div key={banner.id}>{bannerContent()}</div>;
    };

    return (
      <div className="pb-[100px]">
        <SearchBar />
        {banners && banners.length > 0 ? (
          banners.map((banner) => renderBanner(banner))
        ) : (
          <div>No banners available</div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching view data:", error);
    return <div>
      <ErrorBoundary/>
    </div>;
  }
}
