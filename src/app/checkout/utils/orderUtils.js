import { apiCall, URL } from "@/lib/api";

export const processPendingOrder = async (user, clearCart) => {
  try {
    const pendingOrderStr = localStorage.getItem("pending_order");
    if (!pendingOrderStr) {
      console.log("No pending order found in localStorage");
      return null;
    }

    const pendingOrderData = JSON.parse(pendingOrderStr);
    console.log("Processing pendingOrderData:", pendingOrderData);

    if (!pendingOrderData.order) {
      console.error("Invalid order data structure:", pendingOrderData);
      return { status: "error", message: "Invalid order data" };
    }

    // Update user info in the order
    pendingOrderData.order.user_id = user.id;

    // Create the order directly
    const response = await apiCall({
      pathname: `/client/order/create-order`,
      method: "POST",
      data: {
        user_id: pendingOrderData.order.user_id,
        user_name: pendingOrderData.order.user_name,
        phone: pendingOrderData.order.phone,
        address: pendingOrderData.order.address,
        items: pendingOrderData.order.items,
        voucher_id: pendingOrderData.order.voucher_id,
        store_id: 1,
        order_type: pendingOrderData.order.order_type,
        installmentId: pendingOrderData.order?.installmentId || pendingOrderData.installmentId,
        platform: pendingOrderData.order?.platform || pendingOrderData.platform,
        delivery_cost: pendingOrderData.delivery_cost,
        note: pendingOrderData.order?.note || pendingOrderData.note,
      },
    });

    // Clear the pending order from storage
    localStorage.removeItem("pending_order");

    if (response?.order && clearCart) {
      clearCart();
    }

    return response;
  } catch (error) {
    console.error("Error processing pending order:", error);
    return { status: "error", message: "Failed to process pending order" };
  }
};

export const createOrder = async ({
  order,
  isLogin,
  setIsOtp,
  setOtp,
  clearCart,
  router,
  installmentId,
  platform,
  delivery_cost,
  note,
  setErrorMessage,
}) => {
  console.log("order", order);

  try {
    // Check if user is logged in first
    if (!isLogin) {
      console.log("User not logged in. Redirecting to login...");

      // Create order data object
      const orderData = {
        order,
        installmentId,
        platform,
        delivery_cost,
        note
      };

      // Save to localStorage and also pass as URL parameter
      localStorage.setItem("pending_order", JSON.stringify(orderData));      // Encode the order data for URL parameter
      const encodedOrderData = encodeURIComponent(JSON.stringify(orderData));
      setIsOtp(false); // Reset to initial state
      setOtp("");

      // Pass both phone and orderData in URL parameters
      console.log("Redirecting to login with order data and phone:", order.phone);
      router.replace(`/login?phone=${order.phone}&orderData=${encodedOrderData}`);
      return {
        status: "redirect_to_login",
        message: "Please login first to complete your order."
      };
    }

    // User is logged in, proceed with order creation
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
        installmentId: order?.installmentId || installmentId,
        platform: order?.platform || platform,
        delivery_cost,
        note: order?.note || note,
      },
    });

    if (response?.order) {
      clearCart();
      return response;
    } else {
      if (setErrorMessage) {
        setErrorMessage("حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة مرة أخرى.");
      }
      return {
        status: "error",
        message: "Failed to create order."
      };
    }
  } catch (error) {
    console.error("Error creating order:", error);
    if (setErrorMessage) {
      setErrorMessage("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
    }
    return {
      status: "error",
      message: "An unexpected error occurred."
    };
  }
};
