import ProductInfo from "./ProductInfo/productInfo";
import ProductInfoWeb from "./ProductInfoWeb/productInfoWeb";
import RelatedList from "./RelatedList/relatedList";
import { URL, IMAGE_URL } from "@/lib/api"; 

export async function generateMetadata({ params }) {
  const id = params

  const product = await fetch(`${URL}/client/product/product/${id}`).then((res) => res.json());
  return {
    title: product?.product?.name,
    description: product?.product?.shortDescription,
    images: `${IMAGE_URL}/${product?.product?.image[0].url}`,
  }
}


export default async function ProductOne({ params }) {
  let products = await fetch(`${URL}/client/product/product/${params.id}`, {
    method: "GET",
    cache: "no-cache",
  });
  let product = await products.json();
  return (
    <div className="pb-[100px]">
      <ProductInfo product={product?.product} />
      <ProductInfoWeb product={product?.product} />
      <RelatedList productId={product?.product?.id} />
    </div>
  );
}
