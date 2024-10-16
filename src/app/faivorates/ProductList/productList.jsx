"use client";
import DefaultCard from "@/components/DefaultCard/defaultCard";
import Motion from "@/components/Motion/motion";
import Container from "@/components/UI/Container/container";
import { apiCall } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../Skeleton/skeleton";

const ProductList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["faivorates"],
    queryFn: () =>
      apiCall({
        pathname: "/client/product/productsByIds",
        data: {
          ids: [1, 2, 3, 4],
        },
      }),
  });

  if (isLoading) return <ProductSkeleton />;

  return (
    <div className="pt-[16px]">
      <Motion>
        <Container>
          <div className="grid grid-cols-2 gap-4 overflow-x-auto no-scrollbar">
            {data &&
              data?.products?.map((el, i) => (
                <DefaultCard isFav isGrid key={i} item={el} />
              ))}
          </div>
        </Container>
      </Motion>
    </div>
  );
};

export default ProductList;
