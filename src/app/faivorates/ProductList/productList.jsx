"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import DefaultCard from "@/components/DefaultCard/defaultCard";
import Motion from "@/components/Motion/motion";
import Container from "@/components/UI/Container/container";
import { apiCall } from "@/lib/api";
import ProductSkeleton from "../Skeleton/skeleton";

const ProductList = () => {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      if (typeof window !== "undefined") {
        const favorites = JSON.parse(localStorage.getItem("favorites_product")) || [];
        console.log("Favorites from localStorage:", favorites); // Log the IDs here
        setIds(favorites);
      }
    };

    loadFavorites();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["favorites", ids],
    queryFn: () =>
      apiCall({
        pathname: "/client/product/getProductsByIds",
        data: {
          ids: ids.map((el) => parseInt(el)),
        },
        cache: "no-cache",
      }),
    enabled: ids.length > 0,
  });

  if (isLoading) return <ProductSkeleton />;

  return (
    <div className="pt-[16px]">
      <Motion>
        <Container>
          <div className="grid grid-cols-2 gap-4 overflow-x-auto no-scrollbar">
            {data?.products?.map((el, i) => (
              <DefaultCard isFav isGrid key={i} item={el} />
            ))}
          </div>
        </Container>
      </Motion>
    </div>
  );
};

export default ProductList;