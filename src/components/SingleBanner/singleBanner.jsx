import Image from "next/image";
import Container from "../UI/Container/container";

const SingleBanner = () => {
  return (
    <div className="mt-[16px] mb-[16px]">
      <Container>
        <div className="w-[100%] h-[140px] relative rounded-[16px] overflow-hidden inline-block  shadow-md">
          <Image
            src={"/images/banner1.png"}
            layout="fill"
            alt={"hello"}
            objectFit="cover"
          />
        </div>
      </Container>
    </div>
  );
};

export default SingleBanner;
