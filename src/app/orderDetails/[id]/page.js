import OrderDetails from "./OrderDetail/OrderDetails";
import { URL, IMAGE_URL } from "@/lib/api";

export default async function ProductOne({ params }) {
  if (!params || !params.id) {
    console.error("Missing params or params.id");
    return <div>Error: Invalid product ID</div>;
  }

  return (
    <div className="pb-[100px]">
      <OrderDetails params={params} />
    </div>
  );
}
