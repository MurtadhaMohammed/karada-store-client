"use client";
import Container from "@/components/UI/Container/container";
import { useSearchParams, useRouter } from "next/navigation";
import { GiConfirmed } from "react-icons/gi";
import Ripples from "react-ripples";
import { useCartStore } from "@/lib/cartStore";
import { useAppStore } from "@/lib/store";
import { useMemo, useState, useEffect } from "react";
import { useBottomSheetModal } from "@/components/UI/BottomSheetModal/bottomSheetModal";
// import { InstallmentModal } from "../Payments/InstallmentModal/InstallmentModal";
// import { OtpModal } from "../Payments/OtpModal/OtpModal";
import { createOrder } from "../utils/orderUtils";
import RedirectOrderCreation from "@/components/RedirectOrderCreation/redirectOrderCreaton";
import { apiCall } from "@/lib/api";

const CheckoutCTA = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    userCheckoutInfo,
    userInfo,
    setIsOtp,
    setOtp,
    isLogin,
    isPhoneValidated,
    setValidateAddress,
    setNote,
    note,
    installmentId,
    setInstallmentId,
    platform,
    setPlatform,
    settings,
    setInstallmentOrder,
    setErrorMessage,
  } = useAppStore();
  const { cart, clearCart, getTotal } = useCartStore();
  const voucher = useCartStore((state) => state.voucher);
  const { closeModal } = useBottomSheetModal();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const { isInstallment } = useAppStore();
  const [cardInfo, setCardInfo] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [order_type, setOrderType] = useState();
  const [isDataProvided, setIsDataProvided] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [order, setOrder] = useState(null);

  const calculateTotalPrice = getTotal();

  const deliveryCost = useMemo(() => {
    return calculateTotalPrice >= 1000000
      ? parseInt(settings?.extraDelivery) || 0
      : parseInt(settings?.delivery) || 0;
  }, [calculateTotalPrice, settings]);

  useEffect(() => {
    if (userCheckoutInfo) {
      setAddress(userCheckoutInfo?.address);
      setPhone(userCheckoutInfo?.phone);
      setName(userCheckoutInfo?.name);
    }
  }, [userCheckoutInfo]);

  const items = useMemo(() => {
    return cart?.map((item) => ({
      productId: item.product.id,
      qty: item.qt,
      l1: item.product.l1?.uuid,
    }));
  }, [cart]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const platformQuery = queryParams.get("platform");
    setPlatform(platformQuery || "Web");
  }, []);

  const createCashOrder = async () => {
    try {
      setLoading(true);
      const response = await apiCall({
        pathname: `/app/order/create`,
        method: "POST",
        auth: true,
        data: {
          address: userCheckoutInfo.address,
          phone: userCheckoutInfo.phone,
          note,
          items,
          voucher_id: voucher ? voucher.id : null,
          order_type: "Cash",
          platform,
        },
      });

      if (response?.track_id) {
        setLoading(false);
        setNote("");
        setShowRedirectModal(true);
      } else {
        setLoading(false);
        setErrorMessage("حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة مرة أخرى.");
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage("حدث خطأ غير متوقع. الرجاء المحاولة لاحقاً.");
      console.error("Order creation error:", err);
    }
  };

  const handleButtonClick = () => {
    if (!isDataProvided) {
      setErrorMessage("يرجى استكمال البيانات قبل تأكيد الطلب.");
      setValidateAddress(true);
      return;
    } else {
      setValidateAddress(false);
    }
    if (isInstallment === true) {
      setErrorMessage("");
      router.push("/installment");
    } else createCashOrder();
  };

  useEffect(() => {
    if (name !== "" && phone !== "" && address !== "" && isPhoneValidated) {
      setIsDataProvided(true);
    } else if (
      name === "" ||
      phone === "" ||
      address === "" ||
      !isPhoneValidated
    ) {
      setIsDataProvided(false);
    }
  }, [name, phone, address, isPhoneValidated]);

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
              onClick={handleButtonClick}
              disabled={!isDataProvided && loading}
            >
              {loading ? (
                <div className="btn-loading text-black"></div>
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
      </Container>
      {/* <InstallmentModal
        onFinish={(value) => {
          setCardInfo(value);
          setSessionId(value.sessionId);
        }}
      />
      <OtpModal
        sessionId={sessionId}
        cardNumber={cardInfo?.number}
        onFinish={() => {
          setCardInfo(null);
          setSessionId(null);
          setInstallmentId(null);
          closeModal();
        }}
        order={order}
        isLogin={isLogin}
        setIsOtp={setIsOtp}
        setOtp={setOtp}
        clearCart={clearCart}
        router={router}
      /> */}

      {showRedirectModal && (
        <RedirectOrderCreation onClose={() => setShowRedirectModal(false)} />
      )}
    </div>
  );
};

export default CheckoutCTA;
