"use client";
import React, { useEffect, useState } from "react";
import { IoMdTime } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { apiCall, IMAGE_URL } from "@/lib/api";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import styles from "./style.module.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import Container from "@/components/UI/Container/container";
import { useAppStore } from "@/lib/store";
import dayjs from "dayjs";
import OrdersDetailsSkeleton from "../Skeleton/skeleton";
import Link from "next/link";
import { BiCheck, BiCopy, BiSupport } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";
import ConfirmModal from "@/components/ConfirmModal/confirmModal";

const OrderDetails = ({ params }) => {
  const [discounts, setDiscounts] = useState([]);
  const [createdAt, setCreatedAt] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const { data: order, isLoading } = useQuery({
    queryKey: [`related-${params.id}`, params],
    queryFn: () =>
      apiCall({
        pathname: `/client/order/getOrdersById/${params.id}`,
        auth: true,
      }),
    enabled: !!params.id,
    select: (data) => data?.order,
  });

  useEffect(() => {
    if (!order?.id) return;
    setDiscounts(order?.discount);
    setCreatedAt(order?.created_at);
  }, [order]);

  const handleDiscount = (id) => {
    if (!id) return 1;

    const validDiscount = discounts.find((discount) => {
      const startDate = new Date(discount.start_at);
      const endDate = new Date(discount.end_at);
      const createdDate = new Date(createdAt);
      const isActive = discount.active;
      const isWithinRange = endDate > createdDate && startDate <= createdDate;
      return discount.id === id && isActive && isWithinRange;
    });
    const discountValue = validDiscount ? (100 - validDiscount.value) / 100 : 1;
    return discountValue;
  };

  const order_status = order?.order_status || "Created"; // Default status to prevent errors
  const address = order?.address || "غير متوفر";
  const formattedDate = order?.created_at
    ? new Date(order.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : "غير متوفر";

  const statusTheme = {
    Created: {
      color: "text-[#d3d3d3]",
      text: "طلبك قيد الموافقة",
      bar: `bg-gradient-to-r from-[#d3d3d3] to-[#e6e6e6] ${styles.statusBar20}`,
    },
    Accepted: {
      color: "text-blue-300",
      text: "تم قبول الطلب",
      bar: `bg-gradient-to-r from-blue-400 to-blue-300 ${styles.statusBar40}`,
    },
    Packaging: {
      color: "text-yellow-400",
      border: "border-yellow-300",
      text: "طلبك قيد التجهيز",
      bar: `bg-gradient-to-r from-yellow-400 to-yellow-300 ${styles.statusBar60}`,
    },
    Shipping: {
      color: "text-orange-400",
      border: "border-[#3ab54a]",
      text: "طلبك قيد الشحن",
      bar: `bg-gradient-to-r  from-orange-500 to-orange-400 ${styles.statusBar80}`,
    },
    Delivered: {
      color: "text-[#52c41a]",
      bg: "bg-gradient-to-r from-[#52c41a] to-[#8dee5e]",
      text: "تم توصيل الطلب",
      bar: `bg-gradient-to-r from-[#3ab54a] to-[#22b636] ${styles.statusBar100}`,
    },
    Completed: {
      color: "text-[#000]",
      text: (
        <div className="flex items-center gap-2">
          تم انهاء الطلب
          <FaCheck className="hidden sm:block w-6 h-6 text-violet-600" />
        </div>
      ),
      bar: "bg-[#F6F6F6]",
    },
    Canceled: {
      color: "text-[#ff4d4f]",
      bar: "bg-[#F6F6F6]",
      text: "تم الغاء طلبك",
    },
  };
  const { setPageTitle } = useAppStore();
  useEffect(() => {
    setPageTitle(`طلب رقم ${params.id}`);
  }, []);

  const copyToClipboard = (trackId) => {
    navigator.clipboard.writeText(trackId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) return <OrdersDetailsSkeleton />;
  return (
    <Container>
      <>
        <div
          className="border border-[#eee] rounded-[16px] overflow-hidden mt-[16px] mb-[18px] bg-white"
          style={{ boxShadow: "0px 5px 20px -10px #0000002b" }}
        >
          <div className={`flex ${styles.customeSize} p-[16px]`}>
            <div className="flex flex-col justify-evenly flex-1">
              <b
                className={`text-[18px] ${statusTheme[order_status]?.color} line-clamp-1`}
              >
                {statusTheme[order_status]?.text}
              </b>
              <div className="flex items-center text-[14px] text-[#666] mt-[6px]">
                <IoMdTime />
                <p className="mr-[4px] hidden sm:block">{formattedDate}</p>
                <p className="mr-[4px] block sm:hidden">
                  {dayjs(order?.create_at).format("YYYY-MM-DD")}
                </p>
              </div>
            </div>
            <div className="relative mx-[16px] py-6 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl border border-dashed border-[#fff]">
              {/* Left and Right circular cutouts (without dashed border) */}
              <div className="w-[30px] h-[30px] absolute -right-[20px] top-1/2 -translate-y-1/2 bg-white rounded-full"></div>
              <div className="w-[30px] h-[30px] absolute -left-[20px] top-1/2 -translate-y-1/2 bg-white rounded-full"></div>

              {/* Order details */}
              <div className="flex flex-col gap-4">
                {/* Order Number */}
                <div className="flex item-center justify-between border-b border-gray-400 pb-3">
                  <p className="text-sm text-gray-200">رقم الطلب</p>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <button
                      onClick={() => copyToClipboard(order?.track_id)}
                      className="cursor-pointer transition-all duration-300 flex items-center justify-center"
                    >
                      {copied ? (
                        <BiCheck className="text-white w-6 h-6 transition-colors duration-300" />
                      ) : (
                        <BiCopy className="hover:text-gray-300 transition-colors duration-300" />
                      )}
                    </button>
                    <span className="block -mt-[4px]">{order?.track_id}</span>
                  </div>
                </div>

                {/* Order Date */}
                <div className="flex item-center justify-between border-b border-gray-400 pb-3">
                  <p className="text-sm text-gray-200">تاريخ الطلب</p>
                  <p className="text-sm">
                    {dayjs(order?.created_at).format("YYYY-MM-DD hh:mm A")}
                  </p>
                </div>

                {/* Full Address */}
                <div className="flex item-center justify-between">
                  <p className="text-sm text-gray-200">العنوان الكامل</p>
                  <p className="text-sm">{address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-[16px] border-t border-[#eee] ">
            {order?.items.map((item, i) => {
              const displayPrice = item.l1?.price || item.price;
              const shouldStrikeThrough =
                displayPrice >
                displayPrice * handleDiscount(item?.discount_id || null);
              return (
                <div
                  key={i}
                  className="flex items-center justify-between w-full gap-4 mb-4 border border-[#eee] p-3 rounded-lg"
                >
                  <div className="flex items-center gap-4 w-full">
                    {/* Image */}
                    <Image
                      src={`${IMAGE_URL}/${item.thumbnail1}`}
                      width={40}
                      height={40}
                      alt="thumbnail"
                      className="rounded-lg shrink-0"
                    />

                    <div className="flex flex-col w-full overflow-hidden">
                      <p className="text-sm font-bold truncate max-w-[160px]">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-[160px]">
                        {item.shortDescription}
                      </p>
                    </div>

                    <div className="text-sm font-bold shrink-0">
                      {shouldStrikeThrough ? (
                        <div className="flex flex-col items-end">
                          <p className="line-through text-gray-400">
                            {Number(displayPrice).toLocaleString("en")} د.ع
                          </p>
                          <p className="text-[15px]">
                            {item.qt} ×{" "}
                            {Number(
                              displayPrice *
                                handleDiscount(item?.discount_id || null)
                            ).toLocaleString("en")}{" "}
                            د.ع
                          </p>
                        </div>
                      ) : (
                        <p>
                          {item.qt} × {Number(item.price).toLocaleString("en")}{" "}
                          د.ع
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex items-center justify-between flex-col w-full gap-4  border border-[#eee] p-5 rounded-lg">
              <div className="flex items-center justify-between w-full">
                <p>الملاحظات : </p>
                {!order?.note || order?.note === "" ? (
                  <p className="font-normal text-[#a5a5a5]">لا يوجد ملاحظات</p>
                ) : (
                  <b className="text-[16px]">{order?.note}</b>
                )}
              </div>
              <div className="w-[100%] h-[1px] bg-[#eee]" />
              <div className="flex items-center justify-between w-full">
                <p>سعر التوصيل : </p>
                <b className="text-[16px]">
                  {Number(order?.delivery_cost || 0).toLocaleString("en")} د.ع
                </b>
              </div>
              <div className="w-[100%] h-[1px] bg-[#eee]" />
              <div className="flex items-center justify-between w-full">
                <p>مجموع الطلب : </p>
                <b className="text-[16px]">
                  {Number(
                    order?.total_price + order?.delivery_cost || 0
                  ).toLocaleString("en")}{" "}
                  د.ع
                </b>
              </div>
            </div>

            <Link
              href={"/contactUs"}
              className="flex items-center justify-center w-full gap-4 border border-violet-600 p-4 pl-5 pr-5 shadow-sm rounded-[12px] mt-[16px] active:opacity-45 transition-all"
            >
              <span className="text-violet-600 font-bold">تواصل مع الدعم</span>
              <BiSupport className="text-violet-600 text-[22px]" />
            </Link>
            {order_status !== "Canceled" && order_status === "Created" && (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="cursor-pointer flex items-center justify-center w-full gap-4 border border-red-600 p-4 pl-5 pr-5 shadow-sm rounded-[12px] mt-[16px] active:opacity-45 transition-all"
              >
                <span className="text-red-600 font-bold">الغاء الطلب</span>
                <FcCancel className="text-red-600 text-[22px]" />
              </button>
            )}
          </div>
        </div>
        <ConfirmModal
          isOpen={showCancelConfirm}
          onClose={() => setShowCancelConfirm(false)}
          orderId={order?.id}
        />
      </>
    </Container>
  );
};

export default OrderDetails;
