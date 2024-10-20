import Container from "@/components/UI/Container/container";
import CheckoutCTA from "./CheckoutCTA/checkoutCta";
import Address from "./Address/address";
import Invoice from "./Invoice/invoice";
import Voucher from "./Voucher/voucher";
import Payments from "./Payments/payments";

export default function Checkout() {
  return (
    <div className="pb-[120px]">
      <Container>
        <Payments />
        <Address />
        <Voucher />
        <Invoice />
      </Container>
      <CheckoutCTA />
    </div>
  );
}


export const dynamic = "force-dynamic"