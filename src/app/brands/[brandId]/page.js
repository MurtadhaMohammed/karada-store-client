import BrandIdList from "./BrandList/brandIdList";

export default function BrandId({ params }) {
  const { brandId } = params;

  return (
    <div>
      <BrandIdList brandId={brandId} />
    </div>
  );
}
