"use client";
import Container from "@/components/UI/Container/container";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";

import Ripples from "react-ripples";
import { Suspense } from "react";

const CheckoutCTA = () => {
  const searchParams = useSearchParams();

  return (
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
              <Link
                href={"/checkout"}
                className="flex items-center justify-center  h-[56px] rounded-[28px]  bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] p-6"
              >
                <span className="ml-[8px] font-bold text-[18px]">
                  تأكـــيد الطلب
                </span>
                <GiConfirmed className="text-[22px]" />
              </Link>
            </Ripples>
          </div>
        </Container>
      </div>
  );
};

export default CheckoutCTA;