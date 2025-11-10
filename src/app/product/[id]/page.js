import ProductInfo from "./ProductInfo/productInfo";
import ProductInfoWeb from "./ProductInfoWeb/productInfoWeb";
import RelatedList from "./RelatedList/relatedList";
import { URL, IMAGE_URL } from "@/lib/api";

export async function generateMetadata({ params }) {
  try {
    if (!params || !params.id) {
      console.error("Missing params or params.id");
      return {
        title: "Product Page",
        description: "Product description",
      };
    }
    const response = await fetch(`${URL}/app/product/find/${params.id}`);
    const data = await response.json();

    let shortDescription = (data?.product?.description || "Product description")
      .split("\n")
      .filter((line) => line.startsWith("-"))
      .slice(0, 5)
      .join("\n");

    return {
      // title: data?.product?.name || 'Product Page',
      // description: data?.product?.shortDescription || 'Product description',
      openGraph: {
        title: data?.product?.name || "Product Page",
        description: shortDescription || "Product description",
        images: [
          {
            url: `${IMAGE_URL}/${data?.product?.image[0]}`,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product Page",
      description: "Product description",
    };
  }
}

export default async function ProductOne({ params }) {
  if (!params || !params.id) {
    console.error("Missing params or params.id");
    return <div>Error: Invalid product ID</div>;
  }

  let resp = await fetch(`${URL}/app/product/find/${params.id}`, {
    method: "GET",
    cache: "no-cache",
  });

  let product = await resp.json();

  return (
    <div className="pb-[100px]">
      <ProductInfo product={product} />
      <ProductInfoWeb product={product} />
      <RelatedList productId={product?.id} />
    </div>
  );
}
