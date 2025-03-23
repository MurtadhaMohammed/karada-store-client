import DefaultCard from "@/components/DefaultCard/defaultCard";
import { apiCall } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductSkeleton from "../[groupName]/[groupId]/Skeleton/skeleton";
import Container from "@/components/UI/Container/container";
import Empty from "@/components/Empty/empty";
import { VscSearchStop } from "react-icons/vsc";

const RandomProducts = () => {
  const limit = 12;

  const {
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["randomProducts"],
    queryFn: ({ pageParam = 1 }) =>
      apiCall({
        pathname: `/client/product/getrandom`,
        method: "GET",
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.nextPage ? lastPage.nextPage : undefined;
    },
  });

  useEffect(() => {
    if (data) {
      console.log("Fetched Data:", data);
    }
  }, [data]);

  if (isError) {
    console.error("API Error:", error);
  }

  return (
    <div className="pt-[8px]">
      <Empty
        icon={<VscSearchStop className="text-[50px]" />}
        title="لا توجد نتائج!."
        msg="لاتوجد منتجات مطابقة لبحثك"
        href={"/"}
        top={0}
        // buttonText={"عودة للرئيسية"}
      />
      <Container>
        <div className="flex items-center justify-between mb-2">
          <p> قد يعجبك أيضاََ </p>
        </div>
        <InfiniteScroll
          dataLength={
            data?.pages?.reduce(
              (acc, page) => acc + page?.products?.length,
              0
            ) || 0
          }
          next={fetchNextPage}
          hasMore={hasNextPage}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 gap-2 overflow-x-auto no-scrollbar"
        >
          {data?.pages?.flatMap((page) =>
            page?.products?.map((el, i) => (
              <DefaultCard isGrid key={`${el.id}-${i}`} item={el} />
            ))
          )}
        </InfiniteScroll>
        {isFetchingNextPage && <ProductSkeleton size={4} />}
      </Container>
    </div>
  );
};

export default RandomProducts;
