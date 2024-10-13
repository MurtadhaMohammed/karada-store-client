"use client";
import MainHeader from "@/components/MainHeader/mainHeader";
import BottomNabar from "@/components/BottomNavbar/bottomNavbar";
import SearchBar from "@/components/SearchBar/searchBar";
import Container from "@/components/UI/Container/container";

const HomeSkeleton = () => {
  const current = 0;
  return (
    <div>
      <MainHeader />
      <SearchBar />
      <div>
        <div className=" mt-[16px] mb-[16px] w-full">
          <Container>
            <div className="flex flex-col justify-center items-center">
              <div className="w-[100%] h-[140px] relative rounded-[16px] overflow-hidden pb-[20px]  inline-block  shadow-md pure-skeleton"></div>
              <div className="flex items-center gap-[4px] mt-[4px] ">
                {[...Array(3)]?.map((_, i) => (
                  <span
                    key={i}
                    className="block  h-[6px]  rounded-[24px] transition-all mt-[8px]"
                    style={{
                      width: current === i ? 50 : 6,
                      background: current === i ? "#ddd" : "#eee",
                    }}
                  />
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      <div className={"border-b border-b-[#f6f6f6]"}>
        <Container noPadding>
          <div className="flex items-center pt-4 pb-4 gap-6 overflow-auto no-scrollbar pl-[16px] pr-[16px] ">
            {[...Array(8)].map((el, i) => (
              <div
                key={i}
                className={
                  "flex items-center justify-center flex-col active:scale-95 transition-all"
                }
              >
                <div className="pure-skeleton !w-[48px] !h-[48px] relative rounded-lg "></div>
                <p
                  className={"mt-[12px] text-[14px] text-nowrap text-gray-700 w-[40px] h-[6px]  bg-[#f6f6f6]"}
                >
            
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <BottomNabar />
    </div>
  );
};

export default HomeSkeleton;
