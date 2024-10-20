import CartList from "./CartList/cartList";
import InstallmentBanner from "@/components/InstallmentBanner/installmentBanner";
import Container from "@/components/UI/Container/container";
import RelatedList from "./RelatedList/relatedList";



export default function Cart() {
  return (
    <div className="pb-[100px]">
      <Container>
        <div className="mt-[16px]">
          <InstallmentBanner />
        </div>
      </Container>
      <CartList />
      {/* <RelatedList/> */}
    </div>
  );
}
