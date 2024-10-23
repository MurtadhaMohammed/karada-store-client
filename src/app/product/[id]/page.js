import ProductInfo from "./ProductInfo/productInfo";
import RelatedList from "./RelatedList/relatedList";
import { URL } from "@/lib/api";

export default async function ProductOne({ params }) {
  let products = await fetch(`${URL}/client/product/product/${params.id}`, {
    method: "GET",
    cache: "no-cache",
  });
  let product = await products.json();

  return (
    <div className="pb-[100px]">
      <ProductInfo product={product?.product} />
      <RelatedList productId={product?.product?.id} />
    </div>
  );
}
