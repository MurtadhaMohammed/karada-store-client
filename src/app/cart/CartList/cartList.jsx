"use client";
import Container from "@/components/UI/Container/container";
import IconButton from "@/components/UI/IconButton/iconButton";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import CartCTA from "../CartCTA/cartCta";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { IMAGE_URL } from "@/lib/api";
import RelatedList from "../RelatedList/relatedList";
// import InstallmentBanner from "@/components/InstallmentBanner/installmentBanner";
import Empty from "@/components/Empty/empty";
import { TbShoppingCartExclamation } from "react-icons/tb";

const QtButton = ({ value, product }) => {
  const { increase, decrease, removeItem } = useCartStore();

  return (
    <div className="flex items-center bg-[#f6f6f6] rounded-[8px] border border-[#eee]">
      <IconButton
        className="p-[6px] w-[32px] h-[32px] flex items-center justify-center"
        icon={<FiPlus className="text-[20px]" />}
        onClick={() => increase(product)}
      />
      <p className="pl-[6px] pr-[6px]">{value}</p>
      {value === 1 ? (
        <IconButton
          onClick={() => removeItem(product)}
          className="p-[6px] w-[32px] h-[32px] flex items-center justify-center"
          icon={<BsTrash className="text-[16px] text-[#ff0000]" />}
        />
      ) : (
        <IconButton
          className="p-[6px] w-[32px] h-[32px] flex items-center justify-center"
          icon={<FiMinus className="text-[20px]" />}
          onClick={() => decrease(product)}
        />
      )}
    </div>
  );
};

const CartItem = ({ item }) => {
  const loadImageUrl = () => {
    let image = item?.product?.thumbnail1;
    if (item?.product?.l1?.uuid) image = item?.product?.l1?.images[0];
    return image;
  };

  const displayPrice = item?.product?.l1
    ? item?.product?.l1?.price
    : item?.product?.price;

  return (
    <div className="border-b border-b-[#eee] pt-[24px] pb-[16px] bg-white">
      <Container>
        <div className="flex gap-4">
          <Image
            src={`${IMAGE_URL}/${loadImageUrl()}`}
            width={80}
            height={80}
            style={{ objectFit: "cover" }}
            className="border border-[#eee] rounded-[8px]"
            alt="image"
          />
          <div className="flex-1 flex flex-col justify-between items-start">
            <div>
              <b className="text-[14px] whitespace-nowrap overflow-hidden text-ellipsis">
                {item?.product?.name}
              </b>
              <p className="text-[14px] text-[#a5a5a5]">
                {item?.product?.l1?.name ||
                  `${item?.product?.shortDescription.substr(0, 20)}...`}
              </p>
            </div>
            <div className="flex items-end justify-between w-full">
              {item?.product?.endPrice !== item.product.price ? (
                <div className="flex flex-col items-start">
                  <p className="text-[14px] block line-through text-[#a5a5a5]">
                    {Number(item.product.price).toLocaleString("en")}
                  </p>
                  <b className="text-[16px]">
                    {Number(item.product.endPrice).toLocaleString("en")}{" "}
                    <span className="text-[14px]">IQD</span>
                  </b>
                </div>
              ) : (
                <b className="text-[16px]">
                  {Number(displayPrice).toLocaleString("en")}{" "}
                  <span className="text-[14px]">IQD</span>
                </b>
              )}
              <QtButton value={item?.qt} product={item?.product} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const CartList = () => {
  const router = useRouter();
  const { cart, getItemsTotal } = useCartStore();

  useEffect(() => {
    router.prefetch("/checkout");
  }, [router]);

  const productId = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * cart.length);
    return cart[randomIndex]?.product?.id;
  }, [cart?.length]);

  if (getItemsTotal() === 0)
    return (
      <Empty
        icon={<TbShoppingCartExclamation />}
        title="لا توجد منتجات!."
        msg="قم بأظافة منتجات لمتابعة التسوق."
        href={"/"}
        buttonText={"عودة للرئيسية"}
      />
    );

  return (
    <div className="mb-[16px]">
      {/* <Container>
        <div className="mt-[16px]">
          <InstallmentBanner />
        </div>
      </Container> */}

      {getItemsTotal() !== 0 &&
        cart?.map((el, i) => <CartItem key={i} item={el} />)}
      <RelatedList productId={productId} />
      <CartCTA />
    </div>
  );
};

export default CartList;
