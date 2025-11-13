// components/Faq.tsx
'use client'; // 1. هذا المكون "عميل" لإدارة الحالة (State)
import { useState } from 'react';
import {  faqSection } from '..';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn'; // لاستخدام دالة cn لدمج الكلاسات

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-32 bg-white
     dark:bg-gray-900 -translate-x-13 lg:translate-x-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-5xl font- font-bold tracking-tight text-center text-purple-700 dark:text-purple-400 mb-16">
          الأسئلة الشائعة
        </h2>

        <div className="space-y-4">
          {faqSection.map((item, index) => (
            <div
              key={item.question}
              className="rounded-2xl bg-white dark:bg-gray-850 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* زر السؤال (الرأس) */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex justify-between items-center text-right p-6 font-semibold text-xl text-gray-900 dark:text-white"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "transition-transform duration-300",
                    openIndex === index ? "rotate-180" : "rotate-0" // تدوير السهم
                  )}
                  size={24}
                />
              </button>

              
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100" // إذا كان مفتوحاً
                    : "grid-rows-[0fr] opacity-0" // إذا كان مغلقاً
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;