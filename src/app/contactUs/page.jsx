import React from "react";
import { MdWhatsapp , MdLocationOn , MdFacebook , MdOutlineNorthWest} from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12 p-4 mb-6">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-2xl font-bold text-center text-gray-700 ml-4 mb-3">
          كرادة ستور
        </h1>

        <p className="text-center text-gray-500 pt-0.5">
          وجهتكم المفضلة لشراء أحدث المنتجات التقنية!
        </p>
        <p className="text-center text-gray-500 mb-3">
          استكشف مجموعتنا الواسعة من المنتجات عالية الجودة وتابع أحدث اتجاهات
          التكنولوجيا!
        </p>
        <p className="text-center text-gray-500 mb-3">
          يمكنك الاتصال بنا من خلال الأرقام والمنصات المعروضة،
          <br /> سيقوم فريقنا بالتواصل معك في أقرب وقت ممكن
          <br /> أو زيارتنا في فرعنا
        </p>
      </div>
      <div className="w-full max-w-[450px] mx-auto bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold text-gray-700 mb-4">العنوان</h2>
        <a
          href="https://maps.app.goo.gl/gTsAkKSuJDC3o5vs9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-500 underline"
        >
          <MdLocationOn className="text-orange-500" />
          كرادة داخل / مقابل محطة وقود أبو أقلام
        </a>
      </div>
      <div className="max-w-[450px] w-full bg-white p-4 rounded-lg shadow-lg mt-5">
        <h2 className="text-lg font-bold text-gray-700 mb-4">أرقام الهاتف</h2>

        <ul className="space-y-4">
          <li className="border-b pb-3">
            <h3 className="text-md font-semibold text-gray-700">
              قسم الكيمنك
            </h3>
            <div className="flex items-center text-gray-600">
              <MdWhatsapp className="text-green-500 text-lg" />
              <p className="mr-2">
                07704772836
              </p>
              <a
              href="https://wa.me/9647704772836"
              className="mr-auto"
              target="_blank"
              rel="noopener noreferrer"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 ">
                <MdOutlineNorthWest className="text-[#25D366] text-lg" />
              </div>
              </a>
            </div>
          </li>

          <li className="border-b pb-3">
            <h3 className="text-md font-semibold text-gray-700">
              قسم الهواتف
            </h3>
            <div className="flex items-center text-gray-600">
              <MdWhatsapp className="text-green-500 text-lg" />
              <p className="mr-2">
                07740300006
              </p>
              <a
                href="https://wa.me/9647740300006"
                className="mr-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 mr-auto">
                <MdOutlineNorthWest className="text-[#25D366] text-lg" />
              </div>
              </a>
            </div>
          </li>

          <li>
            <h3 className="text-md font-semibold text-gray-700">
              قسم الصيانة
            </h3>
            <div className="flex items-center text-gray-600">
              <MdWhatsapp className="text-green-500 text-lg" />
              <p className="mr-2">07722229656</p>
              <a
                href="https://wa.me/9647722229656"
                className="mr-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                 <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 mr-auto">
                <MdOutlineNorthWest className="text-[#25D366] text-lg" />
              </div>
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="max-w-[450px] w-full bg-white p-4 rounded-lg shadow-lg mt-5">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          مواقع التواصل الاجتماعي
        </h2>
        <ul className="space-y-4">
          <li className="flex items-center text-gray-600">
            <FaInstagram className="text-pink-500 text-lg" />
            <a
              href="https://www.instagram.com/karada.store.elc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="mr-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              انستغرام
            </a>
          </li>
          <li className="flex items-center text-gray-600">
            <MdFacebook className="text-blue-500 text-lg" />
            <a
              href="https://www.facebook.com/karada.gaming"
              className="mr-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              فيسبوك
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
