// CheckoutCTA.jsx
"use client";
import Container from "@/components/UI/Container/container";
import { useSearchParams, useRouter } from "next/navigation";
import { GiConfirmed } from "react-icons/gi";
import Ripples from "react-ripples";
import { apiCall } from "@/lib/api";
import { useCartStore } from "@/lib/cartStore";
import { useAppStore } from "@/lib/store";
import { useMemo, useState, useEffect } from "react";

const CheckoutCTA = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userInfo, setIsOtp, setOtp, isLogin, isPhoneValidated } = useAppStore();
  const { cart, clearCart } = useCartStore();
  const voucher = useCartStore((state) => state.voucher);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(userInfo?.address || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [name, setName] = useState(userInfo?.name || "");

  useEffect(() => {
    if (userInfo) {
      setAddress(address || "");
      setPhone(phone || "");
      setName(name || "");
    }
  }, [userInfo]);

  const items = useMemo(() => {
    return cart?.map((item) => ({
      id: item.product.id,
      quantity: item.qt,
      store_id: item.product.store_id,
      l1: item.product.l1,
    }));
  }, [cart]);

  const order = {
    user_id: userInfo.id,
    user_name: name,
    phone: phone,
    address: address,
    items,
    voucher_id: voucher ? voucher.id : null,
    store_id: 1,
  };

  const handleOrderCreation = async () => {
    try {
      setLoading(true);
      const response = await apiCall({
        pathname: `/client/order/create-order`,
        method: "POST",
        data: order,
      });
      if (response) {
        if (response.otp) {
          setIsOtp(true);
          setOtp(parseInt(response?.otp));
        }
        clearCart();
        if (response.otp && !isLogin) {
          router.replace("/login");
        } else {
          router.replace("/orders");
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const isDataProvided = useMemo(() => {
    return (
      name.trim() &&
      phone.trim() &&
      isPhoneValidated &&
      address.trim() &&
      !loading
    );
  }, [name, phone, address, isPhoneValidated, loading]);

  return (
    <div
      className="pointer-events-none fixed z-10 w-full text-end"
      style={{
        bottom: searchParams.get("from") === "home" ? 96 : 20,
      }}
    >
      <Container>
        <div
          className="active:scale-[0.96] transition-all shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] md:max-w-[300px] md:mb-[30px]"
          style={{
            display: "inline-flex",
            borderRadius: 28,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Ripples className="!grid w-full pointer-events-auto">
            <button
              className={`flex w-full items-center justify-center h-[56px] rounded-[28px] ${
                isDataProvided
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff]"
                  : "bg-[#f6f6f6] border border-[#eee] text-[#ccc] cursor-not-allowed"
              }`}
              onClick={handleOrderCreation}
              disabled={!isDataProvided}
            >
              {loading ? (
                <div className="btn-loading"></div>
              ) : (
                <>
                  <span className="ml-[8px] font-bold text-[18px]">
                    تأكـــيد الطلب
                  </span>
                  <GiConfirmed className="text-[22px]" />
                </>
              )}
            </button>
          </Ripples>
        </div>
        {/* {!isDataProvided && (
          <p className="mt-2 text-red-600 text-center font-semibold">
            يرجى ملء جميع المعلومات المطلوبة
          </p>
        )} */}
      </Container>
    </div>
  );
};

export default CheckoutCTA;
