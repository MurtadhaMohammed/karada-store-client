"use client";
import DefaultCard from "@/components/DefaultCard/defaultCard";
import Container from "@/components/UI/Container/container";
import { apiCall } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductSkeleton from "../Skeleton/skeleton";
import { useAppStore } from "@/lib/store";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RandomProducts from "@/app/products/randomProducts/randomProducts";

const ProductList = ({ groupId, groupName }) => {
  const { querySearch, queryString, setSearchResult, setPageTitle } =
    useAppStore();
  const limit = 12;

  const getUrl = (pageParam) => ({
    search: `/app/product/search?cursor=${pageParam}&limit=${limit}&q=${querySearch}${queryString}`,
    banner: `/app/product/banner/${groupId}?cursor=${pageParam}&limit=${limit}`,
    brand: `/app/product/search?brandId=${groupId}&cursor=${pageParam}&limit=${limit}`,
  });

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      `products_${groupName}_${groupId}_${querySearch}`,
      querySearch,
      queryString,
    ],
    queryFn: ({ pageParam = 0 }) =>
      apiCall({
        pathname: getUrl(pageParam)[groupName],
        method: "GET",
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.nextCursor || null;
    },
    enabled: !!groupId,
  });

  useEffect(() => {
    if (data?.pages) {
      const total = data.pages[0]?.total;
      setSearchResult(total);
    }
  }, [data, setSearchResult]);

  useEffect(() => {
    if (data && data?.pages[0] && groupName !== "search" && groupId !== "all")
      setPageTitle(
        data?.pages[0]?.bannerTitle ||
          data.pages[0]?.items[0]?.brandName ||
          "..."
      );
    // else if (
    //   data &&
    //   data?.pages[0]?.items?.length > 0 &&
    //   groupName === "brand"
    // )
    //   setPageTitle(data.pages[0]?.items[0]?.brand?.name);
    // else if (groupName === "brand") setPageTitle("...");
  }, [data]);

  if (isLoading) return <ProductSkeleton />;
  if (isError || error) return <div>Error loading products.</div>;
  if (data?.pages[0]?.total === 0)
    return (
      // <Empty
      //   icon={<VscSearchStop className="text-[100px]" />}
      //   title="لا توجد نتائج!."
      //   msg="لاتوجد منتجات مطابقة لبحثك"
      //   href={"/"}
      //   top={14}
      //   // buttonText={"عودة للرئيسية"}
      // />

      <RandomProducts />
    );

  return (
    <div className="pt-[8px]">
      <Container>
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

export default ProductList;
