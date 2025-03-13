"use client";

import DefaultCard from "@/components/DefaultCard/defaultCard";
import Motion from "@/components/Motion/motion";
import Container from "@/components/UI/Container/container";
import { apiCall, URL } from "@/lib/api";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import ListSkeleton from "./skeleton";

const ProductList = () => {
  const { selectedCategoryId } = useAppStore();
  const limit = 12;

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`products-${selectedCategoryId}`],
    queryFn: ({ pageParam = 1 }) =>
      apiCall({
        pathname: `/client/product/product?category_id=${selectedCategoryId}&page=${pageParam}&limit=${limit}`,
        method: "GET",
        cache: "no-store",
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.products?.length ? pages?.length + 1 : undefined;
    },
    enabled: !!selectedCategoryId,
  });

  if (isLoading) return <ListSkeleton />;
  if (isError || error) return <div>Error loading products.</div>;

  return (
    <div className="pt-[12px]">
      <Motion>
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 gap-2 overflow-x-auto no-scrollbar">
            {data?.pages?.map((page) =>
              page?.products?.map((el, i) => (
                <DefaultCard isGrid key={`${el.id}-${i}`} item={el} />
              ))
            )}
          </div>
        </Container>
      </Motion>
      {isFetchingNextPage && <ListSkeleton size={4} />}
      {hasNextPage && data?.pages[0]?.total > limit && (
        <Container>
          <button
            className={
              "w-full h-[48px] rounded-[8px] border border-[#eee] mt-[26px] bg-[#fff]"
            }
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            عرض المزيد
          </button>
        </Container>
      )}
    </div>
  );
};

export default ProductList;
