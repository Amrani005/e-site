'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { db } from '@/lib/db';

export default  function Selections({products}:{products:any[]}){


  // Mock categories are kept as they are static filter options
 const mockCategories = [
  { id: 1, label: 'All' },
  { id: 2, label: 'New Arrivals' },
  { id: 3, label: 'Best Sellers' },
  { id: 4, label: 'Discounted' },
];


  // 2. useEffect for fetching products
  
    

  // --- Render Logic ---

  

  return (
    <div className="min-h-screen w-full -translate-x-10 lg:translate-x-0  p-4 lg:p-10 font-tajawal">
      
      {/* Header Section */}
      <div className="mb-10 text-center lg:text-left">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-5xl font-bold text-zinc-800"
        >
          Our Collection
        </motion.h1>
        <p className="mt-2 text-zinc-500">Curated styles just for you.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDEBAR: Filters & Categories */}
        <aside className="w-full lg:w-1/4 space-y-6">
          
          {/* Search Input UI (Kept as is) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm shadow-zinc-200">
            <h3 className="font-bold text-lg mb-4 text-zinc-700">Search</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search items..." 
                className="w-full p-3 pl-10 rounded-xl bg-zinc-50 border
                border-zinc-200 focus:outline-none focus:ring-2
                focus:ring-purple-500 transition-all"
              />
              <svg className="w-5 h-5 text-zinc-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          {/* Categories UI (Uses mockCategories) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm shadow-zinc-200">
            <h3 className="font-bold text-lg mb-4 text-zinc-700">Categories</h3>
            <ul className="space-y-3">
              {mockCategories.map((item) => (
                <li 
                  key={item.id} 
                  className="cursor-pointer group flex items-center
                    justify-between p-2 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                >
                  <span className="text-zinc-600 font-medium
                    group-hover:text-purple-700 transition-colors">
                    {item.label}
                  </span>
                  <span className="text-zinc-300 group-hover:text-purple-400 text-sm">→</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sort Dropdown UI (Kept as is) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm shadow-zinc-200">
             <h3 className="font-bold text-lg mb-4 text-zinc-700">Filter By</h3>
             <select className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer">
               <option value="default">Recommended</option>
               <option value="low-high">Price: Low to High</option>
               <option value="high-low">Price: High to Low</option>
             </select>
          </div>
        </aside>

        {/* RIGHT CONTENT: Product Grid */}
        <main className="w-full lg:w-3/4">
          
          <div 
             
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* --- CORE CHANGE: MAPPING OVER FETCHED 'products' --- */}
            {products.length > 0 ? (
                products.map((product) => (
                   <Link 
                                key={product.id}
                                href={`/productinfo/${product.id}`}
                                // التنسيق الأصلي 3:
                                className=" "
                              >
                    <motion.div 
                        initial={{ opacity: 0 ,y:100 }}
                        whileInView={{ opacity: 1,y:0 }}
                        transition={{ delay: 0.2 }}
                        key={product.id} 
                        className="flex group flex-col bg-white rounded-3xl overflow-hidden
                            shadow-sm hover:shadow-xl hover:shadow-purple-200/50 
                            transition-all duration-300 border border-zinc-100 
                            cursor-pointer"
                    >
                        {/* Image Area - Uses the first image from the WooCommerce object */}
                        <div className="h-64 bg-zinc-200 relative overflow-hidden">
                            {product.imageUrl && product.imageUrl.length > 0 ? (
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name}
                                    className='w-full h-full object-cover hover:scale-[1.1] duration-300' 
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                    No Image
                                </div>
                            )}
                            
                            {/* Hover Badge */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity">
                                Quick View
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-zinc-800 group-hover:text-purple-600 transition-colors">
                                    {product.name}
                                </h3>
                            </div>
                            
                            <div className="flex justify-between items-center mt-4">
                                {/* WooCommerce price is a string/number, rendered as is */}
                                <p className="text-xl font-bold text-zinc-900">
                                    {/* Format price to show currency if not already included */}
                                    {product.price ? `$${product.price}` : 'N/A'} 
                                </p>
                                
                                {/* Add Button */}
                                <button className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                  </Link>
                    
                ))
            ) : (
                <div className="col-span-full text-center py-10 text-zinc-600">
                    لا توجد منتجات متاحة حاليًا.
                </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
};





