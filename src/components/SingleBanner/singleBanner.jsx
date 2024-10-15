import Image from "next/image";
import Container from "../UI/Container/container";
import Button from "../UI/Button/button";
import { FaArrowLeft } from "react-icons/fa6";

const SingleBanner = ({ banner }) => {
  const IMAGE_URL = "https://drlab.us-east-1.linodeobjects.com/karada-store";
  return (
    <div className="mt-[16px] mb-[16px]">
      <Container>
      <div className="w-[100%] bg-white relative rounded-[16px] overflow-hidden inline-block shadow-md">
          <div className="w-[100%] h-[140px] relative">
            {/* <Image
              src={`${IMAGE_URL}/${banner.img}`}
              layout="fill"
              alt={banner.title || "Single Banner"}
              objectFit="cover"
            /> */}
          </div>
          <div className="p-[12px] pr-[16] relative">
            <div>
              <h4 className="font-bold text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
              {banner.title}
              </h4>
              <p className="text-gray-600 text-[16px]  pl-[120px]">
              {banner.description}
              </p>
            </div>
            <div className=" absolute bottom-[16px] left-4">
              <Button
                icon={<FaArrowLeft />}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff]"
                size="sm"
                style={{ background: "red" }}
              >
                <span className="text-[14px] -mt-[1px]">عرض الكل</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleBanner;
