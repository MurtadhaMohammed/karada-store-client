"use client";
import Image from "next/image";
import Container from "../UI/Container/container";
import { IMAGE_URL } from "@/lib/api";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { useEffect } from "react";

const LinkOrDev = ({ banner, classNameProp, children }) => {
  if (banner.link)
    return (
      <Link className={classNameProp} href={banner.link}>
        {children}
      </Link>
    );

  if (banner?.product_ids?.length !== 0)
    return (
      <Link className={classNameProp} href={`/products/banner/${banner?.id}`}>
        {children}
      </Link>
    );

  return <div className={classNameProp}>{children}</div>;
};

const SingleBannerPure = ({ banner, title }) => {
  const { setPageTitle } = useAppStore();

  useEffect(() => {
    setPageTitle(title);
  }, []);
  return (
    <div className="md:mt-[24px] md:mb-[24px] mt-[16px] mb-[8px]">
      <Container>
        <LinkOrDev banner={banner} classNameProp="relative">
          <div className="w-[100%] md:aspect-[3.5] aspect-3  pure-skeleton relative rounded-[16px] overflow-hidden pb-[20px] inline-block shadow-md active:opacity-50 transition-all">
            <Image
              src={`${IMAGE_URL}/${banner?.img}`}
              fill
              alt={banner.title || "Single Banner"}
              style={{ objectFit: "cover" }}
            />
          </div>
        </LinkOrDev>
      </Container>
    </div>
  );
};

export default SingleBannerPure;
