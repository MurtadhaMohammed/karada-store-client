import { apiCall } from "@/lib/api";

export const createOrder = async (order, isLogin, setIsOtp, setOtp, clearCart, router) => {
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
      },
    });
    if (response) {
      if (response.otp) {
        setIsOtp(true);
        setOtp(parseInt(response?.otp));
      }
      clearCart();
      if (response.otp && !isLogin) {
        router.replace("/login");
      } else {
        router.replace("/orders");
      }
    }
  } catch (error) {
    console.error("Error creating order:", error);
  }
};
