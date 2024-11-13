import ProductInfo from "./ProductInfo/productInfo";
import ProductInfoWeb from "./ProductInfoWeb/productInfoWeb";
import RelatedList from "./RelatedList/relatedList";
import { URL, IMAGE_URL } from "@/lib/api"; 

export async function generateMetadata({ params }) {
  const { id } = params;
  try {
    const product = await fetch(`${URL}/client/product/product/${id}`).then((res) => res.json());
    return {
      title: product?.product?.name || "Product Details", 
      description: product?.product?.shortDescription || "Check out our product details.",
      images: `${IMAGE_URL}/${product?.product?.thumbnail1}` || "/default-thumbnail.jpg",
    };
  } catch (error) {
    console.error("Failed to fetch product data for metadata:", error);
    return {
      title: "Product Details",
      description: "Explore our range of products.",
      images: "/default-thumbnail.jpg",
    };
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
