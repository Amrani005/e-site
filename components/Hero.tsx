'use client'
import { motion } from 'framer-motion';
import { AuroraBackground } from './ui/AuroraBackground';

const Hero = () => {
  return (
   
      <section 
        className="relative w-full min-h-screen flex flex-col items-center
         justify-center p-5 sm:px-6 lg:mt-20 mt-20 overflow-hidden 
         text-center md:-mb-10 mb-5 lg:-mb-10  "
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80') ",
          }}
        dir="rtl"
      >
        <div className="absolute inset-0  backdrop-blur z-0 pointer-events-none"></div>

        <div className="z-10 flex flex-col items-center justify-center
         w-full max-w-5xl mx-auto space-y-10">
          
          {/* 1. Ultra-Minimalist Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center mt-20 gap-2 px-5 py-2 rounded-full bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 backdrop-blur-xl"
          >
            <span className="text-xs sm:text-sm  font-semibold text-slate-900  tracking-wide">
              الإصدار الجديد ٢٠٢٦
            </span>
            <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
          </motion.div>

          {/* 2. Massive, Bold "Apple-esque" Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white leading-tight md:leading-none font-tajawal">
              المعرفة.
            </h1>
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl
             font-black text-transparent bg-clip-text bg-gradient-to-b
              from-green-600 to-green-300 leading-tight md:leading-none font-tajawal pb-2">
              أُعيد تصورها.
            </h2>
          </motion.div>

          {/* 3. Balanced, Muted Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-slate-300 dark:text-slate-400 max-w-2xl leading-relaxed font-medium"
          >
            استكشف متجرنا الذي صمم ليوفر لك تجربة  قراءة وشراء استثنائية وبسيطة.
          </motion.p>

          {/* 4. Apple-Style Call to Actions (Pill shaped, simple, high contrast) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a href='#projects' className="w-full sm:w-auto px-8 py-4 bg-slate-900
             dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-transform duration-300 shadow-lg">
              ابدأ الاستكشاف
            </a>
            <a  href='#projects' className="group w-full sm:w-auto px-8 py-4 flex
              items-center justify-center gap-2 hover:text-slate-900
              rounded-full font-bold text-lg hover:bg-slate-100
              transition-colors duration-300 text-white">
              <span>تعرف على المزيد</span>
              <svg 
                className="w-5 h-5 transform rotate-180 transition-transform group-hover:-translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-16 mt-8 border-t border-slate-200/50 dark:border-white/10 w-full max-w-3xl"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-white">4.9</p>
              <p className="text-sm text-slate-200 mt-1">تقييم القراء</p>
            </div>
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-800 hidden sm:block"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white ">+50k</p>
              <p className="text-sm text-slate-200 mt-1">عنوان متاح</p>
            </div>
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-800 hidden sm:block"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white ">٢٤/٧</p>
              <p className="text-sm text-slate-200 mt-1">دعم متواصل</p>
            </div>
          </motion.div>
          
        </div>
      </section>
    
  );
};

export default Hero;