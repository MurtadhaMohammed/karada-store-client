"use client";
import CreatviceCard from "../CreativeCard/creativeCard";
import DefaultCard from "../DefaultCard/defaultCard";
import Button from "../UI/Button/button";
import Container from "../UI/Container/container";

import { IoIosArrowBack } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

const ListBanner = ({
  bannerId,
  title,
  list,
  isCreative = false,
  noMore = false,
  isRelated = false,
}) => {
  list = noMore ? list : list.slice(0, 4);
  if (list.length === 0) return;
  return (
    <div className="md:pt-[24px] pt-[16px] ">
      <Container>
        <div className="flex items-center justify-between">
          <h3 className="md:text-[18px] text-[16px] font-semih2old text-black font-semibold mr-1">
            {title}
          </h3>
          {/* <Link href={"/products"}> */}
          {!noMore && (
            <Button
              size="sm"
              icon={<IoIosArrowBack className="text-[#717171] text-[16px]" />}
              // onClick={() => router.push("/products")}
              href={`/products/banner/${bannerId}`}
            >
              <p className="text-[#717171] text-[14px]">عرض المزيد</p>
            </Button>
          )}
          {/* </Link> */}
        </div>
      </Container>
      <Container noPadding>
        <div
          className={`md:grid md:grid-cols-4 ${
            isRelated ? "grid grid-cols-2" : "flex"
          } overflow-x-auto no-scrollbar md:pl-0 md:pr-0 pl-[16px] pr-[16px] pb-[16px] pt-2 ${
            isCreative ? "gap-4" : "gap-2"
          }`}
        >
          {list.map((el, i) =>
            isCreative ? (
              <CreatviceCard key={i} index={i} item={el} />
            ) : (
              <DefaultCard key={i} item={el} isGrid={isRelated} />
            )
          )}
        </div>
      </Container>
    </div>
  );
};

export default ListBanner;
