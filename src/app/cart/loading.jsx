"use client";

import CartSkeleton from "./Skeleton/skeleton";

// import ProductSkeleton from "./Skeleton/skeleton";

const Loading = () => {
  return (
    <div className="pb-[100px]">
      <CartSkeleton />
    </div>
  );
};

export default Loading;
