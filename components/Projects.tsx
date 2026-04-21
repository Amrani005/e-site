import Link from 'next/link';
import { db } from "@/lib/db";
import { Package } from 'lucide-react';

export default async function Projects() {
// 1. Fetch products from the database
const products = await db.product.findMany({
orderBy: {
createdAt: 'desc'
}
});

return (
<section id="projects" className=" sm:py-32 w-full font-tajawal relative" dir="rtl">
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

    {/* Apple-Style Section Header - Refocused on Green */}
    <div className="flex flex-col items-center justify-center text-center
     mb-16 space-y-4">
      <span className="text-2xl font-bold tracking-widest text-emerald-600
       dark:text-emerald-400 uppercase">
        المكتبة
      </span>
      <h2 className="text-5xl md:text-7xl font-black text-slate-900 ">
        أحدث <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-300 to-green-600">الإصدارات</span>
      </h2>
      <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mt-4 leading-relaxed">
        اكتشف مجموعتنا المختارة بعناية. كتب تلهم العقل وتثري الروح، مصممة لتجربة قراءة لا تُنسى.
      </p>
    </div>
    
    {/* Refined Grid Layout - Optimized for Mobile Density (2 cols) */}
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {products.length > 0 ? (
        products.map((product) => (
          <div 
            key={product.id} 
            className="group flex flex-col bg-slate-50/50 shadow-2xl
             dark:bg-white/5 backdrop-blur-xl rounded-2xl
              sm:rounded-[2.5rem] overflow-hidden border
               border-slate-200/50 dark:border-white/10 transition-all
                duration-500 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] hover:-translate-y-2"
          >
            {/* Image Area - Responsive margins for mobile density */}
            <div className="relative aspect-[3/4] overflow-hidden
             bg-slate-200 m-2 sm:m-3 rounded-xl
              sm:rounded-[2rem] ">
              <img 
                src={product.imageUrl}
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              
              {/* Subtle Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Minimalist Green Badge */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 dark:bg-black/60 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/20">
                <span className="text-[10px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-400">وصل حديثاً</span>
              </div>
            </div>

            {/* Content Area - Optimized Padding for Mobile */}
            <div className="p-4 sm:p-6 sm:pt-4 flex flex-col flex-grow">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-slate-900 dark:text-white line-clamp-1 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                {product.name}
              </h3>
              
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 mb-5 sm:mb-8 flex-grow leading-relaxed">
                {product.description || "اكتشف متعة القراءة مع هذا الإصدار المميز المتوفر الآن في متجرنا."}
              </p>
              
              {/* Price & Action Row - Refined Vertical Padding */}
              <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-200/50 dark:border-white/10 mt-auto">
                <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-0.5 sm:mb-1">
                    السعر
                  </span>
                  <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    {product.price} <span className="text-xs sm:text-sm font-medium text-slate-500">DZD</span>
                  </span>
                </div>
                
                {/* Modern Pill Button - Green Hover State */}
                <Link 
                  href={`/productinfo/${product.id}`}
                  className="flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-transform duration-300 hover:scale-105 active:scale-95 shadow-md"
                >
                  التفاصيل
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        /* Premium Empty State */
        <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-white/5 rounded-[3rem] border border-slate-200/50 dark:border-white/10 border-dashed">
          <div className="h-24 w-24 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center mb-6">
            <Package className="w-10 h-10 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">المكتبة قيد التجهيز</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">
            لا توجد إصدارات متاحة في الوقت الحالي. نحن نعمل على إحضار أفضل الكتب قريباً!
          </p>
        </div>
      )}
    </div>
  </div>
</section>
);
}