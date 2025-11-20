'use client'
import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {

  // Removed: pageContainer and sectionItem variants

  return (
    <motion.div
      className="  font-tajawal  -translate-x-10 lg:translate-x-0 "
      dir="rtl" // Set direction to Right-to-Left for Arabic
      // Removed: initial="hidden" and imate="visible"
    >
      {/* 1. HERO SECTION: Title and Motto */}
      <div className="flex flex-col translate-x-5 py-30 bg-gray-50  text-purple-600 translate-x-  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <motion.h1 
            // Removed: variants={sectionItem}
            className="text-5xl lg:text-7xl font-extrabold mb-4"
          >
            قصتنا
          </motion.h1>
          <motion.p 
            // Removed: variants={sectionItem}
            className="text-xl lg:text-2xl font-light opacity-90 max-w-3xl mx-auto"
          >
            نصنع مستقبل الموضة، قطعة استثنائية تلو الأخرى.
          </motion.p>
        </div>
      </div>

      {/* 2. MISSION & VALUES SECTION */}
      <div className="max-w-7xl mx-auto translate-x-5 py-16 px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-zinc-800 mb-4">
            مهمتنا
          </h2>
          <p className="text-lg text-zinc-600 max-w-4xl mx-auto">
            منذ تأسيسها في عام 2020، كان هدفنا دائمًا بسيطًا: دمج مواد مستدامة عالية الجودة مع تصميم عصري وبسيط. نحن نؤمن بأن الأناقة يجب ألا تتنازل عن الأخلاق أو الراحة.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div initial={{y:-20,opacity:0}}
        animate={{y:0,opacity:1}}>
             <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-purple-700 mb-3">النزاهة</h3>
            <p className="text-zinc-600">
              الالتزام بالشفافية في عمليات التوريد والإنتاج.
            </p>
          </motion.div>
          
          <motion.div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-purple-700 mb-3">الجودة</h3>
            <p className="text-zinc-600">
              ضمان أن كل منتج يلبي أعلى معايير الحرفية.
            </p>
          </motion.div>

          <motion.div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-purple-700 mb-3">الابتكار</h3>
            <p className="text-zinc-600">
              البحث المستمر عن طرق جديدة لتحسين التصميم والاستدامة.
            </p>
          </motion.div>
        </div>
        </motion.div>
       
      </div>
      
      {/* 3. HISTORY TIMELINE/IMAGE BLOCK */}
      <motion.div className="bg-white py-20 translate-x-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1"> 
            <h2 className="text-3xl lg:text-4xl font-bold text-zinc-800 mb-6">
              من مرآب صغير إلى علامة تجارية عالمية
            </h2>
            <p className="text-zinc-600 mb-4">
              لقد بدأ كل شيء بآلة خياطة بسيطة وتفانٍ في التصميم الخالد. لقد اهتدت رحلتنا بعملائنا وسعينا الدؤوب نحو الكمال في كل غرزة.
            </p>
            <ul className="space-y-3 text-zinc-700 mt-6">
              <li className="flex items-start">
                <span className="text-purple-600 font-bold ml-3 text-xl">✓</span>
                <span>إنتاج دفعات صغيرة لتقليل الهدر.</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold ml-3 text-xl">✓</span>
                <span>مواد ذات مصادر أخلاقية من موردين معتمدين.</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold ml-3 text-xl">✓</span>
                <span>مصممة من أجل طول العمر، وليس لمواكبة الموضة السريعة.</span>
              </li>
            </ul>
          </div>

          {/* Image Placeholder */}
          <div className="order-1 lg:order-2 mt-10 lg:mt-0"> 
            <div className="aspect-video bg-zinc-200 rounded-3xl flex items-center justify-center shadow-2xl shadow-zinc-300/50">
              <span className="text-zinc-500 text-lg">
                [صورة توضيحية: الفريق المؤسس/الورشة]
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. CALL TO ACTION (CTA) */}
      <motion.div className="py-16  text-center translate-x-5 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            انضم إلى الحركة
          </h2>
          <p className="text-lg text-zinc-600 mb-8">
            اكتشف أحدث مجموعتنا المستدامة واختبر الفرق بنفسك.
          </p>
          <a
            href="/selections" // Link to your Selections page
            className="inline-block px-8 py-3 text-lg font-bold rounded-full bg-purple-500 text-white hover:bg-purple-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            تسوق الآن
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;