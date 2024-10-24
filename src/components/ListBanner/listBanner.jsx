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
}) => {
  if (list.length === 0) return;
  return (
    <div className="pt-[16px] ">
      <Container>
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-semih2old text-black font-semibold mr-1">
            {title}
          </h3>
          {/* <Link href={"/products"}> */}
          {!noMore && (
            <Button
              size="sm"
              icon={<IoIosArrowBack className="text-[#717171] text-[16px]" />}
              // onClick={() => router.push("/products")}
              href={`/products/${bannerId}`}
            >
              <p className="text-[#717171] text-[14px]">عرض المزيد</p>
            </Button>
          )}
          {/* </Link> */}
        </div>
      </Container>
      <Container noPadding>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pl-[16px] pr-[16px] pb-[16px] pt-3">
          {list.map((el, i) =>
            isCreative ? (
              <CreatviceCard key={i} index={i} item={el} />
            ) : (
              <DefaultCard key={i} item={el} />
            )
          )}
        </div>
      </Container>
    </div>
  );
};

export default ListBanner;
