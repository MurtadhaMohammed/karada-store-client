"use client";
import Image from "next/image";
import Container from "../UI/Container/container";
import { IMAGE_URL } from "@/lib/api";
import Link from "next/link";

const SingleBannerPure = ({ banner }) => {
    return (
        <div className="md:mt-[24px] md:mb-[24px] mt-[16px] mb-[16px]">
          <Container>
          <Link href={banner?.link ? banner.link : `/products/banner/${banner?.id}`}>
            <div className="w-[100%] md:aspect-[3.5] aspect-3 relative rounded-[16px] overflow-hidden pb-[20px] inline-block shadow-md active:opacity-50 transition-all">
              <div className="">
                <Image
                  src={`${IMAGE_URL}/${banner?.img}`}
                  fill
                  alt={banner.title || "Single Banner"}
                  style={{ objectFit: "cover" }} 
                />
              </div>
            </div>
            </Link>
          </Container>
        </div>
      );
}

export default SingleBannerPure