"use client";

import { useRouter } from "next/navigation";
import Container from "@/components/UI/Container/container";
import Ripples from "react-ripples";
import { FaLock } from "react-icons/fa6";

export default function LoginBottomSheetMobile({ onClose }) {
  const router = useRouter();

  const handleLogin = () => {
    const url = new URL('/login', window.location.origin);
    url.searchParams.set('redirect', '/checkout');
    router.push(url.toString());
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 overflow-hidden" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0_-8px_32px_rgba(0,0,0,0.2)] z-50 overflow-hidden">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-2" />
        <Container>
          <div className="py-12">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mb-6">
                <FaLock className="text-[24px] text-violet-600" />
              </div>
              <h2 className="text-[20px] font-bold mb-3">آسفين لأن طولناهه عليك!</h2>
              <p className="text-[#666] text-center text-[16px] mb-2">
                لازم تسجل دخول علمود  تأكد الطلب <br />و محتويات السلة محفوظة
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
                  <span className="font-bold text-[18px]">تسجيل الدخول</span>
                </button>
              </Ripples>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
