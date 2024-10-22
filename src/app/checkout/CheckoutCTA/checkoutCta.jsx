"use client";
import Container from "@/components/UI/Container/container";
import { useSearchParams } from "next/navigation";
import { GiConfirmed } from "react-icons/gi";
import Ripples from "react-ripples";
import { apiCall } from "@/lib/api";
import { useCartStore } from "@/lib/cartStore";
import { useAppStore } from "@/lib/store";
import { useMemo } from "react";

const CheckoutCTA = () => {
  const searchParams = useSearchParams();
  const { getUserInfo } = useAppStore();
  const user = getUserInfo();
  const cart = useCartStore((state) => state.cart);

  const items = useMemo(() => {
    return cart.map((item) => ({
      id: item.product.id,
      quantity: item.qt,
      store_id: item.product.store_id,
      price: item.product.price,
      endPrice: item.product.endPrice || item.product.price,
      options: JSON.parse(item.options || '[]'),
    }));
  }, [cart]);

  const order = {
    user_id: user.id,
    address: user.address,
    phone: user.phone,
    user_name: user.name,
    items: items,
    voucher_id: user.voucher_id,
    store_id: items.length > 0 ? items[0].store_id : null,
  };

 

  const handleOrderCreation = async () => {

    try {
      const response = await apiCall({
        pathname: `/client/order/create-order`,
        method: "POST",

        data: order,
      });
      if (response.ok) {
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div
      className="fixed z-10 w-full"
      style={{
        bottom: searchParams.get("from") === "home" ? 96 : 20,
      }}
    >
      <Container>
        <div
          className="active:scale-[0.96] transition-all shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
          style={{
            display: "inline-flex",
            borderRadius: 28,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Ripples className="!grid w-full">
            <button
              className="flex w-full items-center justify-center h-[56px] rounded-[28px] bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] p-6"
              onClick={handleOrderCreation}
            >
              <span className="ml-[8px] font-bold text-[18px]">
                تأكـــيد الطلب
              </span>
              <GiConfirmed className="text-[22px]" />
            </button>
          </Ripples>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutCTA;
