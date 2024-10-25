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

const ProductList = () => {
  const { querySearch, queryString } = useAppStore();
  const limit = 10;

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`products-${querySearch}`, querySearch, queryString],
    queryFn: ({ pageParam = 1 }) =>
      apiCall({
        pathname: `/client/product/product?page=${pageParam}&limit=${limit}&q=${querySearch}${queryString}`,
        method: "GET",
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.products?.length ? pages?.length + 1 : undefined;
    },
    // enabled: !!querySearch,
  });

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
        <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4  gap-4 overflow-x-auto no-scrollbar">
          {data?.pages?.map((page) =>
            page?.products?.map((el, i) => (
              <DefaultCard isGrid key={`${el.id}-${i}`} item={el} />
            ))
          )}
        </div>
        {/* <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading..."
            : hasNextPage
            ? "Next"
            : "No More Products"}
        </Button> */}
      </Container>
    </div>
  );
};

export default ProductList;
