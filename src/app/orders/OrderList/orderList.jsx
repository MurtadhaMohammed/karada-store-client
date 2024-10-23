"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/UI/Container/container";
import OrderCard from "../OrderCard/orderCard";

const OrderList = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: [`orders-${params}`],
    queryFn: () =>
      apiCall({
        pathname: `/client/order/getOrdersByUserId/${params}`,
        method: "GET",
        cache: "no-store",
      }),
  });

  useEffect(() => {
    if (data) {
      setOrders(data.orders || []);
      console.log(data.orders, "orders");
      setLoading(false);
    }
    if (queryError) {
      setError("Failed to load related items.");
      setLoading(false);
    }
  }, [data, queryError]);

  return (
    <div className="mt-[16px]">
      <Container>
        {orders?.filter(
          (el) =>
            el.orderStatus !== "Completed" && el.orderStatus !== "Canceled"
        )?.length !== 0 && (
          <div className="flex gap-4 items-center mb-[16px] text-[16px]">
            <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
            <div className="text-[#666]">الطلبات النشطة</div>
            <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
          </div>
        )}
        {orders
          ?.filter(
            (el) =>
              el.orderStatus !== "Completed" && el.orderStatus !== "Canceled"
          )
          ?.map((el, i) => (
            <OrderCard key={i} order={el} />
          ))}
        <div className="flex gap-4 items-center mb-[16px] text-[16px]">
          <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
          <div className="text-[#666]">الطلبات السابقة</div>
          <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
        </div>
        {orders
          ?.filter(
            (el) =>
              el.orderStatus === "Completed" || el.orderStatus === "Canceled"
          )
          ?.map((el, i) => (
            <OrderCard key={i} order={el} />
          ))}
      </Container>
    </div>
  );
};

export default OrderList;
