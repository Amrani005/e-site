// components/Services.tsx
// 1. استيراد البيانات المقسمة
import { serviceSection } from "..";

const Services = () => {
  return (
    <section id="services" className="py-20 sm:py-32 bg-gray-50
     font-tajawal dark:bg-gray-900 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8  -translate-x-10 lg:-translate-x-0">
        {/* 2. استخدام العنوان من siteConfig */}
        <h2 className="text-5xl font-extrabold tracking-tight text-center text-purple-700 dark:text-purple-400 mb-16">
          خدماتنا
        </h2>

        {/* 3. استخدام .map() مباشرة على المصفوفة (كما طلبت) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
         gap-8">
          {serviceSection.map((item) => (
            <div
              key={item.title} // استخدام العنوان كـ key
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-gray-850 shadow-lg border border-gray-100 dark:border-gray-700 transform transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-purple-100 dark:bg-purple-800 p-4 rounded-full mb-6">
                {/* 4. استخدام مكون الأيقونة مباشرة من item */}
                <item.icon
                  size={40}
                  className="text-purple-600 dark:text-purple-300"
                />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;