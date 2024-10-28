"use client";

// import SearchBar from "@/components/SearchBar/searchBar";
import OrdersSkeleton from "./Skeleton/skeleton";

const Loading = () => {
  return (
    <div className="pb-[100px]">
      {/* <SearchBar /> */}
      <OrdersSkeleton/>
    </div>
  );
};

export default Loading;
