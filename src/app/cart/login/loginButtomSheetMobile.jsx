"use client";

import { useRouter } from "next/navigation";
import Container from "@/components/UI/Container/container";
import Ripples from "react-ripples";
import { FaLock } from "react-icons/fa6";
import { Sheet } from "react-modal-sheet";
import Image from "next/image";

export default function LoginBottomSheetMobile({ isOpen, onClose }) {
  const router = useRouter();

  const handleLogin = () => {
    const url = new URL("/login", window.location.origin);
    url.searchParams.set("redirect", "/checkout");
    router.push(url.toString());
  };

  return (
    <>
      <Sheet isOpen={isOpen} onClose={onClose} detent={"content-height"}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <Sheet.Scroller className="w-full">
              <Container>
                <div className=" pb-[20px]">
                  <div className="flex flex-col items-center justify-center mb-8">
                    <div className="w-50 h-50 flex items-center justify-center mb-6">
                      {/* <FaLock className="text-[24px] text-violet-600" /> */}
                      <Image src="/login.png" alt=".."  width={130} height={130}/>
                    </div>
                    <h2 className="text-[20px] font-bold mb-3  -mt-10">
                      آسفين لأن طولناهه عليك!
                    </h2>
                    <p className="text-[#666] text-center text-[16px] mb-2">
                      لازم تسجل دخول علمود تأكد الطلب <br />و محتويات السلة
                      محفوظة
                    </p>
                  </div>
                  <div
                    className="active:scale-[0.96] transition-all"
                    style={{
                      display: "inline-flex",
                      borderRadius: 16,
                      overflow: "hidden",
                      width: "100%",
                    }}
                  >
                    <Ripples className="!grid w-full">
                      <button
                        onClick={handleLogin}
                        className="flex items-center justify-center h-[56px] rounded-[16px] bg-gradient-to-r from-indigo-600 to-violet-600 text-[#fff] p-6"
                      >
                        <span className="font-bold text-[18px]">
                          تسجيل الدخول
                        </span>
                      </button>
                    </Ripples>
                  </div>
                </div>
              </Container>
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={onClose} />
      </Sheet>
    </>
  );
}
