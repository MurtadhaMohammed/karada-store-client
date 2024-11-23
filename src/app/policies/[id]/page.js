import Container from "@/components/UI/Container/container";
import Link from "next/link";

export default async function Policies({ params }) {

  const content = {
    privicy: (
      <section class=" bg-white shadow-lg rounded-lg p-8 mt-10">
        <h1 class="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
          سياسة الخصوصية
        </h1>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">مقدمة</h2>
        <p>
          في "متجر كَرادة"، نحن نلتزم بحماية خصوصية مستخدمينا. لا نقوم بجمع أي
          بيانات شخصية إلا عند الحاجة لتقديم الخدمة، مثل اسم المستخدم ورقم
          الهاتف أثناء إتمام الطلب.
        </p>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ١. جمع المعلومات
        </h2>
        <ul class="list-disc list-inside">
          <li>
            <strong>المعلومات التي نقوم بجمعها:</strong>
            <ul class="list-disc list-inside ml-5">
              <li>
                <strong>الاسم:</strong> نطلبه لتحديد هوية العميل أثناء الطلب.
              </li>
              <li>
                <strong>رقم الهاتف:</strong> نستخدمه للتواصل مع العميل بشأن
                الطلب.
              </li>
            </ul>
          </li>
          <li>
            نحن لا نجمع أي معلومات إضافية عن المستخدمين مثل الموقع، أو البريد
            الإلكتروني، أو بيانات الجهاز.
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٢. استخدام المعلومات
        </h2>
        <p>يتم استخدام الاسم ورقم الهاتف فقط للأغراض التالية:</p>
        <ul class="list-disc list-inside">
          <li>إتمام عملية الطلب والتواصل بشأنها.</li>
          <li>تحسين الخدمة من خلال ملاحظات العملاء.</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٣. حماية المعلومات
        </h2>
        <ul class="list-disc list-inside">
          <li>
            يتم تخزين المعلومات المقدمة بطريقة آمنة ومشفرة، ولا يتم مشاركتها مع
            أي أطراف خارجية إلا إذا تطلب الأمر الالتزام بالقانون.
          </li>
          <li>
            يتم حذف البيانات فور انتهاء المعاملة أو بناءً على طلب المستخدم.
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٤. حقوق المستخدمين
        </h2>
        <ul class="list-disc list-inside">
          <li>يحق للمستخدم طلب حذف أو تعديل بياناته عبر التواصل معنا.</li>
          <li>نلتزم بعدم استخدام بياناتك لأي أغراض تسويقية أو إعلانية.</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٥. الاتصال بنا
        </h2>
        <p>
          لأي استفسارات أو طلبات متعلقة بسياسة الخصوصية، يمكنك التواصل عبر
          البريد الإلكتروني:{" "}
          <a href="mailto:info@karadastore.com" class="text-blue-600 underline">
            info@karadastore.com
          </a>
          .
        </p>
      </section>
    ),

    refund: (
      <section class="bg-white shadow-lg rounded-lg p-8 mt-10">
        <h1 class="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
          سياسة الاسترجاع
        </h1>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">مقدمة</h2>
        <p>
          في "متجر كَرادة"، نحن نحرص على تقديم خدمة ممتازة وتجربة شراء مريحة.
          لذلك، نوفر سياسة استرجاع مرنة تضمن رضا العملاء وتلبية احتياجاتهم.
        </p>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ١. شروط الاسترجاع
        </h2>
        <ul class="list-disc list-inside">
          <li>
            يمكن استرجاع المنتجات خلال فترة <strong>7 أيام</strong> من تاريخ
            استلامها.
          </li>
          <li>
            يجب أن يكون المنتج في حالته الأصلية وغير مستخدم، مع جميع الملحقات
            والتغليف.
          </li>
          <li>يجب تقديم إيصال الشراء أو إثبات الطلب عند طلب الاسترجاع.</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٢. المنتجات غير القابلة للاسترجاع
        </h2>
        <ul class="list-disc list-inside">
          <li>المنتجات المفتوحة أو المستخدمة.</li>
          <li>المنتجات التالفة نتيجة سوء الاستخدام.</li>
          <li>
            المنتجات التي تنتمي إلى فئة العروض الخاصة أو التصفية (ما لم تكن
            تالفة).
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٣. عملية الاسترجاع
        </h2>
        <ul class="list-disc list-inside">
          <li>
            يمكن تقديم طلب استرجاع من خلال التواصل معنا عبر البريد الإلكتروني أو
            رقم الهاتف.
          </li>
          <li>
            سيتم التحقق من الطلب والرد خلال <strong>48 ساعة</strong>.
          </li>
          <li>في حالة الموافقة، سيتم إرشادك لإعادة المنتج إلى عنوان المتجر.</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٤. استرداد الأموال
        </h2>
        <ul class="list-disc list-inside">
          <li>
            يتم استرداد الأموال بنفس طريقة الدفع الأصلية خلال{" "}
            <strong>7 أيام عمل</strong> من تاريخ استلام المنتج المرتجع.
          </li>
          <li>قد يتم خصم رسوم شحن أو رسوم إعادة تعبئة حسب الحالة.</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٥. الاتصال بنا
        </h2>
        <p>
          لأي استفسارات أو طلبات متعلقة بسياسة الاسترجاع، يمكنك التواصل عبر
          البريد الإلكتروني:{" "}
          <a href="mailto:info@karadastore.com" class="text-blue-600 underline">
            info@karadastore.com
          </a>
          {/* أو الاتصال بنا عبر الرقم <strong>+964 123 456 789</strong>. */}
        </p>
      </section>
    ),

    payments: (
      <section class="bg-white shadow-lg rounded-lg p-8 mt-10">
        <h1 class="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
          سياسة الدفع
        </h1>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">مقدمة</h2>
        <p>
          في "متجر كَرادة"، نسعى لتوفير خيارات دفع سهلة وآمنة لضمان راحة عملائنا
          وثقتهم أثناء إجراء المعاملات المالية.
        </p>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ١. طرق الدفع المقبولة
        </h2>
        <ul class="list-disc list-inside">
          <li>الدفع عند الاستلام (COD).</li>
          <li>الدفع الإلكتروني باستخدام البطاقات البنكية (فيزا/ماستر كارد).</li>
          <li>التحويلات البنكية المباشرة (في حالة الطلبات الكبيرة).</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٢. تفاصيل الدفع عند الاستلام
        </h2>
        <ul class="list-disc list-inside">
          <li>
            يمكن للعملاء اختيار الدفع عند استلام الطلب لضمان سهولة ومرونة
            الشراء.
          </li>
          <li>
            يلتزم العميل بتوفير المبلغ المطلوب عند تسليم المنتج من قبل شركة
            الشحن أو المندوب.
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٣. الدفع الإلكتروني
        </h2>
        <ul class="list-disc list-inside">
          <li>
            نحن نستخدم بوابات دفع آمنة معتمدة لضمان حماية بيانات العميل أثناء
            إجراء الدفع.
          </li>
          <li>جميع المعاملات المالية تتم باستخدام تقنيات التشفير الحديثة.</li>
          <li>
            في حالة فشل المعاملة أو وجود مشكلة، يمكن للعميل التواصل معنا لحل
            المشكلة في أقرب وقت ممكن.
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٤. سياسة الاسترداد
        </h2>
        <ul class="list-disc list-inside">
          <li>
            يتم استرداد المدفوعات بنفس طريقة الدفع الأصلية خلال{" "}
            <strong>7 أيام عمل</strong> من الموافقة على طلب الاسترداد.
          </li>
          <li>
            يجب أن يكون المنتج في حالته الأصلية ومؤهلاً للاسترداد وفقًا لسياسة
            الاسترجاع.
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٥. الاتصال بنا
        </h2>
        <p>
          لأي استفسارات أو مشاكل متعلقة بالدفع، يمكنك التواصل عبر البريد
          الإلكتروني:{" "}
          <a href="mailto:info@karadastore.com" class="text-blue-600 underline">
            info@karadastore.com
          </a>
          {/* أو الاتصال بنا عبر الرقم <strong>+964 123 456 789</strong>. */}
        </p>
      </section>
    ),
    delivery: (
      <section class="bg-white shadow-lg rounded-lg p-8 mt-10">
        <h1 class="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
          سياسة التوصيل
        </h1>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">مقدمة</h2>
        <p>
          في "متجر كَرادة"، نلتزم بتوصيل المنتجات إلى عملائنا بأسرع وقت ممكن
          وبأفضل جودة ممكنة. تهدف سياسة التوصيل الخاصة بنا إلى ضمان تجربة شراء
          مريحة وسهلة.
        </p>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ١. مناطق التوصيل
        </h2>
        <ul class="list-disc list-inside">
          <li>نوفر التوصيل إلى جميع المحافظات داخل العراق.</li>
          <li>
            قد تختلف رسوم التوصيل وأوقات التوصيل بناءً على الموقع الجغرافي
            للعميل.
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٢. أوقات التوصيل
        </h2>
        <ul class="list-disc list-inside">
          <li>
            يتم توصيل الطلبات خلال <strong>2 إلى 5 أيام عمل</strong> من تاريخ
            تأكيد الطلب.
          </li>
          <li>
            قد تختلف أوقات التوصيل بناءً على توفر المنتج أو ظروف الشحن مثل
            العطلات الرسمية.
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٣. رسوم التوصيل
        </h2>
        <ul class="list-disc list-inside">
          <li>
            يتم احتساب رسوم التوصيل بناءً على موقع العميل ويتم عرضها أثناء عملية
            الشراء.
          </li>
          <li>للطلبات الكبيرة أو المخصصة، قد تطبق رسوم إضافية.</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٤. حالة المنتج عند التوصيل
        </h2>
        <ul class="list-disc list-inside">
          <li>
            يتم توصيل المنتجات بحالتها الأصلية مع تغليف آمن لضمان الحماية أثناء
            الشحن.
          </li>
          <li>
            إذا كان المنتج تالفًا عند الاستلام، يحق للعميل رفض الطلب أو طلب
            استبداله وفقًا لـ
            <Link href="/policies/refund" class="text-blue-600 underline">
              سياسة الاسترجاع
            </Link>
            .
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٥. تتبع الطلبات
        </h2>
        <ul class="list-disc list-inside">
          <li>
            يمكن للعملاء تتبع طلباتهم من خلال التواصل مع فريق خدمة العملاء عبر
            البريد الإلكتروني أو الهاتف.
          </li>
          <li>
            سنرسل تحديثات بخصوص حالة الطلب عبر الرسائل النصية أو البريد
            الإلكتروني.
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ٦. الاتصال بنا
        </h2>
        <p>
          لأي استفسارات أو مشاكل متعلقة بالتوصيل، يمكنك التواصل معنا عبر البريد
          الإلكتروني:{" "}
          <a href="mailto:info@karadastore.com" class="text-blue-600 underline">
            info@karadastore.com
          </a>
          {/* أو الاتصال بنا عبر الرقم <strong>+964 123 456 789</strong>. */}
        </p>
      </section>
    ),
  };

  return (
    <div className="pb-[100px]">
      <Container>{content[params?.id]}</Container>
    </div>
  );
}
