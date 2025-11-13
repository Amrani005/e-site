// components/Projects.tsx
import Image from 'next/image';
import { projectsSection } from '..'; // 1. استيراد البيانات

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-950
      -translate-x-13 lg:translate-x-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold tracking-tight text-center text-purple-700 dark:text-purple-400 mb-16">
          منتجاتنا
        </h2>

        {/* الشبكة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projectsSection.map((item) => (
            // 1. الحاوية الرئيسية:
            // - "relative" لوضع النص فوقها
            // - "overflow-hidden" لقص زوايا الصورة
            // - نعطيها ارتفاع ثابت أو نسبة عرض إلى ارتفاع (هنا h-96)
            <div
              key={item.title}
              className="relative flex h-96 flex-col justify-end rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* 2. الصورة:
                - تملأ الحاوية بالكامل "fill"
                - "object-cover" لضمان ملء المساحة (قد يقص أجزاء من الصورة)
                - "z-0" لوضعها في الخلفية
              */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: 'cover' }}
                className="z-0"
              />

              {/* 3. حاوية النص: (هذا هو الجزء الأهم)
                - "absolute" لوضعها فوق الصورة
                - "bottom-0" لتثبيتها في الأسفل
                - "z-10" لوضعها فوق الصورة
                - "bg-gradient-to-t from-black/70" هذا يضيف تدرج أسود شفاف في الأسفل
                  لجعل النص الأبيض واضحاً حتى لو كانت الصورة فاتحة.
              */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-right bg-gradient-to-t from-black/70 to-transparent">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  {/* 4. السعر (بافتراض وجود item.price) */}
                  {item.price ? (
                    <p className="text-lg text-white font-medium">
                      {item.price} د.ج
                    </p>
                  ) : (
                    <p className="text-sm text-gray-200">السعر غير متوفر</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;