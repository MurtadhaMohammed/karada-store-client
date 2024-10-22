"use client";
import { useState, useEffect } from "react";
import DefaultCard from "@/components/DefaultCard/defaultCard";
import Motion from "@/components/Motion/motion";
import Container from "@/components/UI/Container/container";
import { URL } from "@/lib/api";

const BrandIdList = ({ brandId }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${URL}/client/product/product?brand_id=${brandId}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setList(data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [brandId]);

  return (
    <div className="pt-[16px]">
      <Motion>
        <Container>
          <div className="grid grid-cols-2 gap-4 overflow-x-auto no-scrollbar">
            {list.map((el, i) => (
              <DefaultCard isGrid key={i} item={el} />
            ))}
          </div>
        </Container>
      </Motion>
    </div>
  );
};

export default BrandIdList;
