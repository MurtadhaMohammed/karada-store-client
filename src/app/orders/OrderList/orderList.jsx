"use client";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/UI/Container/container";
import OrderCard from "../OrderCard/orderCard";
import Empty from "@/components/Empty/empty";
import { AiOutlineTruck } from "react-icons/ai";
import { useAppStore } from "@/lib/store";
import { apiCall } from "@/lib/api";
import OrdersSkeleton from "../Skeleton/skeleton";
import { TbFaceIdError } from "react-icons/tb";

const OrderList = () => {
  const { userInfo } = useAppStore();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`orders-${userInfo?.id}`],
    queryFn: () =>
      apiCall({
        pathname: `/client/order/getOrdersByUserId/${userInfo?.id}`,
        method: "GET",
      }),
    enabled: !!userInfo?.id,
  });

  if (isLoading) return <OrdersSkeleton />;
  if (isError || error )
    return (
      <Empty
        icon={<TbFaceIdError className="text-[100px]" />}
        title="مشكلة بالاتصال"
        msg="يبدو انك تواجة مشكلة بالخادم!."
        href={"/"}
        top={14}
        //buttonText={"عودة للرئيسية"}
      />
    );
  if (Object.keys(userInfo).length === 0 || data?.orders?.length === undefined)
    return (
      <Empty
        icon={<AiOutlineTruck className="text-[100px]" />}
        title="لا توجد طلبات!."
        msg="ليش ماطالب شي لحد الان ؟"
        href={"/"}
        top={14}
        buttonText={"عودة للرئيسية"}
      />
    );

  return (
    <div className="mt-[16px]">
      <Container>
        {data?.orders?.filter(
          (el) =>
            el.order_status !== "Delivered" && el.order_status !== "Canceled"
        )?.length !== 0 && (
          <div className="flex gap-4 items-center mb-[16px] text-[16px]">
            <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
            <div className="text-[#666]">الطلبات النشطة</div>
            <span className="block h-[1px] flex-1 bg-[#f0f0f0]" />
          </div>
        )}
        {data?.orders
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
        {data?.orders
          ?.filter(
            (el) =>
              el.order_status === "Canceled" || el.order_status === "Completed"
          )
          ?.map((el, i) => (
            <OrderCard key={i} order={el} />
          ))}
      </Container>
    </div>
  );
};

export default OrderList;
