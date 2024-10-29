"use client";

import ProductSkeleton from "./Skeleton/skeleton";
import ProductSkeletonWeb from "./SkeletonWeb/skeletonWeb";

const Loading = () => {
  return (
    <div className="pb-[100px]">
      <ProductSkeleton />
      <ProductSkeletonWeb />
    </div>
  );
};

export default Loading;
