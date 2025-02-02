"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import DefaultCard from "@/components/DefaultCard/defaultCard";
import Motion from "@/components/Motion/motion";
import Container from "@/components/UI/Container/container";
import { apiCall } from "@/lib/api";
import ProductSkeleton from "../Skeleton/skeleton";
import Empty from "@/components/Empty/empty";
import { BiBlanket } from "react-icons/bi";

const ProductList = () => {
  const [favorites, setFavorites] = useState([]);

  const handleRemoveFav = (id) => {
    let old = JSON.parse(localStorage.getItem("favorites_product")) || [];
    let newFav = old.filter((el) => el !== id);
    setFavorites(newFav);
    localStorage.setItem("favorites_product", JSON.stringify(newFav));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites_product")) || [];
      setFavorites(storedFavorites.map((id) => parseInt(id)));
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["favorites", favorites],
    queryFn: () => {
      const filteredFavorites = favorites.filter(
        (id) => id !== null && id !== undefined
      );

      return apiCall({
        pathname: "/client/product/productsByIds",
        data: { productIds: filteredFavorites },
        method: "POST",
      });
    },
    enabled: favorites.length !== 0,
  });

  if (favorites?.length === 0)
    return (
      <Empty
        icon={<BiBlanket className="text-[100px]" />}
        title="لا توجد منتجات!."
        msg="قم بإضافة منتجات الى المفضلة"
        href={"/"}
        top={14}
        buttonText={"عودة للرئيسية"}
      />
    );

  if (isLoading) return <ProductSkeleton />;

  return (
    <div className="pt-[16px]">
      <Motion>
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4  gap-4 overflow-x-auto no-scrollbar">
            {data &&
              data?.products?.map((el, i) => (
                <DefaultCard
                  isFav
                  isGrid
                  key={i}
                  item={el}
                  handleRemoveFav={handleRemoveFav}
                />
              ))}
          </div>
        </Container>
      </Motion>
    </div>
  );
};

export default ProductList;
