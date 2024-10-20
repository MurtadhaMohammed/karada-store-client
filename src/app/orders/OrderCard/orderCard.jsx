import { IoMdTime } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";
import styles from "./style.module.css";

const ImageGroup = ({ images }) => {
  return (
    <div className="w-[100px] h-[100px]  relative ">
      {images?.length === 1 && (
        <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px]"></div>
      )}

      {images?.length === 2 && (
        <div className="relative h-full border border-[#eee] rounded-[8px] overflow-hidden">
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px]"></div>
          <div className=" absolute inset-0 bg-[#0000002e] flex items-center justify-center text-[#fff]">
            +1
          </div>
        </div>
      )}

      {images?.length === 3 && (
        <div
          className="relative h-full grid grid-cols-2 gap-1  overflow-hidden"
          style={{ direction: "ltr" }}
        >
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px]"></div>
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px]"></div>
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px]"></div>
        </div>
      )}
      {images?.length === 4 && (
        <div
          className="relative h-full grid grid-cols-2 gap-1  overflow-hidden"
          style={{ direction: "ltr" }}
        >
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px]"></div>
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px]"></div>
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px]"></div>
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px]"></div>
        </div>
      )}
      {images?.length > 4 && (
        <div
          className="relative h-full grid grid-cols-2 gap-1  overflow-hidden"
          style={{ direction: "ltr" }}
        >
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px]"></div>
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px]"></div>
          <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px]"></div>
          <div className="relative h-full rounded-[8px] overflow-hidden">
            <div className="bg-[#f6f6f6] border border-[#eee] w-[100%] h-[100%] rounded-[8px]"></div>
            <div className=" absolute inset-0 bg-[#0000002e] flex items-center justify-center text-[#fff]">
              +2
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OrderCard = ({ order }) => {
  const { orderStatus, images } = order || {};

  const statusTheme = {
    Pending: {
      color: "text-[#faad14]",
      text: "طلبك قيد الموافقة",
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
      text: "تم التسليم منذ 4 يوم",
    },
  };

  return (
    <div
      className={`border border-[#eee] rounded-[16px] overflow-hidden mt-[8px]  mb-[18px]`}
      style={{ boxShadow: "0px 5px 20px -10px #0000002b" }}
    >
      <div className="flex p-[16px]">
        <ImageGroup images={images} />
        <div className="mr-[12px] flex flex-col justify-evenly flex-1">
          <b className={`text-[18px] ${statusTheme[orderStatus]?.color}`}>
            {statusTheme[orderStatus]?.text}
          </b>
          <div className="flex items-center text-[14px] text-[#666]">
            <IoMdTime />
            <p className="mr-[4px]">2024/03/12 3:40 PM</p>
          </div>
          <div className="flex items-center text-[14px] text-[#666]">
            <HiOutlineLocationMarker />
            <p className="mr-[4px]">بغداد - شارع المريخ</p>
          </div>
          <div className="h-[4px] rounded-[24px] bg-[#eee]">
            <div
              className={`h-[4px] rounded-[24px] ${statusTheme[orderStatus]?.bar}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
