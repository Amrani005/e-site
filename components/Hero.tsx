'use client'
import { AuroraBackground } from './ui/AuroraBackground';
import { motion } from 'framer-motion'; // Highly recommended for modern UX

const Hero = () => {
  return (
    
      <section 
        className=" h-full flex items-center 
         overflow-hidden px-4  mt-30 " 
        dir="rtl"
      >
        <div className="container mx-auto h-full w-full  grid-cols-1 
        lg:grid-cols-2 gap-12 right-2.5 items-center relative z-10">
          
          {/* 1. Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className=" space-y-8  font-tajawal"
          >
            <div className="inline-flex items-center  gap-2 px-4 py-2
             rounded-full bg-blue-500/10 border border-blue-500/20
              text-blue-600 dark:text-blue-400 backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full
                 w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3
                 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium">وصل حديثاً: إصدارات 2026</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-slate-900
             dark:text-white leading-[1.15]">
              عالم من <span className="text-transparent bg-clip-text
               bg-gradient-to-l from-blue-600 to-cyan-500">المعرفة</span> <br />
              بين يديك
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300
             max-w-xl leading-relaxed">
              لا يقتصر متجرنا على بيع الكتب فحسب، بل نبني جسوراً نحو المستقبل. استكشف آلاف العناوين التعليمية والروائية المختارة بعناية لتلائم شغفك.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href='#projects'  className="px-8 py-4 bg-slate-900
               dark:bg-white dark:text-slate-900 text-white rounded-2xl 
               font-bold text-lg hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)
               ] transition-all duration-300 hover:-translate-y-1">
                تصفح المكتبة
              </a>
              <button className="px-8 py-4 bg-white/50 dark:bg-slate-800/50 
              backdrop-blur-md border border-slate-200 dark:border-slate-700
               rounded-2xl font-bold text-lg hover:bg-white dark:hover:bg-slate-800 
               transition-all duration-300">
                الأكثر مبيعاً
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-8 pt-8 border-t border-slate-200
             dark:border-slate-800">
              <div>
                <p className="text-2xl font-bold dark:text-white">+50k</p>
                <p className="text-sm text-slate-500">كتاب متاح</p>
              </div>
              <div>
                <p className="text-2xl font-bold dark:text-white">4.9/5</p>
                <p className="text-sm text-slate-500">تقييم القراء</p>
              </div>
            </div>
          </motion.div>

          {/* 2. Visual Section (The "Modern Store" feel) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Decorative Blobs */}
            <div className="absolute -top-20 -left-20 w-full h-full
             bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="relative z-10 group">
              <img
                src="kotob.jpeg"
                alt="Book Collection"
                className="rounded-[2rem] shadow-2xl transition-transform 
                duration-500 group-hover:scale-[1.02] border-4 border-white/20"
              />
              
              {/* Floating Card UI */}
              <div className="absolute bottom-6 -right-6 lg:-right-12
               bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl  
               p-6 rounded-2xl shadow-xl border border-white/20  
               md:block animate-bounce-slow hidden ">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-green-500/20 rounded-full flex
                   items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className='z-200'>
                    <p className="text-sm font-bold dark:text-white">توصيل سريع</p>
                    <p className="text-xs text-slate-500">لجميع مدن المملكة</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
   
  );
};

export default Hero;