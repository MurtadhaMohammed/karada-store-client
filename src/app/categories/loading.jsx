"use client";

import SearchBar from "@/components/SearchBar/searchBar";
import CategoriesSkeleton from "./Skeleton/skeleton";
// import ProductSkeleton from "./Skeleton/skeleton";

const Loading = () => {
  return (
    <div className="pb-[100px]">
      <SearchBar />
      <CategoriesSkeleton/>
    </div>
  );
};

export default Loading;
