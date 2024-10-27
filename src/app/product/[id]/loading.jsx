"use client";

import ProductSkeleton from "./Skeleton/skeleton";
import ProductSkeletonWeb from "./SkeletonWeb/skeletonWeb";

const Loading = () => {
  return (
    <div className="pb-[100px]">
      <div className="md:hidden">
        <ProductSkeleton />
      </div>
      <div className="md:block">
       <ProductSkeletonWeb/>
      </div>
    </div>
  );
};

export default Loading;
