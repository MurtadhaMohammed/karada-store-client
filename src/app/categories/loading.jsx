"use client";

import SearchBar from "@/components/SearchBar/searchBar";
import SubHeader from "@/components/SubHeader/subHeader";
// import ProductSkeleton from "./Skeleton/skeleton";

const Loading = () => {
  return (
    <div className="pb-[100px]">
      <SubHeader isLoading />
      <SearchBar />
      {/* <ProductSkeleton /> */}
    </div>
  );
};

export default Loading;
