"use client";
import Image from "next/image";
import Button from "../UI/Button/button";
import Container from "../UI/Container/container";
import { useAppStore } from "@/lib/store";
import { useEffect } from "react";
import Link from "next/link";

const DownloadBanner = ({ className }) => {
  const { deviceOSName } = useAppStore();
  if (deviceOSName === "macOS") {
    return (
      <Container>
        <Link href="https://apps.apple.com/app/id6741197248">
          <div
            className={`bg-[#f6f6f6] rounded-[8px] border pt-[4px] pb-[4px] pl-[12px] pr-[12px] mt-2 shadow-md active:scale-[0.96] active:opacity-50 transition-all pointer-events-none select-none`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[14px] block tight-custom flex-1">
                حمل التطبيق الأن وأستمتع بالميزات الاضافية
              </p>
              <div className="w-[100px]">
                <Image
                  alt="image"
                  src={"/IOS.png"}
                  width={100}
                  height={100}
                  style={{ objectFit: "cover", marginLeft: "10px" }}
                />
              </div>
            </div>
          </div>
        </Link>
      </Container>
    );
  } else if (deviceOSName === "Android") {
    return (
      <Container>
        <Link href="https://play.google.com/store/apps/details?id=com.puretik.karadastore">
          <div
            className={`bg-[#f6f6f6] rounded-[8px]  pt-[4px] pb-[4px] pl-[12px] pr-[12px] shadow-md active:scale-[0.96] active:opacity-50 transition-all pointer-events-none select-none`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[14px] block tight-custom flex-1">
                حمل التطبيق الأن وأستمتع بالميزات الاضافية
              </p>
              <div className="w-[100px]">
                <Image
                  alt="image"
                  src={"/Android.png"}
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </Link>
      </Container>
    );
  } else {
    return null;
  }
};

export default DownloadBanner;
