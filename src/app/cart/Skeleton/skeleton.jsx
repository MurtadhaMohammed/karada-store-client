"use client";
import Container from "@/components/UI/Container/container";

const CartSkeleton = () => {
  return (
    <div className="gap-4 mt-[24px]">
      <Container>

          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4 mb-[16px] border-b border-b-[#fff] pb-4">
              <div className="border border-[#fff] pt-[16px] pb-[16px] !h-[80px] !w-[80px] rounded-[16px] bg-[#fff] animate-pulse "></div>
              <div className="flex-1 flex flex-col justify-between items-start">
                <div className="flex flex-col items-start">
                  <div className="text-[14px] h-[16px] w-[140px] rounded-[12px] bg-[#fff] mt-2 animate-pulse"></div>
                  <div className="text-[14px] h-[16px] mt-[16px] w-[200px] rounded-[12px] bg-[#fff] animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
      </Container>
    </div>
  );
};

export default CartSkeleton;