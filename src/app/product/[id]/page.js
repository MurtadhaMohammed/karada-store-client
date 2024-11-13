import ProductInfo from "./ProductInfo/productInfo";
import ProductInfoWeb from "./ProductInfoWeb/productInfoWeb";
import RelatedList from "./RelatedList/relatedList";
import { URL, IMAGE_URL } from "@/lib/api";

export async function generateMetadata({ params }) {
  try {
    const response = await fetch(`${URL}/client/product/product/${params.id}`);
    const data = await response.json();

    return {
      // title: data?.product?.name || 'Product Page',
      // description: data?.product?.shortDescription || 'Product description',
      openGraph: {
        title: data?.product?.name || 'Product Page',
        description: data?.product?.shortDescription || 'Product description',
        images: [
          {
            image: `${IMAGE_URL}/${data?.product?.image[0]}`,
            width: 6,
            height: 8,
          },
        ],
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product Page',
      description: 'Product description',
    }
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
