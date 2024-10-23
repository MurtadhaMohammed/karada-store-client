"use client";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/UI/Container/container";
import OrderCard from "../OrderCard/orderCard";
import { useAppStore } from "@/lib/store";
import { apiCall } from "@/lib/api";

const OrderList = ({ params }) => {
  const { getUserInfo } = useAppStore();
  const user = getUserInfo();


  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`orders-${user.id}`],
    queryFn: () =>
      apiCall({
        pathname: `/client/order/getOrdersByUserId/${user.id}`,
        method: "GET",
        cache: "no-store",
      }),
  });


  return (
    <div className="mt-[16px]">
      <Container>
        {orders?.orders?.filter(
          (el) =>
            el.order_status !== "Completed" && el.order_status !== "Canceled"
        )?.length !== 0 && (
          <div className="flex gap-4 items-center mb-[16px] text-[16px]">
            <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
            <div className="text-[#666]">الطلبات النشطة</div>
            <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
          </div>
        )}
        {orders?.orders
          ?.filter(
            (el) =>
              el.order_status !== "Completed" && el.order_status !== "Canceled"
          )
          ?.map((el, i) => (
            <OrderCard key={i} order={el} />
          ))}
        <div className="flex gap-4 items-center mb-[16px] text-[16px]">
          <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
          <div className="text-[#666]">الطلبات السابقة</div>
          <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
        </div>
        {orders?.orders
          ?.filter(
            (el) =>
              el.order_status === "Completed" || el.order_status === "Canceled"
          )
          ?.map((el, i) => (
            <OrderCard key={i} order={el} />
          ))}
      </Container>
    </div>
  );
};

export default OrderList;
