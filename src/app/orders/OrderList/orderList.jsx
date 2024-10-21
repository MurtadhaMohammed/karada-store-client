"use client";
import Container from "@/components/UI/Container/container";
import OrderCard from "../OrderCard/orderCard";

const orders = [
  {
    id: 1,
    orderStatus: "Pending",
    images: [""],
  },
  {
    id: 2,
    orderStatus: "Processing",
    images: ["", "", "", "", ""],
  },
  {
    id: 4,
    orderStatus: "Canceled",
    images: ["", "", ""],
  },
  {
    id: 5,
    orderStatus: "Completed",
    images: [""],
  },
];

const OrderList = () => {
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
