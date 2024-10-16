"use client";
import Container from "@/components/UI/Container/container";

const ProductSkeleton = () => {
  return (
    <div className="pt-[16px]">
      <Container>
        <div className="grid grid-cols-2 gap-4 overflow-x-auto no-scrollbar">
          {[...Array(6)].map((el, i) => (
            <div
              key={i}
              className={`flex-none rounded-xl flex flex-col  border border-[#eee] relative overflow-hidden bg-white active:scale-[0.96] transition-all`}
              style={{ width: "100%" }}
            >
              <div className={`flex items-center justify-center`}>
                <div
                  className={`w-full relative aspect-w-1 aspect-h-1 bg-[#f6f6f6] pure-skeleton`}
                ></div>
              </div>
              <div className="p-4 border-t border-t-[#eee]">
                <h2 className="font-semih2old text-black text-[14px] font-semibold  whitespace-nowrap overflow-hidden text-ellipsis w-[120px] h-[8px] bg-[#f6f6f6] rounded-md"></h2>
                <p className="text-gray-600 text-[14px] mt-[6px] h-[8px] bg-[#f6f6f6] rounded-md"></p>
                <div className="flex items-center justify-between mt-[8px]">
                  <h4 className="text-[16px] font-extrabold w-[30px] h-[14px] bg-[#f6f6f6] rounded-md"></h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProductSkeleton;
