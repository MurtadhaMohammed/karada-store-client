import { IoMdTime } from "react-icons/io";
import { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import styles from "./style.module.css";
import { IMAGE_URL } from "@/lib/api";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { useAppStore } from "@/lib/store";
import Link from "next/link";
import { GoChevronLeft } from "react-icons/go";
import dayjs from "dayjs";

const ImageGroup = ({ thumbnails }) => {
  return (
    <div className="w-[100px] h-[100px] relative">
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

// const getDate = (order) => {
//   const today = new Date();
//   const updatedAt = new Date(order.updated_at);
//   const diffTime = today - updatedAt;
//   const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//   if (diffDays < 1) {
//     if (diffHours < 1) {
//       // const diffMinutes = Math.floor(diffTime / (1000 * 60));
//       return `الان`;
//     } else {
//       return `منذ ${diffHours} ساعة`;
//     }
//   } else if (diffDays === 1) {
//     return "منذ يوم";
//   } else if (diffDays === 2) {
//     return "منذ يومين";
//   } else {
//     return `منذ ${diffDays} ايام`;
//   }
// };

const OrderCard = ({ order }) => {
  const { order_status } = order || {};

  const thumbnails = order?.items?.map((item) => item.thumbnail1);

  const itemNames = order?.items?.map((item) => item.name).join(", ");

  const address = order?.address;

  // const date = getDate(order);

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
      bar: `bg-gradient-to-r  from-[#3ab54a] to-[#22b636] ${styles.statusBar100}`,
    },
    Completed: {
      color: "text-[#000]",
      bg: "",
      text: (
        <div className="flex items-center gap-4">
          تم انهاء الطلب{" "}
          <FaCheck className="hidden sm:block w-6 h-6 text-violet-600" />
        </div>
      ),
      bar: `bg-[#F6F6F6]`,
    },
    Canceled: {
      color: "text-[#ff4d4f]",
      bar: "bg-[#F6F6F6]",
      text: "تم الغاء طلبك",
    },
  };
  const formattedDate = new Date(order.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <Link
      className={`block border border-[#eee] rounded-[16px] overflow-hidden mt-[8px]  mb-[18px] bg-white active:opacity-45 transition-all`}
      style={{ boxShadow: "0px 5px 20px -10px #0000002b" }}
      href={`/orderDetails/${order?.id}`}
    >
      <div className="flex p-[16px]">
        <ImageGroup thumbnails={thumbnails} />
        {/* <img
          src="https://media.tenor.com/sbfBfp3FeY8AAAAj/oia-uia.gif"
          className="w-[100px] h-[100px]"
          alt=""
        /> */}
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
        <div>
          {/* <button className="bg-[#f6f6f6] px-[8px] py-[4px] text-[14px] flex items-center">
            <span className="flex items-center gap-2 font-bold">
              <Link href={`/orderDetails/${order.id}`}>
                <p className="hidden sm:block">تفاصيل الطلب</p>
                <GoChevronLeft className="block sm:hidden w-6 h-6" />
              </Link>
            </span>
          </button> */}
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
