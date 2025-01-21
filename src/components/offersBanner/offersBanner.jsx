"use client";

import DefaultCard from "../DefaultCard/defaultCard";
import Button from "../UI/Button/button";
import Container from "../UI/Container/container";

import { IoIosArrowBack } from "react-icons/io";

const OffersBanner = ({ title, list = [], bannerId }) => {
  return (
    <div className="md:pt-[24px] mt-[8px] mb-[8px] pt-[16px] pb-[16px] offerBanner-bg">
      <Container>
        <div className="flex items-center justify-between">
          <h3 className="md:text-[18px] text-[16px] font-semih2old text-[#fff] font-semibold mr-1 ">
            {title}
          </h3>
          <Button
            size="sm"
            icon={<IoIosArrowBack className="text-[#fff] text-[16px]" />}
            //onClick={() => router.push("/products")}
            href={`/products/banner/${bannerId}`}
          >
            <p className="text-[#fff] text-[14px]">عرض المزيد</p>
          </Button>
        </div>
      </Container>
      <Container noPadding>
        <div className="md:grid md:grid-cols-4 flex gap-4 overflow-x-auto no-scrollbar md:pl-0 md:pr-0 pl-[16px] pr-[16px] pb-[16px] pt-3">
          {list.slice(0, 4).map((el, i) => (
            <DefaultCard bannerType="OfferBanner" key={i} item={el} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default OffersBanner;
