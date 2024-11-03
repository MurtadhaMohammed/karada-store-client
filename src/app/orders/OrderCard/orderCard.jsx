import { IoMdTime } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";
import styles from "./style.module.css";
import { IMAGE_URL } from "@/lib/api";
import Image from "next/image";

const ImageGroup = ({ thumbnails }) => {
  return (
    <div className="w-[100px] h-[100px]  relative ">
      {thumbnails?.length === 1 && (
        <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px] overflow-hidden relative">
          <Image
            src={`${IMAGE_URL}/${thumbnails[0]}`}
            fill
            style={{ objectFit: "cover" }} 
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
              className="relative"
            />
          </div>
          <div className=" absolute inset-0 bg-[#0000002e] flex items-center justify-center text-[#fff]">
            +1
          </div>
        </div>
      )}

      {thumbnails?.length === 3 && (
        <div
          className="relative h-full grid grid-cols-2 gap-1  overflow-hidden"
          style={{ direction: "ltr" }}
        >
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px] relative overflow-hidden">
            {" "}
            <Image
              src={`${IMAGE_URL}/${thumbnails[0]}`}
              fill
              style={{ objectFit: "cover" }} 
            />
          </div>
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px] relative overflow-hidden">
            <Image
              src={`${IMAGE_URL}/${thumbnails[0]}`}
              fill
              style={{ objectFit: "cover" }} 
            />
          </div>
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px] relative overflow-hidden">
            <Image
              src={`${IMAGE_URL}/${thumbnails[0]}`}
              fill
              style={{ objectFit: "cover" }} 
            />
          </div>
        </div>
      )}
      {thumbnails?.length === 4 && (
        <div
          className="relative h-full grid grid-cols-2 gap-1  overflow-hidden"
          style={{ direction: "ltr" }}
        >
          <div className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative overflow-hidden">
            <Image
              src={`${IMAGE_URL}/${thumbnails[0]}`}
              fill
              style={{ objectFit: "cover" }} 
            />
          </div>
          <div className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative overflow-hidden">
            <Image
              src={`${IMAGE_URL}/${thumbnails[0]}`}
              fill
              style={{ objectFit: "cover" }} 
            />
          </div>
          <div className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative overflow-hidden">
            <Image
              src={`${IMAGE_URL}/${thumbnails[0]}`}
              fill
              style={{ objectFit: "cover" }} 
            />
          </div>
          <div className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative overflow-hidden">
            <Image
              src={`${IMAGE_URL}/${thumbnails[0]}`}
              fill
              style={{ objectFit: "cover" }} 
            />
          </div>
        </div>
      )}
      {thumbnails?.length > 4 && (
        <div
          className="relative h-[100%] grid grid-cols-2 gap-1  overflow-hidden"
          style={{ direction: "ltr" }}
        >
          <div className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative">
            <Image
              src={`${IMAGE_URL}/${thumbnails[0]}`}
              fill
              style={{ objectFit: "cover" }} 
            />
          </div>
          <div className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative">
            <Image
              src={`${IMAGE_URL}/${thumbnails[0]}`}
              fill
              style={{ objectFit: "cover" }} 
            />
          </div>
          <div className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative">
            <Image
              src={`${IMAGE_URL}/${thumbnails[0]}`}
              fill
              style={{ objectFit: "cover" }} 
            />
          </div>
          <div className="relative h-full rounded-[8px] overflow-hidden">
            <div className="bg-[#f6f6f6] border border-[#eee] aspect-1 rounded-[8px] relative">
              <Image
                src={`${IMAGE_URL}/${thumbnails[0]}`}
                fill
                style={{ objectFit: "cover" }} 
              />
            </div>
            <div className=" absolute inset-0 bg-[#0000002e] flex items-center justify-center text-[#fff]">
              +2
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getDate = (order) => {
  const today = new Date();
  const updatedAt = new Date(order.updated_at);
  const diffTime = Math.abs(today - updatedAt);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let date;
  if (diffDays < 1) {
    date = "اليوم";
  } else if (diffDays === 1) {
    date = "منذ يوم";
  } else if (diffDays === 2) {
    date = "منذ يومين";
  } else {
    date = `منذ ${diffDays} ايام`;
  }
  return date;
};

const OrderCard = ({ order }) => {
  const { order_status } = order || {};

  const thumbnails = order?.items?.map((item) => item.thumbnail1);


  const address = order?.address;

  const date = getDate(order);

  const statusTheme = {
    Recived: {
      color: "text-[#faad14]",
      text: "طلبك قيد الموافقة",
      bar: `bg-gradient-to-r from-[#faad14] to-[#faca69] ${styles.statusBar30}`,
    },
    Pending: {
      color: "text-[#faad14]",
      text: "طلبك قيد ألانتظار",
      bar: `bg-gradient-to-r from-[#faad14] to-[#faca69] ${styles.statusBar30}`,
    },
    Canceled: {
      color: "text-[#ff4d4f]",
      bar: "bg-gradient-to-r from-[#ff4d4f] to-[#fb797b]",
      text: "تم الغاء طلبك",
    },
    Processing: {
      color: "text-[#52c41a]",
      border: "border-[#52c41a]",
      text: "طلبك قيد التجهيز",
      bar: `bg-gradient-to-r from-[#52c41a] to-[#8dee5e] ${styles.statusBar60}`,
    },
    Completed: {
      color: "text-[#000]",
      bg: "bg-gradient-to-r from-[#52c41a] to-[#8dee5e]",
      text: `تم توصيل طلبك ${date}`,
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
    <div
      className={`border border-[#eee] rounded-[16px] overflow-hidden mt-[8px]  mb-[18px]`}
      style={{ boxShadow: "0px 5px 20px -10px #0000002b" }}
    >
      <div className="flex p-[16px]">
        <ImageGroup thumbnails={thumbnails} />
        <div className="mr-[12px] flex flex-col justify-evenly flex-1">
          <b className={`text-[18px] ${statusTheme[order_status]?.color}`}>
            {statusTheme[order_status]?.text}
          </b>
          <div className="flex items-center text-[14px] text-[#666]">
            <IoMdTime />
            <p className="mr-[4px]">{formattedDate}</p>
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
    </div>
  );
};

export default OrderCard;
