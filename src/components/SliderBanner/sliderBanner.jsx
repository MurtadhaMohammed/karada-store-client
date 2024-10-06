import Image from "next/image";
import Container from "../UI/Container/container";

const SliderBanner = () => {
  return (
    <div className="pl-[16px] pr-[16px] mt-[16px] mb-[16px] w-full">
      <Container noPadding>
        <div className="flex flex-col justify-center items-center">
          <div className="w-[100%] h-[120px] relative rounded-[16px] overflow-hidden border border-[#f6f6f6]">
            <Image
              src={"/images/banner3.png"}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex items-center gap-[4px] mt-[12px]">
            <span className="block w-[40px] h-[6px] bg-[#ddd] rounded-[24px]" />
            <span className="block w-[6px] h-[6px] bg-[#eee] rounded-[24px]" />
            <span className="block w-[6px] h-[6px] bg-[#eee] rounded-[24px]" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SliderBanner;
