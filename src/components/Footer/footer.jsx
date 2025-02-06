import Image from "next/image";
import Container from "../UI/Container/container";
import { RiUserLine } from "react-icons/ri";
import Link from "next/link";
import { BiLocationPlus } from "react-icons/bi";
import { FaInstagram, FaLocationDot } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="hidden md:block  bg-gradient-to-r from-indigo-600 to-violet-600 relative pt-[42px] pb-[140px] ">
      <Container>
        <div className="flex gap-4 justify-between">
          <section>
            <Image
              className="-mr-[14px]"
              src={"/footer.png"}
              width={70}
              height={70}
              alt="footer logo"
            />
            <p className="text-[16px] text-[#fff] max-w-[300px] mt-[16px]">
              نلتزم بتقديم أحدث المنتجات الإلكترونية بأعلى جودة وأفضل الأسعار مع
              عروض حصرية وخصومات مميزة على كافة منتجاتنا.
            </p>
          </section>
          <section>
            <div className="text-[#fff] flex gap-2 items-center">
              <RiUserLine />
              <b>سياسات الاستخدام</b>
            </div>
            <ul className="mr-[36px] mt-[16px] text-[#fff] text-[16px] list-disc">
              <li>
                <Link href={"/policies/delivery"}>التوصيل</Link>
              </li>
              <li>
                <Link href={"/policies/payments"}>طرق الدفع</Link>
              </li>
              <li>
                <Link href={"/policies/refund"}>سياسة الاسترجاع والاستبدال</Link>
              </li>
              <li>
                <Link href={"/policies/privicy"}>
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <div className="text-[#fff] flex gap-2 items-center">
              <FaLocationDot />
              <b>موقعنا</b>
            </div>
            <p className="max-w-[200px] text-[#fff] mt-[16px] text-[14px]">
              بغداد - كرادة داخل - مقابل محطة وقود ابو اقلام
            </p>
            <div className="h-[1px] w-[80px] bg-[#fff] mt-[16px] mb-[16px]"></div>
            <div className="text-[#fff] mt-[16px] flex items-center justify-between min-w-[200px]">
              <b>تابعنا على </b>
              <div className="flex gap-2">
                <a
                  href="https://www.facebook.com/karada.gaming/"
                  target="_blank"
                >
                  <FaFacebookSquare className="text-[28px]" />
                </a>
                <a
                  href="https://www.instagram.com/karada.store.elc/"
                  target="_blank"
                >
                  <FaInstagram className="text-[28px]" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </Container>
      <div className="absolute left-0 right-0 bottom-4 text-center z-10 text-[#fff] text-[14px]">
        جميع الحقوق محفوظة © 2025 KaradaStore
      </div>
    </div>
  );
};

export default Footer;
