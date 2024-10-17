"use client";
import { useState, useEffect } from "react";
import CreatviceCard from "@/components/CreativeCard/creativeCard";
import DefaultCard from "@/components/DefaultCard/defaultCard";
import Button from "@/components/UI/Button/button";
import Container from "@/components/UI/Container/container";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { URL } from "@/lib/api";

const RelatedList = ({ bannerId, params, isCreative = false }) => {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedItems = async () => {
      try {
        let relatedItems = await fetch(
          `${URL}/client/product/product/${params.id}/related`,
          {
            method: "GET",
            cache: "no-cache",
          }
        );
        let relatedData = await relatedItems.json();
        setRelated(relatedData.relatedProducts || []);
      } catch (err) {
        setError("Failed to load related items.");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedItems();
  }, [params?.id]);

  return (
    <div className="pt-[16px]">
      <Container>
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-black mr-1">قد يعجبك ايضاً"</h3>
          <Button
            size="sm"
            icon={<IoIosArrowBack className="text-[#717171] text-[16px]" />}
            href={`/products/${bannerId}`}
          >
            <p className="text-[#717171] text-[14px]">عرض المزيد</p>
          </Button>
        </div>
      </Container>
      <Container noPadding>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pl-[16px] pr-[16px] pb-[16px] pt-3">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : related.length > 0 ? (
            related.map((el, i) =>
              isCreative ? (
                <CreatviceCard key={i} index={i} item={el} />
              ) : (
                <DefaultCard key={i} item={el} />
              )
            )
          ) : (
            <p>No items available</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default RelatedList;
