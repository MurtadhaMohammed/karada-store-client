"use client";
import React, { useEffect, useMemo, useState } from "react";
import { apiCall, IMAGE_URL } from "@/lib/api";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/UI/Container/container";
import { useAppStore } from "@/lib/store";
import dayjs from "dayjs";
import OrdersDetailsSkeleton from "../Skeleton/skeleton";
import Link from "next/link";
import { BiCopy, BiCheck, BiSupport } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";
import RelatedList from "../RelatedList/relatedList";
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
  const copyToClipboard = (trackId) => {
    navigator.clipboard.writeText(trackId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!order?.id) return;
    setDiscounts(order?.discount);
    setCreatedAt(order?.created_at);
  }, [order]);

  const productId = useMemo(() => {
    if (order && order.items && order.items.length > 0) {
      const randomIndex = Math.floor(Math.random() * order.items.length);
      return order.items[randomIndex]?.id;
    }
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

  const statusTheme = {
    Created: {
      color: "text-[#a5a5a5] bg-[#f6f6f6] border border-[#a5a5a5]",
      text: "قيد الموافقة",
    },
    Accepted: {
      color: "text-blue-600 bg-blue-100 border border-blue-600",
      text: "تم قبول الطلب",
    },
    Packaging: {
      color: "text-yellow-600  border border-yellow-400  bg-yellow-100",
      text: "طلبك قيد التجهيز",
    },
    Shipping: {
      color: "text-orange-500 bg-orange-100 border border-orange-500",
      text: "طلبك قيد الشحن",
    },
    Delivered: {
      color: "text-[#22b636] bg-green-100 border border-[#22b636] ",
      text: "تم توصيل الطلب",
    },
    Completed: {
      color: "text-[#22b636] bg-green-100 border border-[#22b636] ",
      text: "الطلب مكتمل",
    },
    Canceled: {
      color: "text-[#ff4d4f] bg-red-100 border border-[#ff4d4f]",
      text: "تم الغاء طلبك",
    },
  };
  const { setPageTitle } = useAppStore();

  useEffect(() => {
    setPageTitle("تفاصيل الطلب");
  }, []);

  const totalBeforeDiscount = () => {
    if (order && order.items && order.items.length > 0) {
      const total = order.items.reduce(
        (acc, item) => acc + item?.l1?.price * item.qt || item.price * item.qt,
        0
      );
      return total;
    }
  };

  if (isLoading) return <OrdersDetailsSkeleton />;
  return (
    <div>
      <Container>
        <>
          <div
            className="border border-[#eee] rounded-[16px] overflow-hidden mt-[16px] mb-[18px] bg-white"
            style={{ boxShadow: "0px 5px 20px -10px #0000002b" }}
          >
            <div className="flex item-center justify-between p-[16px] ">
              <p>حالة الطلب</p>
              <div
                className={`px-3 py-1 rounded-lg bg-[#f6f6f6] ${statusTheme[order_status]?.color}`}
              >
                {statusTheme[order_status]?.text}
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

            <div className="p-[16px]">
              {order?.items?.map((item, i) => {
                const displayPrice =
                  item?.endPrice || item.l1?.price || item.price;
                const shouldStrikeThrough =
                  displayPrice >
                  displayPrice * handleDiscount(item?.discount_id || null);
                return (
                  <div
                    key={i}
                    className="flex item-center justify-between w-full gap-4 mb-4 border border-[#eee] p-3 rounded-lg"
                  >
                    <div className="flex item-center gap-4 w-full">
                      {/* Image */}
                      <Image
                        src={`${IMAGE_URL}/${item.thumbnail1}`}
                        width={40}
                        height={40}
                        alt="thumbnail"
                        className="rounded-lg shrink-0"
                      />

                      {/* Text Container */}
                      <div className="flex flex-col w-full overflow-hidden">
                        <p className="text-sm font-bold truncate max-w-[160px]">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-[160px]">
                          {item.shortDescription}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-sm font-bold flex flex-col items-center justify-center shrink-0">
                        {item?.endPrice && item?.endPrice < item?.price ? (
                          <div className="flex flex-col item-end">
                            <p className="line-through text-gray-400">
                              {Number(item?.price).toLocaleString("en")} د.ع
                            </p>
                            <p className="text-[15px]">
                              {item?.qt > 1 && `${item?.qt} * `}{" "}
                              {Number(item?.endPrice * item?.qt).toLocaleString(
                                "en"
                              )}{" "}
                              د.ع
                            </p>
                          </div>
                        ) : (
                          <div className="flex item-center justify-center">
                            <p className="text-center">
                              {item?.qt > 1 && `${item?.qt} * `}{" "}
                              {Number(item.price).toLocaleString("en")} د.ع
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="flex item-center justify-between flex-col w-full gap-4  border border-[#eee] p-5 rounded-lg">
                <div className="flex item-center justify-between w-full">
                  <p>الملاحظات : </p>
                  {!order?.note || order?.note === "" ? (
                    <p className="font-normal text-[#a5a5a5]">
                      لا يوجد ملاحظات
                    </p>
                  ) : (
                    <b className="text-[16px]">{order?.note}</b>
                  )}
                </div>
                {order.voucher && (
                  <>
                    <div className="w-[100%] h-[1px] bg-[#eee]" />
                    <div className="flex item-center justify-between w-full">
                      <p>كود الخصم : </p>
                      <b className="monospace text-[16px]">
                        {order?.voucher.code}
                      </b>
                    </div>
                  </>
                )}
                {totalBeforeDiscount() !== order?.total_price && (
                  <>
                    <div className="w-[100%] h-[1px] bg-[#eee]" />
                    <div className="flex item-center justify-between w-full">
                      <p>مجموع الخصم : </p>
                      <b className="text-[16px]">
                        {Number(
                          totalBeforeDiscount() - order?.total_price
                        ).toLocaleString("en")}{" "}
                        د.ع
                      </b>
                    </div>
                  </>
                )}
                <div className="w-[100%] h-[1px] bg-[#eee]" />
                <div className="flex item-center justify-between w-full">
                  <p>سعر التوصيل : </p>
                  <b className="text-[16px]">
                    {Number(order?.delivery_cost || 0).toLocaleString("en")} د.ع
                  </b>
                </div>
                <div className="w-[100%] h-[1px] bg-[#eee]" />
                <div className="flex item-center justify-between w-full">
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
                className="flex items-center justify-center w-full gap-4 border border-violet-600 p-3 shadow-sm rounded-[12px] mt-[16px] active:opacity-45 transition-all"
              >
                <span className="text-violet-600 font-bold">
                  تواصل مع الدعم
                </span>
                <BiSupport className="text-violet-600 text-[22px]" />
              </Link>
              {order_status !== "Canceled" && order_status === "Created" && (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="cursor-pointer flex items-center justify-center w-full gap-4 border border-red-600 p-3 pl-5 pr-5 shadow-sm rounded-[12px] mt-[16px] active:opacity-45 transition-all"
              >
                <span className="text-red-600 font-bold">الغاء الطلب</span>
                <FcCancel className="text-red-600 text-[22px]" />
              </button>
            )}
              {/* <div
                onClick={() => openModal("cancelationModal")}
                className="cursor-pointer flex items-center justify-center w-full gap-4 border border-red-600 p-3 shadow-sm rounded-[12px] mt-[16px] active:opacity-45 transition-all"
              >
                <span className="text-red-600 font-bold">الغاء الطلب</span>
                <FcCancel className="text-red-600 text-[22px]" />
              </div> */}
            </div>
          </div>

          <ConfirmModal
            isOpen={showCancelConfirm}
            onClose={() => setShowCancelConfirm(false)}
            orderId={order?.id}
          />
        </>
      </Container>
      {/* <RelatedList productId={productId} /> */}
    </div>
  );
};

export default OrderDetails;
