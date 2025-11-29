'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
// 1. Import Arrow icons for the slider
import { ArrowRight, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'; 

const ProductInfo = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  
  // 2. New State for the Image Slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const title = searchParams.get('title');
  const price = searchParams.get('price');
  
  // 3. Logic to handle multiple images from the URL
  // We assume images are passed like: ?image=url1,url2,url3
  const rawImage = searchParams.get('image');
  const images = rawImage ? rawImage.split(',') : [];

  const description = searchParams.get('description');

  const handleCheckout = () => {
    if (!selectedSize) {
      setMessage("الرجاء اختيار المقاس أولاً!");
      return;
    }
  };

  const handleAddToCart = () => {
    const product = {
      id: id,
      title,
      price,
      image: images[0], // Save the first image as the main thumbnail
      description,
      quantity: 1,
      size: selectedSize
    };
    const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = oldCart.findIndex((item: any) => item.id === id);
    if (existingItemIndex > -1) {
      alert("المنتج موجود بالفعل في السلة!");
    } else {
      oldCart.push(product);
      alert("تمت الإضافة إلى السلة!");
    }
    localStorage.setItem("cart", JSON.stringify(oldCart));
  };

  const handleSelectedSize = (size: string) => {
    setSelectedSize(size);
  };

  // 4. Slider Navigation Functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 sm:py-32 bg-transparent  min-h-screen text-black -translate-x-10 lg:translate-x-0 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link
          href="/"
          className="flex items-center gap-2 text-purple-400 font-medium mb-8 group w-fit"
        >
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>الرجوع إلى المنتجات</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 translate-x-5 lg:translate-x-0 gap-12 items-start">
          
          {/* 5. Image Slider Container */}
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl shadow-lg overflow-hidden group">
            
            {images.length > 0 ? (
              <>
                {/* The Image */}
                <img
                  src={images[currentImageIndex]}
                  alt={title || 'Product Image'}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                />

                {/* Show arrows only if there is more than 1 image */}
                {images.length > 1 && (
                  <>
                    {/* Previous Button (Left) */}
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Next Button (Right) */}
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots Indicator (Optional - shows which image is active) */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <p className="text-white">لا توجد صورة</p>
              </div>
            )}
          </div>

          <div className="flex flex-col h-full pt-4 text-right">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-purple-400 mb-6">
              {title || 'اسم المنتج'}
            </h2>
            <p className="text-4xl font-semibold text-black dark:text-white mb-6">
              {price ? `${price} د.ج` : 'السعر غير متوفر'}
            </p>
            
            <div className='flex gap-5 m-10'>
              {/* Add size buttons here if needed */}
            </div>

            <button
              onClick={() => { handleAddToCart() }}
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
            {!selectedSize &&
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