import Link from 'next/link';
import { db } from "@/lib/db";

export default async function Projects() {
  
  
      // 1. جلب المنتجات من الداتابيز

    const  products = await db.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }

    
   });
  
  

  return (
    <section id="projects" className="py-20  bg-transparent font-tajawal">
      <div className="  -translate-x-2.5 sm:px-6 lg:px-8">
        
        <h2 id='title' className="text-6xl lg:text-8xl font-black text-center mb-16 text-orange-700 dark:text-orange-400">
          منتجاتنا
        </h2>
        
        <div className=" lg:grid grid grid-cols-2  flex-col sm:grid 
        md:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group flex flex-col bg-white  backdrop-blur-sm 
               overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2
                transition-all duration-300 border border-zinc-100 "
            >

              {/* Image Area */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  // 2. التصحيح هنا: نستخدم رابط الصورة القادم من المنتج مباشرة
                  // ونقوم بتصحيح الشرطات المائلة لتجنب مشاكل الويندوز
                  src={product.imageUrl}
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-purple-700">
                  كتاب جديد
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 dark:text-white line-clamp-1">
                  {product.name}
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-6 flex-grow">
                  {product.description || "اكتشف متعة القراءة مع هذا الإصدار المميز المتوفر الآن في متجرنا."}
                </p>
                
                <div className="flex flex-col lg:flex-row lg:justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">السعر</span>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      {product.price} DZD
                    </span>
                  </div>
                  
                  <Link 
                    href={`/productinfo/${product.id}`}
                    className="bg-orange-600 text-white py-3 px-6 rounded-xl
                     font-semibold hover:bg-orange-700 shadow
                       shadow-lg transition-all 
                      active:scale-95  hover:translate-y-2 hover:shadow-orange-600"
                  >
                    تفاصيل
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};