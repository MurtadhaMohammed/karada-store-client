"use client";

import DefaultCard from "@/components/DefaultCard/defaultCard";
import Motion from "@/components/Motion/motion";
import Container from "@/components/UI/Container/container";
import { URL } from "@/lib/api";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const selectedCategoryId = useAppStore((state) => state.selectedCategoryId);

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategoryId) {
        const res = await fetch(`${URL}/client/product/product?category_id=${selectedCategoryId}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setProducts(data.products);
      }
    };

    fetchProducts();
  }, [selectedCategoryId]);

  return (
    <div className="pt-[16px]">
      <Motion>
        <Container>
          <div className="grid grid-cols-2 gap-4 overflow-x-auto no-scrollbar">
            {products.map((el, i) => (
              <DefaultCard isGrid key={i} item={el} />
            ))}
          </div>
        </Container>
      </Motion>
    </div>
  );
};

export default ProductList;
