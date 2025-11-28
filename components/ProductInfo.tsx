'use client';
import React, { use, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'; // 1. Link موجود
// 2. تم حذف Image
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { button, div } from 'motion/react-client';
import { sizes } from '..';
import { useState } from 'react';




const ProductInfo = () => {

  const [selectedSize, setSelectedSize] = useState<string | null>(null); 
  const [message,setMessage] = useState<string>('');

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const title = searchParams.get('title');
  const price = searchParams.get('price');
  const image = searchParams.get('image');
  const description = searchParams.get('description');

  const handleCheckout = ()=> {
    if(!selectedSize){
      setMessage("الرجاء اختيار المقاس أولاً!");
      return;
    }
  }
  

  // ... (دالة handleAddToCart - لا تغيير)
  const handleAddToCart = () => {
    const product = { 
      id: id, title, price, image, description, quantity: 1,size:selectedSize
    };
    const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = oldCart.findIndex((item: any) => item.id === id);
    if (existingItemIndex > -1 ) {
      alert("المنتج موجود بالفعل في السلة!");
    } else {
      oldCart.push(product);
      alert("تمت الإضافة إلى السلة!");
    }
    localStorage.setItem("cart", JSON.stringify(oldCart));
  };
  
  const handleSelectedSize = (size:string) =>{
    
      setSelectedSize(size);
    
    
  }
  
  

  return (
    <section className="py-20 sm:py-32 bg-transparent dark:bg-gray-800 min-h-screen text-black 
    -translate-x-10 lg:translate-x-0 mt-20 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link // 3. Link موجود
          href="/"
          className="flex items-center gap-2  text-purple-400 font-medium mb-8 group w-fit"
        >
          {/* الكلاس الكامل هنا */}
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1"/>
          <span>الرجوع إلى المنتجات</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 translate-x-5 lg:translate-x-0 gap-12 items-start">
          
          {/* 4. الحل: استخدام <img> العادي */}
          <div className="relative w-full h-[300px]  sm:h-[400px] lg:h-[500px] rounded-2xl shadow-lg overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={title || 'Product Image'}
                className="w-full h-full object-cover" // 5. كلاسات لجعله يملأ المساحة
              />
            ) : (
              // الكلاس الكامل هنا
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <p>لا توجد صورة</p>
              </div>
            )}
          </div>

          {/* الكلاس الكامل هنا */}
          <div className="flex flex-col h-full pt-4 text-right">
            {/* الكلاس الكامل هنا */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-purple-400 mb-6">
              {title || 'اسم المنتج'}
            </h2>
            {/* الكلاس الكامل هنا */}
            <p className="text-4xl font-semibold text-black mb-6">
              {price ? `${price} د.ج` : 'السعر غير متوفر'}
            </p>
            {/* الكلاس الكامل هنا */}
            <div className='flex gap-5 m-10'>
              {sizes.map((item)=>(
                
                <span key={item.size} className={`border-2 border-zinc-300 
                   w-20 h-20 rounded-full p-4 bg-zinc-200 text-black text-3xl
                 hover:text-purple-400 duration-300 font-bold flex 
                  items-center justify-center cursor-pointer ${selectedSize === item.size
                  ?
                  'border-purple-400 text-purple-400 ring-4 ring-purple-300'
                  :
                 'border-zinc-300 hover:border-purple-400 hover:text-purple-400'}`} 
                   onClick={()=>handleSelectedSize(item.size)}>
                  {item.size}
                </span>
              
                
              ))}

            </div>
            {/* الكلاس الكامل هنا */}
            <button
              onClick={()=> {selectedSize ? handleAddToCart() : handleCheckout}}
              className="mt-auto w-full flex items-center justify-center gap-3 
                         px-8 py-4 bg-purple-700 text-white
                         text-lg font-semibold rounded-xl shadow-lg
                         hover:bg-purple-800 focus:outline-none focus:ring-4
                         focus:ring-purple-300 dark:focus:ring-purple-800
                         transition-all duration-300 transform hover:-translate-y-1"
            >
              <ShoppingCart className="h-6 w-6" />
              <span>إضافة إلى السلة</span>
            </button>
            { !selectedSize &&
             <div className='mt-4 text-center text-lg text-red-500'>
              {message}
             </div>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;