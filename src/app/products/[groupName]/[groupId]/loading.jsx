"use client";

import SearchBar from "@/components/SearchBar/searchBar";
import ProductSkeleton from "./Skeleton/skeleton";

const Loading = () => {
  return (
    <div className="pb-[100px]">
      <SearchBar />
      <ProductSkeleton />
    </div>
  );
};

export default Loading;
