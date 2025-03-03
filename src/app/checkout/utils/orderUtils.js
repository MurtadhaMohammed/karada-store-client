import { apiCall } from "@/lib/api";

export const createOrder = async (order, isLogin, setIsOtp, setOtp, clearCart, router,installmentId, platform) => {
  try {
    const response = await apiCall({
      pathname: `/client/order/create-order`,
      method: "POST",
      data: {
        user_id: order.user_id,
        user_name: order.user_name,
        phone: order.phone,
        address: order.address,
        items: order.items,
        voucher_id: order.voucher_id,
        store_id: 1,
        order_type: order.order_type,
        installmentId: installmentId,
        platform: platform,
      },
    });
    if (response) {
      clearCart();
      if (response?.status=="Not Logged In" && !isLogin) {
        setIsOtp(true);
        setOtp('');
        router.replace("/login?phone="+order.phone);
      } else {
        router.replace("/orders");
      }
    }
  } catch (error) {
    console.error("Error creating order:", error);
  }
};
