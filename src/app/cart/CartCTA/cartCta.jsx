"use client";
import Container from "@/components/UI/Container/container";
import { useSearchParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import Ripples from "react-ripples";
import { Suspense } from "react";

const CartCTA = () => {
  const searchParams = useSearchParams();

  return (
    <Suspense fallback={<di>Loading</di>}>
      <div
        className="fixed  z-10 w-full"
        style={{
          bottom: searchParams.get("from") === "home" ? 96 : 20,
        }}
      >
        <Container>
          <div
            className="active:scale-[0.96] transition-all shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
            style={{
              display: "inline-flex",
              borderRadius: 28,
              overflow: "hidden",
              width: "100%",
            }}
          >
            <Ripples className="!grid w-full">
              <button className="flex items-center justify-between h-[56px] rounded-[28px]  bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] p-6">
                <span className="text-[18px] font-bold">
                  140,000 <span className="text-[14px]">IQD</span>
                </span>
                <div className="flex items-center">
                  <span className="ml-[8px] font-bold text-[18px]">متابعة</span>
                  <FaArrowLeft className="text-[22px]" />
                </div>
              </button>
            </Ripples>
          </div>
        </Container>
      </div>
    </Suspense>
  );
};

export default CartCTA;
