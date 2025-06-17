"use client";

import { useRouter } from "next/navigation";
import Ripples from "react-ripples";
import { FaLock } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function LoginDialogWeb({ onClose }) {
  const router = useRouter();

  const handleLogin = () => {
    const url = new URL('/login', window.location.origin);
    url.searchParams.set('redirect', '/checkout');
    router.push(url.toString());
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white rounded-[24px] p-12 max-w-[400px] w-full mx-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)] relative overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <IoClose className="text-[20px] text-gray-600" />
        </button>
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
    </div>
  );
}
