"use client";
import { apiCall } from "@/lib/api";
import ListBanner from "@/components/ListBanner/listBanner";
import { useQuery } from "@tanstack/react-query";

const RelatedList = ({ productId }) => {
  const { data } = useQuery({
    queryKey: [`related-${productId}`, productId],
    queryFn: () =>
      apiCall({
        pathname: `/client/product/product/${productId}/related`,
      }),
    enabled: !!productId,
  });

  return (
    <ListBanner noMore title={"قد يعجبك ايضاً"} list={data?.relatedProducts || []} />
  );
};

export default RelatedList;
