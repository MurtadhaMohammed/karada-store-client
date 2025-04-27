import { Section } from "./section/section";
import { LuSettings2, LuLogOut } from "react-icons/lu";
import { TbHeart, TbCreditCardRefund } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import UserInfo from "./user/user";
import { FaFacebook, FaInstagram, FaTruck } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import Container from "@/components/UI/Container/container";
import { ThreeSection } from "./section/threeSection";
import { TwoSection } from "./section/twoSection";

export default async function Info() {
  return (
    <div>
      <UserInfo />
      <Section
        hasAccess={false}
        title="قائمة الطلبات"
        subtitle="متابعة الطلبات الحالية والطبقات السابقة"
        icon={<LuSettings2 className="text-[20px]" />}
        link="/orders"
      />
      <Section
        title="المفضلة"
        icon={<TbHeart className="text-[20px]" />}
        link="/faivorates"
      />
      <Container>
        <div className="text-[16px] font-semibold mb-[16px] mr-[16px] mt-[14px]">
          سياسات التطبيق
        </div>
      </Container>
      <ThreeSection
        titles={[" التوصيل", " الدفع", " الاسترجاع"]}
        links={["/policies/delivery", "/policies/payments", "/policies/refund"]}
        icons={[
          <FaTruck className="text-[20px]" />,
          <MdOutlinePayment className="text-[20px]" />,
          <TbCreditCardRefund className="text-[20px]" />,
        ]}
      />
      <Container>
        <div className="text-[16px] font-semibold mt-[16px] mr-[16px]">
          تواصل معنا
        </div>
      </Container>
      <Section
        title={"التواصل مع الدعم"}
        icon={<BiSupport className="text-[20px]" />}
        link="/contactUs"
      />
      <TwoSection
        titles={["فيسبوك", "انستغرام"]}
        links={[
          "https://www.facebook.com/karada.gaming/",
          "https://www.instagram.com/karada.store.elc",
        ]}
        icons={[
          <FaFacebook className="text-[20px]" />,
          <FaInstagram className="text-[20px]" />,
        ]}
      />

      <Section
        hasAccess={false}
        title={<span className="text-[#ff0000]">تسجيل خروج</span>}
        icon={<LuLogOut className="text-[26px] text-[#ff0000]" />}
        action={"logout"}
      />
      <div className="pt-[100px]"></div>
    </div>
  );
}
