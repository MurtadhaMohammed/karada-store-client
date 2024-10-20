import { URL } from "@/lib/api";
import BrandList from "../BrandsList/brandList";
import BrandIdList from "./BrandList/brandList";


export default async function BrandId({ params }) {
    const { brandId } = params;
  
    const res = await fetch(`${URL}/client/product/product?brand_id=${brandId}`);
    
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
  
    const data = await res.json();
    console.log(data, "Fetched products");
  
    return (
      <div>
          <BrandIdList list={data.products} />
      </div>
    );
  }
  