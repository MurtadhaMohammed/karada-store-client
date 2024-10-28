import ProductInfo from "./ProductInfo/productInfo";
import ProductInfoWeb from "./ProductInfoWeb/productInfoWeb";
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
      <div className="md:hidden block">
        <ProductInfo product={product?.product} />
      </div>
      <div className="md:block hidden">
        <ProductInfoWeb product={product?.product} />
      </div>
      <RelatedList productId={product?.product?.id} />
    </div>
  );
}
