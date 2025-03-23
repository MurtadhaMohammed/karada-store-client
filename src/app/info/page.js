import { Section } from "./section/section";
import { LuSettings2, LuLogOut } from "react-icons/lu";
import { TbHeart, TbCreditCardRefund } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import UserInfo from "./user/user";
import { FaTruck } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";

export default async function Info() {
  return (
    <div>
      <UserInfo />
      <Section
        hasAccess={false}
        title="قائمة الطلبات"
        subtitle="متابعة الطلبات الحالية والطبقات السابقة"
        icon={<LuSettings2 className="text-[28px]" />}
        link="/orders"
      />
      <Section
        title="المفضلة"
        icon={<TbHeart className="text-[28px]" />}
        link="/faivorates"
      />
      <Section
        title={"التواصل مع الدعم"}
        icon={<BiSupport className="text-[26px]" />}
        link="/contactUs"
      />
      <Section
        title={"سياسة التوصيل"}
        icon={<FaTruck className="text-[26px]" />}
        link="/policies/delivery"
      />
      <Section
        title={"سياسة الدفع"}
        icon={<MdOutlinePayment className="text-[26px]" />}
        link="/policies/payments"
      />
      <Section
        title={"سياسة الإسرجاع "}
        icon={<TbCreditCardRefund className="text-[26px]" />}
        link="/policies/refund"
      />
      <Section
        hasAccess={false}
        title={<span className="text-[#ff0000]">تسجيل خروج</span>}
        icon={<LuLogOut className="text-[26px] text-[#ff0000]" />}
        action={"logout"}
      />
    </div>
  );
}
