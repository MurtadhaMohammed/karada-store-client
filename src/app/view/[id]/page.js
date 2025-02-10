import SearchBar from "@/components/SearchBar/searchBar";
import Categories from "@/components/Categories/categories";
import SliderBanner from "@/components/SliderBanner/sliderBanner";
import ListBanner from "@/components/ListBanner/listBanner";
import SingleBanner from "@/components/SingleBanner/singleBanner";
import OffersBanner from "@/components/offersBanner/offersBanner";
import SingleBannerPure from "@/components/SingleBannerPure/singleBannerPure";

import { URL } from "@/lib/api";
import ErrorBoundary from "@/components/ErrorBoundry/errorBoundry";

async function getViews(id) {
  const res = await fetch(`${URL}/client/view/viewById/${id}`, {
    method: "GET",
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function DynamicHomePage({ params }) {
  const { id } = params;

  try {
    const viewData = await getViews(id);

    const banners = viewData.banners;
    const title = viewData.title;
    const renderBanner = (banner) => {
      switch (banner.type) {
        case "Slider":
          return (
            <SliderBanner key={banner.id} banners={banner} title={title} />
          );
        case "SinglePure":
          return (
            <SingleBannerPure key={banner.id} banner={banner} title={title} />
          );
        case "Single":
          return <SingleBanner key={banner.id} banner={banner} title={title} />;
        case "List":
          return (
            <ListBanner
              bannerId={banner.id}
              key={banner.id}
              title={banner.title}
              list={banner?.products || []}
            />
          );
        case "OfferBanner":
          return (
            <OffersBanner
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
        {banners && banners.length > 0 ? (
          banners.map((banner) => renderBanner(banner))
        ) : (
          <div>No banners available</div>
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
