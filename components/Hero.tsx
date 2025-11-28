import React from 'react';
import { AuroraBackground } from './ui/AuroraBackground';
// import Link from 'next/link'; // Replaced with <a> for preview
// import Image from 'next/image'; // Replaced with <img> for preview

// هذا هو مكون الهيرو الاحترافي الذي طلبته
const Hero = () => {
  return (
    // حاوية القسم، مع خلفية رمادية فاتحة ودعم للوضع الداكن
    
      <AuroraBackground>
        <section className="h-full dark:bg-transparent mt-50 font-tajawal -translate-x-5 lg:translate-x-0 " dir="rtl">
        <div className=" w-full  px-6 py-16 lg:py-24">
        {/* نستخدم grid لتنسيق الشاشات الكبيرة (عمودين) والصغيرة (عمود واحد) */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          {/* 1. قسم المحتوى النصي */}
          <div className="flex flex-col justify-center text-center lg:text-right">
            {/* عنوان فرعي صغير */}
           <span className="text-sm font-semibold uppercase text-blue-500 dark:text-blue-400">
الموسم الدراسي الجديد              
           </span>
            
            {/* العنوان الرئيسي الكبير */}
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              طريق النجاح والتفوق <br /> يبدأ بكتاب
            </h1>
            
            {/* وصف قصير */}
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0 lg:ml-auto">
              اكتشف مجموعتنا المختارة من الكتب التعليمية والمصادر الموثوقة التي تضمن لأطفالك مستقبلاً مشرقاً وتفوقاً دراسياً مستمراً.
            </p>
            
            {/* زر الدعوة للعمل (CTA) */}
            <div className="mt-10">
              {/* تم استبدال <Link> بـ <a> لكي تعمل في بيئة المعاينة */}
              <a
                href="/collection/new-arrivals"
                className="inline-block rounded-full bg-gray-900 px-10
                 py-4 text-lg font-semibold text-white 
                 transition-transform duration-300 hover:scale-105
                  hover:bg-gray-700 dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                تسوق الآن
              </a>
            </div>
          </div>

          {/* 2. قسم الصورة */}
          {/* حاوية الصورة بارتفاع ثابت وموضع 'relative' لاستخدام 'fill' */}
          <div className="relative h-full w-full rounded-2xl shadow-2xl lg:h-full min-h-[500px]">
            {/* تم استبدال <Image> بـ <img> عادي لعرض المعاينة
              في مشروع Next.js حقيقي، يجب إعادة استخدام <Image>
            */}
            <img
              src="kotob.jpeg"
              alt="عارضة أزياء ترتدي ملابس عصرية"
              // لقد أضفنا الكلاسات التالية لتقليد سلوك 'fill' و 'object-cover'
              className="rounded-2xl absolute inset-0 w-full h-full 
              object-cover"
            />
          </div>
        </div>
      </div >
      </section>
      </AuroraBackground>
     
    
  );
};

export default Hero;