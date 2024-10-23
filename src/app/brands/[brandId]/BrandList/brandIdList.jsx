"use client";
import { useState, useEffect } from "react";
import DefaultCard from "@/components/DefaultCard/defaultCard";
import Motion from "@/components/Motion/motion";
import Container from "@/components/UI/Container/container";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiCall } from "@/lib/api";
import { useAppStore } from "@/lib/store";

const BrandIdList = ({ brandId }) => {
  const { setPageTitle } = useAppStore();

  const limit = 10;
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", brandId],
    queryFn: ({ pageParam = 1 }) =>
      apiCall({
        pathname: `/client/product/product?brand_id=${brandId}`,
      }),
    enabled: !!brandId,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.products.length === limit ? pages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (data && data?.pages[0]?.products[0]?.brand?.name) {
      setPageTitle(data.pages[0].products[0].brand.name);
    }
  }, [data]);

  return (
    <div className="pt-[16px]">
      <Motion>
        <Container>
          <div className="grid grid-cols-2 gap-4 overflow-x-auto no-scrollbar">
            {data?.pages.map((page, pageIndex) =>
              page.products.map((el, i) => (
                <DefaultCard isGrid key={`${pageIndex}-${i}`} item={el} />
              ))
            )}
          </div>
        </Container>
      </Motion>
    </div>
  );
};

export default BrandIdList;
