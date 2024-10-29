"use client";
import DefaultCard from "@/components/DefaultCard/defaultCard";
import Button from "@/components/UI/Button/button";
import Container from "@/components/UI/Container/container";
import { apiCall } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductSkeleton from "../Skeleton/skeleton";
import { useAppStore } from "@/lib/store";
import Empty from "@/components/Empty/empty";
import { VscSearchStop } from "react-icons/vsc";
import { useEffect } from "react";
import useIsScreenMd from "@/hooks/useIsScreenMd";

const ProductList = ({ groupId, groupName }) => {
  const { querySearch, queryString, setPageTitle } = useAppStore();
  const isScreenMd = useIsScreenMd();
  const limit = isScreenMd ? 12 : 10;

  const getUrl = (pageParam) => ({
    search: `/client/product/product?page=${pageParam}&limit=${limit}&q=${querySearch}${queryString}`,
    banner: `/client/product/getProductsByBanner/${groupId}?page=${pageParam}&limit=${limit}`,
    brand: `/client/product/product?brand_id=${groupId}&page=${pageParam}&limit=${limit}`,
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
    queryFn: ({ pageParam = 1 }) =>
      apiCall({
        pathname: getUrl(pageParam)[groupName],
        method: "GET",
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.products?.length ? pages?.length + 1 : undefined;
    },
    enabled: !!groupId,
  });

  useEffect(() => {
    if (data && data?.pages[0] && groupName !== "search" && groupId !== "all")
      setPageTitle(data?.pages[0]?.bannerTitle);
    else if (
      data &&
      data?.pages[0]?.products?.length > 0 &&
      groupName === "banner"
    )
      setPageTitle(data.pages[0]?.products[0]?.brand?.name);
  }, [data]);

  if (isLoading) return <ProductSkeleton />;
  if (isError || error) return <div>Error loading products.</div>;
  if (data?.pages[0]?.total === 0)
    return (
      <Empty
        icon={<VscSearchStop className="text-[100px]" />}
        title="لا توجد نتائج!."
        msg="لاتوجد منتجات مطابقة لبحثك"
        href={"/"}
        top={14}
        // buttonText={"عودة للرئيسية"}
      />
    );

  return (
    <div className="pt-[16px]">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 md:gap-6  gap-4 overflow-x-auto no-scrollbar">
          {data?.pages?.map((page) =>
            page?.products?.map((el, i) => (
              <DefaultCard isGrid key={`${el.id}-${i}`} item={el} />
            ))
          )}
        </div>
      </Container>
      {isFetchingNextPage && <ProductSkeleton size={4} />}
      {hasNextPage && data?.pages[0]?.total > limit && (
        <Container>
          <button
            className={
              "w-full h-[48px] rounded-[8px] border border-[#eee] mt-[26px]"
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
