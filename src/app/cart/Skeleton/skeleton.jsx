"use client";
import Container from "@/components/UI/Container/container";

const CartSkeleton = () => {
  return (
    <div className="mt-[16px]">
      <Container>
        {/* <div className="h-[60px] rounded-[8px] border border-[#eee] pt-[4px] pb-[4px] pl-[8px] pr-[8px] shadow-md active:scale-[0.96] active:opacity-50 transition-all pure-skeleton"></div> */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="border-b border-b-[#eee] pt-[16px] pb-[16px] w-full"
          >
            <div className="flex gap-4 ">
              <div className="pure-skeleton !h-[80px] !w-[80px] rounded-[8px] bg-[#f6f6f6] "></div>
              <div className="flex-1 flex flex-col justify-between items-start">
                <div>
                  <p className="text-[14px] h-[16px] w-[140px] rounded-[2px] bg-[#f6f6f6] mt-2"></p>
                  <p className="text-[14px] text-[#a5a5a5] h-[16px] mt-[16px] w-[200px] rounded-[2px] bg-[#f6f6f6]"></p>
                </div>
                <div className="flex items-end justify-between w-full">
                  <p className=" text-[16px] h-[12px] w-[60px] rounded-[12px] bg-[#f6f6f6] mb-1"></p>

                  {/* <div className="h-[36px] w-[80px] rounded-[8px] bg-[#f6f6f6]"></div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default CartSkeleton;
