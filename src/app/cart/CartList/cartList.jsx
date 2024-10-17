"use client";
import Container from "@/components/UI/Container/container";
import IconButton from "@/components/UI/IconButton/iconButton";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import CartCTA from "../CartCTA/cartCta";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const defaultList = [
  {
    name: "Power Supply",
    description: "Deepcool DA700 700W Power Supply",
    store: "كرادة ستور",
    price: 305000,
    image: "/images/1.png",
    option: {
      name: "Green, 512 GB",
    },
    qt: 3,
  },
  {
    name: "ريلمي G13",
    description: "ريلمي 13 برو بلس 5G - دبل سيم - 256/8 كيكابايت - اخضر",
    store: "كرادة ستور",
    price: 145000,
    image: "/images/2.png",
    option: {
      name: "Green, 512 GB",
    },
    qt: 2,
  },
  {
    name: "ريلمي G13",
    description: "ريلمي 13 برو بلس 5G - دبل سيم - 256/8 كيكابايت - اخضر",
    store: "كرادة ستور",
    price: 145000,
    image: "/images/4.png",
    option: {
      name: "Green, 512 GB",
    },
    qt: 1,
  },
];

const QtButton = ({ value }) => {
  return (
    <div className="flex items-center bg-[#f6f6f6] rounded-[8px] border border-[#eee]">
      <IconButton
        className="p-[6px] w-[32px] h-[32px] flex items-center justify-center"
        icon={<FiPlus className="text-[20px]" />}
      />
      <p className="pl-[6px] pr-[6px] mt-1">{value}</p>
      {value === 1 ? (
        <IconButton
          className="p-[6px] w-[32px] h-[32px] flex items-center justify-center"
          icon={<BsTrash className="text-[16px] text-[#ff0000]" />}
        />
      ) : (
        <IconButton
          className="p-[6px] w-[32px] h-[32px] flex items-center justify-center"
          icon={<FiMinus className="text-[20px]" />}
        />
      )}
    </div>
  );
};

const CartItem = ({ item }) => {
  return (
    <div className="border-b border-b-[#eee] pt-[24px] pb-[16px]">
      <Container>
        <div className="flex gap-4">
          <Image
            src={item?.image}
            width={80}
            height={80}
            className="border border-[#eee] rounded-[8px]"
            alt="image"
          />
          <div className=" flex-1 flex flex-col justify-between items-start">
            <div>
              <b className="text-[14px] whitespace-nowrap overflow-hidden text-ellipsis">
                {item?.name}
              </b>
              <p className="text-[14px] text-[#a5a5a5]">{item?.option?.name}</p>
            </div>
            <div className="flex items-end justify-between w-full">
              <b className="text-[16px]">
                {Number(item?.price).toLocaleString("en")}{" "}
                <span className="text-[14px]">IQD</span>
              </b>

              <QtButton value={item?.qt} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const CartList = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/checkout");
  }, [router]);

  return (
    <div className="mb-[16px]">
      {defaultList?.map((el, i) => (
        <CartItem key={i} item={el} />
      ))}
      <CartCTA />
    </div>
  );
};

export default CartList;
