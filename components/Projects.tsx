// components/Projects.tsxus
'use client'
import Image from 'next/image';
import { projectsSection } from '..'; // 1. استيراد البيانات
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // 1. استيراد ScrollTrigger

// 2. تسجيل إضافة ScrollTrigger (يجب القيام به مرة واحدة)
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    const cards = gsap.utils.toArray('.project-card');
    gsap.to('#title',{opacity:1, duration:1.0})

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 50, // ستبدأ من 50 بكسل للأسفل
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.8, // تأخير 0.1 ثانية بين كل بطاقة

        scrollTrigger: {
          trigger: el, // الحاوية هي الـ "trigger"
          start: 'top 80%', // ابدأ الأنيميشن عندما يصل أعلى الحاوية إلى 80% من الشاشة
          toggleActions: 'play none none none', // شغل الأنيميشن مرة واحدة
        },
      }
    );

    // لا تنسى تنظيف الـ trigger عند إلغاء تحميل المكون
    return () => {
      ScrollTrigger.killAll();
    };
  }, []); // المصفوفة الفارغة تعني أن هذا الكود سيعمل مرة واحدة عند التحميل

  return (
    <section
      id="projects"
      ref={sectionRef} // 7. ربط الـ ref بالعنصر
      className="py-20 sm:py-32 bg-white dark:bg-gray-950 -translate-x-13 lg:translate-x-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id='title' className="text-5xl opacity-0 font-bold tracking-tight text-center text-purple-700 dark:text-purple-400 mb-16">
          منتجاتنا
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projectsSection.map((item) => (
            <div
              key={item.title}
              // 8. إضافة الكلاس "project-card" لكي يعثر عليه GSAP
              className="project-card relative flex h-96 flex-col 
              justify-end rounded-2xl shadow-lg overflow-hidden
              
              "
            >
              {/* لم نعد بحاجة لتأثيرات الـ hover الخاصة بـ Tailwind هنا لأن GSAP يتولى الظهور */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: 'cover' }}
                className="z-0  bg-gradient-to-t from-black/70 to-transparent
               hover:from-black/90 hover:scale-[1.1] duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-right
               bg-gradient-to-t from-black/70 to-transparent
               hover:from-black/90 hover:scale-[1.1] duration-300 ">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
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