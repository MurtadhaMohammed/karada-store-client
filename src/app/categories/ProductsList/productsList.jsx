"use client";

import DefaultCard from "@/components/DefaultCard/defaultCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Motion from "@/components/Motion/motion";
import Container from "@/components/UI/Container/container";
import { apiCall } from "@/lib/api";
import { useAppStore } from "@/lib/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import ListSkeleton from "./skeleton";

const CategoryProductList = () => {
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
    queryFn: ({ pageParam = 0 }) =>
      apiCall({
        pathname: `/app/product/search?categoryId=${selectedCategoryId}&cursor=${pageParam}&limit=${limit}`,
        method: "GET",
        cache: "no-store",
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.nextCursor || null;
    },
    enabled: !!selectedCategoryId,
  });

  if (isLoading) return <ListSkeleton />;
  if (isError || error) return <div>Error loading products.</div>;

  return (
    <div className="pt-[12px]">
      <Motion>
        <Container>
          <InfiniteScroll
            dataLength={
              data?.pages?.reduce(
                (acc, page) => acc + page?.items?.length,
                0
              ) || 0
            }
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 overflow-x-auto no-scrollbar"
          >
            {data?.pages?.map((page) =>
              page?.items?.map((el, i) => (
                <DefaultCard isGrid key={`${el.id}-${i}`} item={el} />
              ))
            )}
          </InfiniteScroll>
        </Container>
      </Motion>{" "}
      {isFetchingNextPage && <ListSkeleton size={4} />}
    </div>
  );
};

export default CategoryProductList;
