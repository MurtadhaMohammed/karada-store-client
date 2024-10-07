"use client";
import Motion from "@/components/Motion/motion";
import SearchBar from "@/components/SearchBar/searchBar";
import SubHeader from "@/components/SubHeader/subHeader";
import ProductSkeleton from "./Skeleton/skeleton";

const Loading = () => {
  return (
    <div className="pb-[100px]">
      <Motion>
        <SubHeader />
      </Motion>
      <SearchBar />
      <ProductSkeleton />
    </div>
  );
};

export default Loading;
