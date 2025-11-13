"use client";
import Container from "@/components/UI/Container/container";
import { useCartStore } from "@/lib/cartStore";
import { useSearchParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import Ripples from "react-ripples";
import { useAppStore } from "@/lib/store";
import { useState, useEffect } from "react";
import LoginBottomSheetMobile from "@/app/cart/login/loginButtomSheetMobile";
import LoginDialogWeb from "@/app/cart/login/loginDialogWeb";
import { priceCalc } from "@/helper/priceCalc";

const CartCTA = ({ loading }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getItemsTotal , getTotal} = useCartStore();
  const { isLogin } = useAppStore();
  const { cart } = useCartStore();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (showLoginPrompt) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLoginPrompt]);

  if (getItemsTotal() === 0) return;


  const handleCheckout = () => {
    if (!isLogin) {
      setShowLoginPrompt(true);
      return;
    }
    router.push("/checkout");
  };

  const handleClose = () => {
    setShowLoginPrompt(false);
  };

  return (
    <>
      <div
        className="fixed z-30 w-full text-end"
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
            <Ripples className="!grid w-full">
              <button
                disabled={loading}
                onClick={handleCheckout}
                className="flex items-center justify-center h-[56px] rounded-[28px] bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] p-6"
              >
                {loading ? (
                  <div className="btn-loading text-black"></div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[18px] font-bold">
                      {Number(getTotal()).toLocaleString("en")}{" "}
                      <span className="text-[14px]">د.ع</span>
                    </span>

                    <div className="flex items-center">
                      <span className="ml-[8px] font-bold text-[18px]">
                        متابعة
                      </span>

                      <FaArrowLeft className="text-[22px]" />
                    </div>
                  </div>
                )}
              </button>
            </Ripples>
          </div>
        </Container>
      </div>

      {showLoginPrompt &&
        (isMobile ? (
          <LoginBottomSheetMobile
            isOpen={showLoginPrompt}
            onClose={handleClose}
          />
        ) : (
          <LoginDialogWeb onClose={handleClose} />
        ))}
    </>
  );
};

export default CartCTA;
