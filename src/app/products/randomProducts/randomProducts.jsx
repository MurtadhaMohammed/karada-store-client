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
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["randomProducts"],
    queryFn: ({ pageParam = 0 }) =>
      apiCall({
        pathname: `/app/product/random?cursor=${pageParam}&limit=${12}`,
        method: "GET",
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.nextCursor || null;
    },
  });

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
        <div className="flex items-center justify-center pb-4">
          <p>أخذلك فره بمنتجاتنا ممكن يعجبك شي ثاني</p>
        </div>

        <InfiniteScroll
          dataLength={
            data?.pages?.reduce((acc, page) => acc + page?.items?.length, 0) ||
            0
          }
          next={fetchNextPage}
          hasMore={hasNextPage}
          className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 md:gap-6 gap-2 overflow-x-auto no-scrollbar"
        >
          {data?.pages?.map((page) =>
            page?.items?.map((el, i) => (
              <DefaultCard isGrid key={`${el.id}-${i}`} item={el} />
            ))
          )}
        </InfiniteScroll>
      </Container>

      {isFetchingNextPage && <ProductSkeleton size={4} />}
    </div>
  );
};

export default RandomProducts;
