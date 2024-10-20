import Container from "@/components/UI/Container/container";
import CheckoutCTA from "./CheckoutCTA/checkoutCta";
import Address from "./Address/address";
import Invoice from "./Invoice/invoice";
import Voucher from "./Voucher/voucher";
import Payments from "./Payments/payments";
import { apiCall, URL } from "@/lib/api";

export default function Checkout() {
  const handleOrderCreation = async () => {
    try {
      const response = await apiCall(`${URL}/client/order/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        }),
      });
      if (response.ok) {
        console.log("Order created successfully");
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

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