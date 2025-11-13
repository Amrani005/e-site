// components/Portfolio.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // السهم يشير لليسار في RTL
import {  portfolioSection } from '..'; // 1. استيراد البيانات

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 sm:py-32
     bg-white dark:bg-gray-950 font-tajawal font-bold">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. العنوان من الإعدادات */}
        <h2 className="text-5xl font-extrabold tracking-tight text-center
         text-purple-600 dark:text-white mb-16">
          أعمالنا السابقة
        </h2>

        {/* 2. شبكة البطاقات باستخدام .map() */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioSection.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white dark:bg-gray-850 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* الصورة */}
              <div className="relative w-full h-56">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="bg-gray-200"
                />
              </div>

              {/* المحتوى */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* الوسوم (Tags) */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. زر "عرض جميع الأعمال" */}
        <div className="text-center mt-16">
          <Link
            href="/portfolio" // رابط لصفحة كل الأعمال
            className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-purple-700"
          >
            <span>عرض جميع الاعمال</span>
            <ArrowLeft size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;