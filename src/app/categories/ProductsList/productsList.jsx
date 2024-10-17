"use client";

import DefaultCard from "@/components/DefaultCard/defaultCard";
import Motion from "@/components/Motion/motion";
import Container from "@/components/UI/Container/container";
import { apiCall, URL } from "@/lib/api";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import ListSkeleton from "./skeleton";

const ProductList = () => {
  const { selectedCategoryId } = useAppStore();

  const { data, isLoading } = useQuery({
    queryKey: [`products-${selectedCategoryId}`],
    queryFn: () =>
      apiCall({
        pathname: `/client/product/product?category_id=${selectedCategoryId}`,
      }),
    enabled: !!selectedCategoryId,
  });

  if (isLoading) return <ListSkeleton />;

  return (
    <div className="pt-[16px]">
      <Motion>
        <Container>
          <div className="grid grid-cols-2 gap-4 overflow-x-auto no-scrollbar">
            {data &&
              data?.products?.map((el, i) => (
                <DefaultCard isGrid key={i} item={el} />
              ))}
          </div>
        </Container>
      </Motion>
    </div>
  );
};

export default ProductList;
