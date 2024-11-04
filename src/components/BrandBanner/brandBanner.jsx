"use client";

import Button from "../UI/Button/button";
import Container from "../UI/Container/container";

import { IoIosArrowBack } from "react-icons/io";
import BrandCard from "../BrandCard/brandCard";

const list = [
  {
    id: 31,
    name: "Sony",
    img: "image-rcTjwY.png",
    created_at: "2024-10-27T10:55:26.568Z",
    store_id: 1,
    active: true,
  },
  {
    id: 29,
    name: "Honor",
    img: "image-Pwq3Nd.jpeg",
    created_at: "2024-10-27T09:30:39.375Z",
    store_id: 11,
    active: true,
  },
  {
    name: "Infinix ",
    img: "image-i5ECkR.jpg",
    created_at: "2024-10-27T09:15:12.851Z",
    store_id: 11,
    active: true,
  },
  {
    id: 26,
    name: "samsung",
    img: "image-f8EoFR.jpg",
    created_at: "2024-10-27T07:49:56.345Z",
    store_id: 11,
    active: true,
  },
  {
    id: 21,
    name: "belkin",
    img: "image-frPNE6.png",
    created_at: "2024-10-23T12:05:38.530Z",
    store_id: 11,
    active: true,
  },
  {
    id: 20,
    name: "Nintendo",
    img: "image-nRcSC5.png",
    created_at: "2024-10-23T11:57:16.054Z",
    store_id: 11,
    active: true,
  },
];

const BrandBanner = ({title}) => {
  return (
    <div className="md:pt-[24px] pt-[16px] ">
      <Container>
        <div className="flex items-center justify-between">
          <h3 className="md:text-[18px] text-[16px] font-semih2old text-black font-semibold mr-1">
            {title}
          </h3>

          <Button
            size="sm"
            icon={<IoIosArrowBack className="text-[#717171] text-[16px]" />}
            // onClick={() => router.push("/products")}
            //href={`/products/banner/${bannerId}`}
          >
            <p className="text-[#717171] text-[14px]">عرض المزيد</p>
          </Button>
        </div>
      </Container>
      <Container noPadding>
        {list?.map((el, i) => (
          <BrandCard key={i} brand={el} />
        ))}
      </Container>
    </div>
  );
};

export default BrandBanner;
