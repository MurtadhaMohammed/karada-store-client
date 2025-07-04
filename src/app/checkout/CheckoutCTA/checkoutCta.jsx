"use client";
import Container from "@/components/UI/Container/container";
import { useSearchParams, useRouter } from "next/navigation";
import { GiConfirmed } from "react-icons/gi";
import Ripples from "react-ripples";
import { useCartStore } from "@/lib/cartStore";
import { useAppStore } from "@/lib/store";
import { useMemo, useState, useEffect, use } from "react";
import { useBottomSheetModal } from "@/components/UI/BottomSheetModal/bottomSheetModal";
import { InstallmentModal } from "../Payments/InstallmentModal/InstallmentModal";
import { OtpModal } from "../Payments/OtpModal/OtpModal";
import { createOrder } from "../utils/orderUtils";
import RedirectOrderCreation from "@/components/RedirectOrderCreation/redirectOrderCreaton";

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
      id: item.product.id,
      qt: item.qt,
      store_id: item.product.store_id,
      l1: item.product.l1?.uuid,
    }));
  }, [cart]);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const platformQuery = queryParams.get("platform");
    setPlatform(platformQuery);
  }, []);

  useEffect(() => {
    setOrder({
      user_id: userInfo.id,
      user_name: userCheckoutInfo.name,
      phone: userCheckoutInfo.phone,
      address: userCheckoutInfo.address,
      items,
      voucher_id: voucher ? voucher.id : null,
      store_id: 1,
      order_type,
      platform,
      installmentId,
      note,
    });
  }, [
    userInfo,
    userCheckoutInfo,
    items,
    voucher,
    order_type,
    installmentId,
    note,
  ]);
  const handleOrderCreation = async () => {
    try {
      setLoading(true);
      const result = await createOrder({
        order,
        isLogin,
        setIsOtp,
        setOtp,
        clearCart,
        router,
        platform,
        installmentId,
        delivery_cost: deliveryCost || 0,
        note,
        installmentFee: 0,
        setErrorMessage,
      });

      setLoading(false);
      setNote("");

      if (!result) {
        setErrorMessage("حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة لاحقًا.");
        return;
      }

      // Handle redirect to login case
      if (result.status === "redirect_to_login") {
        // The createOrder function will handle the redirect
        return;
      }

      if (!result.order) {
        setErrorMessage("فشل إنشاء الطلب. تحقق من المعلومات وحاول مرة أخرى.");
        return;
      }

      // If we got here, the order was created successfully
      setShowRedirectModal(true);
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
      setInstallmentOrder({
        user_id: userInfo.id,
        user_name: userCheckoutInfo.name,
        phone: userCheckoutInfo.phone,
        address: userCheckoutInfo.address,
        items,
        voucher_id: voucher ? voucher.id : null,
        store_id: 1,
        order_type: "Installment",
        platform,
        installmentFee: settings?.installment,
        installmentId,
        note,
      });
      setErrorMessage("");
      router.push("/installment");
    } else {
      handleOrderCreation();
    }
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
      <InstallmentModal
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
      />

      {showRedirectModal && (
        <RedirectOrderCreation onClose={() => setShowRedirectModal(false)} />
      )}
    </div>
  );
};

export default CheckoutCTA;
