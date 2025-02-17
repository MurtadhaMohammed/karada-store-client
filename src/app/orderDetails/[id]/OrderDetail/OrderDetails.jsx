"use client";
import React, { useEffect, useState } from "react";
import { IoMdTime } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { apiCall, IMAGE_URL } from "@/lib/api";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { HiChevronDown } from "react-icons/hi2";
import styles from "./style.module.css";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/UI/Container/container";
import { useAppStore } from "@/lib/store";
import { GoChevronLeft } from "react-icons/go";
import dayjs from "dayjs";

const ImageGroup = ({ thumbnails }) => {
  return (
    <div className={`w-[100px] h-[100px] relative`}>
      {thumbnails?.length === 1 && (
        <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px] overflow-hidden relative">
          <Image
            src={`${IMAGE_URL}/${thumbnails[0]}`}
            fill
            style={{ objectFit: "cover" }}
            alt="Thumbnail"
          />
        </div>
      )}

      {thumbnails?.length === 2 && (
        <div className="relative h-full border border-[#eee] rounded-[8px] overflow-hidden">
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px] relative">
            <Image
              src={`${IMAGE_URL}/${thumbnails[0]}`}
              fill
              style={{ objectFit: "cover" }}
              alt="Thumbnail 1"
              className="relative"
            />
          </div>
          <div className="absolute inset-0 bg-[#0000002e] flex items-center justify-center text-[#fff]">
            +1
          </div>
        </div>
      )}

      {thumbnails?.length === 3 && (
        <div
          className="relative h-full grid grid-cols-2 gap-1 overflow-hidden"
          style={{ direction: "ltr" }}
        >
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px] relative overflow-hidden">
            <Image
              src={`${IMAGE_URL}/${thumbnails[0]}`}
              fill
              style={{ objectFit: "cover" }}
              alt="Thumbnail 1"
            />
          </div>
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px] relative overflow-hidden">
            <Image
              src={`${IMAGE_URL}/${thumbnails[1]}`}
              fill
              style={{ objectFit: "cover" }}
              alt="Thumbnail 2"
            />
          </div>
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px] relative overflow-hidden">
            <Image
              src={`${IMAGE_URL}/${thumbnails[2]}`}
              fill
              style={{ objectFit: "cover" }}
              alt="Thumbnail 3"
            />
          </div>
        </div>
      )}

      {thumbnails?.length === 4 && (
        <div
          className="relative h-full grid grid-cols-2 gap-1 overflow-hidden"
          style={{ direction: "ltr" }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative overflow-hidden"
            >
              <Image
                src={`${IMAGE_URL}/${thumbnails[i]}`}
                fill
                style={{ objectFit: "cover" }}
                alt={`Thumbnail ${i + 1}`}
              />
            </div>
          ))}
        </div>
      )}

      {thumbnails?.length > 4 && (
        <div
          className="relative h-[100%] grid grid-cols-2 gap-1 overflow-hidden"
          style={{ direction: "ltr" }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative"
            >
              <Image
                src={`${IMAGE_URL}/${thumbnails[i]}`}
                fill
                style={{ objectFit: "cover" }}
                alt={`Thumbnail ${i + 1}`}
              />
            </div>
          ))}
          <div className="relative h-full rounded-[8px] overflow-hidden">
            <div className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative">
              <Image
                src={`${IMAGE_URL}/${thumbnails[3]}`}
                fill
                style={{ objectFit: "cover" }}
                alt="Thumbnail 4"
              />
            </div>
            <div className="absolute inset-0 bg-[#0000002e] flex items-center justify-center text-[#fff]">
              +{thumbnails.length - 3}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OrderDetails = ({ params }) => {
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

  const order_status = order?.order_status || "Created"; // Default status to prevent errors
  const thumbnails = order?.items?.map((item) => item.thumbnail1) || [];
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
  return (
    <Container>
      {isLoading ? (
        <div
          className="border border-[#eee] rounded-[16px] overflow-hidden mt-[8px] mb-[18px]"
          style={{ boxShadow: "0px 5px 20px -10px #0000002b" }}
        >
          <div className="flex p-[16px]">
            <div className="w-[100px] h-[100px] bg-gray-300 rounded-[8px] animate-pulse"></div>
            <div className="mr-[12px] flex flex-col justify-evenly flex-1">
              <p className="w-[140px] h-2 bg-gray-300 rounded-[8px] animate-pulse"></p>

              <div className="flex items-center text-[14px] gap-2 text-[#666]">
                <IoMdTime />
                <p className="w-14 h-2 bg-gray-300 rounded-[8px] animate-pulse"></p>
              </div>
              <div className="flex items-center text-[14px] gap-2 text-[#666]">
                <HiOutlineLocationMarker />
                <p className="w-14 h-2 bg-gray-300 rounded-[8px] animate-pulse"></p>
              </div>
              <div className="h-[4px] rounded-[24px] bg-[#eee]"></div>
            </div>
            <div>
              <button className=" px-[8px] py-[4px] text-[14px] flex items-center">
                <span className="flex items-center gap-2 font-bold">
                  <p className="hidden sm:block">تفاصيل الطلب</p>
                </span>
              </button>
            </div>
          </div>

          <div className="p-[16px] border-t border-[#eee]">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-[20px] text-[#666]">المنتجات:</div>

                <div className="flex items-center gap-4 mt-[8px]">
                  <div className="w-14 h-14 bg-gray-300 rounded-[8px] animate-pulse"></div>
                  <div className="flex flex-col justify-between items-start">
                    <p className="w-[100px] h-2 bg-gray-300 rounded-[8px] mt-1 animate-pulse"></p>{" "}
                    <p className="w-14 h-2 bg-gray-300 rounded-[8px] mt-1 animate-pulse"></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-[16px]">
              <p>مجموع الطلب:</p>
              <p className="w-14 h-2 bg-gray-300 rounded-[8px] animate-pulse"></p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="border border-[#eee] rounded-[16px] overflow-hidden mt-[8px] mb-[18px]"
            style={{ boxShadow: "0px 5px 20px -10px #0000002b" }}
          >
            <div className={`flex ${styles.customeSize} p-[16px]`}>
              <ImageGroup thumbnails={thumbnails} />
              <div className="mr-[12px] flex flex-col justify-evenly flex-1">
                <b
                  className={`text-[18px] ${statusTheme[order_status]?.color} line-clamp-1`}
                >
                  {statusTheme[order_status]?.text}
                </b>
                <div className="flex items-center text-[14px] text-[#666]">
                  <IoMdTime />
                  <p className="mr-[4px] hidden sm:block">{formattedDate}</p>
                  <p className="mr-[4px] block sm:hidden">
                    {dayjs(order.create_at).format("YYYY-MM-DD")}
                  </p>
                </div>
                <div className="flex items-center text-[14px] text-[#666]">
                  <HiOutlineLocationMarker />
                  <p className="mr-[4px]">{address}</p>
                </div>
                <div className="h-[4px] rounded-[24px] bg-[#eee]">
                  <div
                    className={`h-[4px] rounded-[24px] ${statusTheme[order_status]?.bar}`}
                  ></div>
                </div>
              </div>
            </div>
            <div className="p-[16px] border-t border-[#eee]">
              <div className="flex items-center w-full gap-4">
                <div>
                  <div className="text-[20px] text-[#666]">المنتجات:</div>
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between w-full gap-4 mt-[8px]"
                    >
                      <div className="flex items-start justify-start gap-4">
                        <Image
                          src={`${IMAGE_URL}/${item.thumbnail1}`}
                          width={60}
                          height={60}
                          alt="thumbnail"
                          className="rounded-[8px]"
                        />
                        <div className="flex flex-col justify-start items-start">
                          <p className="text-[14px] font-bold">{item.name}</p>
                          <div className="text-[14px] text-[#666] flex items-center gap-2">
                            <span className="text-black">
                              {Number(item.price).toLocaleString("en")} IQD
                            </span>
                            <span>-</span>
                            <span className="text-black">x{item.qt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-[16px]">
                <p>مجموع الطلب:</p>
                <p>
                  {Number(order?.total_price || 0).toLocaleString("en")} IQD
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default OrderDetails;
