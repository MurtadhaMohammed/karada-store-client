"use client";

import Container from "@/components/UI/Container/container";
import CheckoutCTA from "./CheckoutCTA/checkoutCta";
import Address from "./Address/address";
import Invoice from "./Invoice/invoice";
import Voucher from "./Voucher/voucher";
import Payments from "./Payments/payments";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorBanner from "./errorBanner/errorBanner";

export default function Checkout() {
  const { isLogin } = useAppStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthAndCart = () => {
      const token = localStorage.getItem("karada-token");
      const cart = localStorage.getItem("karada-cart");
      
      if (!token) {
        const url = new URL('/login', window.location.origin);
        url.searchParams.set('redirect', '/checkout');
        router.replace(url.toString());
        return;
      }

      if (!cart || JSON.parse(cart).length === 0) {
        router.replace('/cart');
        return;
      }

      setIsChecking(false);
    };

    checkAuthAndCart();
  }, [router]);

  if (isChecking || !isLogin) {
    return null;
  }

  return (
    <div className="pb-[120px] md:mt-[24px] relative">
      <Container>
        <div className="sticky top-20">
          <ErrorBanner />
        </div>
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
