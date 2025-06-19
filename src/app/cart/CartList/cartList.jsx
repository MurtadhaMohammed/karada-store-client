"use client";
import Container from "@/components/UI/Container/container";
import IconButton from "@/components/UI/IconButton/iconButton";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import CartCTA from "../CartCTA/cartCta";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useCartStore } from "@/lib/cartStore";
import { apiCall, IMAGE_URL } from "@/lib/api";
import RelatedList from "../RelatedList/relatedList";
import Empty from "@/components/Empty/empty";
import { TbShoppingCartExclamation } from "react-icons/tb";
import { isEnglish } from "@/helper/isEnglish";
import { priceCalc } from "@/helper/priceCalc";

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

const CartItem = ({ item, outOfStock = false }) => {
  const loadImageUrl = () => {
    let image = item?.product?.thumbnail1;
    if (item?.product?.l1?.uuid) image = item?.product?.l1?.images[0];
    return image;
  };

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
              <b
                className={` text-[14px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[250px] block ${
                  isEnglish(item?.product?.name) ? "dots" : ""
                }`}
              >
                {item?.product?.name}
              </b>
              <p
                className={`text-[14px] text-[#a5a5a5] whitespace-nowrap text-ellipsis overflow-hidden max-w-[200px] block ${
                  isEnglish(item?.product?.shortDescription) ? "dot" : ""
                }`}
              >
                {item?.product?.l1?.name ||
                  `${item?.product?.shortDescription}`}
              </p>
            </div>
            {!outOfStock ? (
              <div className="flex items-end justify-between w-full">
                {priceCalc(item?.product)?.hasDiscount ? (
                  <div className="flex flex-col items-start">
                    <p className="text-[14px] block line-through text-[#a5a5a5]">
                      {Number(
                        priceCalc(item?.product, item?.product?.l1)?.price
                      ).toLocaleString("en")}
                    </p>
                    <b className="text-[16px]">
                      {Number(
                        priceCalc(item?.product, item?.product?.l1)?.endPrice
                      ).toLocaleString("en")}{" "}
                      <span className="text-[14px]">د.ع</span>
                    </b>
                  </div>
                ) : (
                  <b className="text-[16px]">
                    {Number(
                      priceCalc(item?.product, item?.product?.l1)?.price
                    ).toLocaleString("en")}{" "}
                    <span className="text-[14px]">د.ع</span>
                  </b>
                )}
                <QtButton value={item?.qt} product={item?.product} />
              </div>
            ) : (
              <p>تم أزالة هذا المنتج من السلة لعدم توفره</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

const CartList = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { cart, setCart, getItemsTotal, getTotal } = useCartStore();
  const total = getTotal();

  const hasCheckedRef = useRef(false);

  useEffect(() => {
    router.prefetch("/checkout");
    router.prefetch("/login");
  }, [router]);

  const productId = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * cart.length);
    return cart[randomIndex]?.product?.id;
  }, [cart]);

  const checkCart = useCallback(async () => {
    if (cart.length > 0) {
      const itemsId = cart.map((item) => item.product.id);
      setLoading(true);

      const result = await apiCall({
        pathname: "/client/order/cart-check",
        method: "POST",
        data: itemsId,
      });

      setLoading(false);

      if (result?.success === true && Array.isArray(result.product)) {
        const updatedProducts = result.product;

        const filteredCart = cart
          .map((item) => {
            const updatedItem = updatedProducts.find(
              (uItem) => uItem.id === item.product.id
            );

            if (updatedItem && updatedItem.out_of_stock === false) {
              return {
                ...item,
                product: { ...item.product, ...updatedItem },
              };
            }

            return null;
          })
          .filter(Boolean);

        setCart(filteredCart || []);
      }
    }
  }, [cart, setCart]);

  useEffect(() => {
    if (!hasCheckedRef.current && cart.length > 0) {
      hasCheckedRef.current = true;
      checkCart();
    }
  }, [cart, checkCart]);

  if (getItemsTotal() === 0)
    return (
      <Empty
        icon={<TbShoppingCartExclamation />}
        title="لا توجد منتجات!."
        msg="قم بإضافة منتجات لمتابعة التسوق."
        href={"/"}
        buttonText={"عودة للرئيسية"}
      />
    );

  return (
    <div className="mb-[16px]">
      {cart?.map((el, i) => (
        <CartItem key={i} item={el} />
      ))}

      <RelatedList productId={productId} />
      <CartCTA loading={loading} />
    </div>
  );
};

export default CartList;
