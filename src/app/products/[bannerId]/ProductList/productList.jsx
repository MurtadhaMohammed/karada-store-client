"use client";
import DefaultCard from "@/components/DefaultCard/defaultCard";
import Button from "@/components/UI/Button/button";
import Container from "@/components/UI/Container/container";
import { apiCall } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductSkeleton from "../Skeleton/skeleton";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

const ProductList = ({ bannerId }) => {
  const { setPageTitle } = useAppStore();
  const limit = 10;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", bannerId],
    queryFn: ({ pageParam = 1 }) =>
      apiCall({
        pathname:
          bannerId === "all"
            ? `/client/product/product?page=${pageParam}&limit=${limit}`
            : `/client/product/getProductsByBanner/${bannerId}?page=${pageParam}&limit=${limit}`,
        method: "GET",
        cache: "no-cache",
      }),
    enabled: !!bannerId,
    getNextPageParam: (lastPage, pages) => {
      // Determine the next page parameter based on the current last page data
      return lastPage.products.length ? pages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (data && data?.pages[0]) setPageTitle(data?.pages[0]?.bannerTitle);
  }, [data]);

  if (isLoading) return <ProductSkeleton />;
  if (isError) return <div>Error loading products.</div>;

  return (
    <div className="pt-[16px]">
      <Container>
        <div className="grid grid-cols-2 gap-4 overflow-x-auto no-scrollbar">
          {data.pages.map((page) =>
            page.products.map((el, i) => (
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
