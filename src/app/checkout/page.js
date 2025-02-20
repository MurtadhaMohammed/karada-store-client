import Container from "@/components/UI/Container/container";
import CheckoutCTA from "./CheckoutCTA/checkoutCta";
import Address from "./Address/address";
import Invoice from "./Invoice/invoice";
import Voucher from "./Voucher/voucher";
import Payments from "./Payments/payments";

export default function Checkout() {
  return (
      <div className="pb-[120px] md:mt-[24px]">
        <Container>
          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div>
              <Payments />
              <Address />
            </div>
            <div>
              <Voucher />
              <Invoice />
            </div>
          </div>
        </Container>
        <CheckoutCTA />
      </div>
  );
}

export const dynamic = "force-dynamic";
