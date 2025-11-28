'use client';
import Link from 'next/link'; // 1. next/link موجود
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap'; // 2. GSAP موجود
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface WooProduct {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
  description: string;
  slug: string;
  
}

const Projects = () => {
  const sectionRef = useRef(null);
  const [products, setProducts] = useState<WooProduct[]>([]);

  // ... (useEffect لجلب المنتجات - لا تغيير)
  useEffect(() => {
    const fetchProducts = async () => {
      const url = process.env.NEXT_PUBLIC_WOO_URL;
      const key = process.env.NEXT_PUBLIC_WOO_KEY;
      const secret = process.env.NEXT_PUBLIC_WOO_SECRET;
      if (!url || !key || !secret) {
        console.error("WooCommerce API Keys غير موجودة في .env.local");
        return;
      }
      try {
        const response = await fetch(
          `${url}/wp-json/wc/v3/products?consumer_key=${key}&consumer_secret=${secret}`
        );
        const data: WooProduct[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("فشل في جلب المنتجات:", error);
      }
    };
    fetchProducts();
  }, []);

  // ... (useEffect الخاص بـ GSAP - لا تغيير)
  useEffect(() => {
    if (products.length === 0) return; 
    const el = sectionRef.current;
    if (!el) return;
    setTimeout(() => {
      const cards = gsap.utils.toArray('.project-card');
      const titleAnim = gsap.fromTo('#title',{opacity:0, y:100},{opacity:1,y:0,duration:1.2});
      let cardAnim: gsap.core.Tween | null = null;
      if (cards.length > 0) {
        cardAnim = gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1.5, ease: 'power2.out', stagger: 0.8,
            scrollTrigger: { 
              trigger: el, 
              start: 'top 80%', 
              toggleActions: 'play none none none' 
            },
          }
        );
      }
      return () => {
        titleAnim.scrollTrigger?.kill();
        cardAnim?.scrollTrigger?.kill();
      };
    }, 100); 
  }, [products]);

  return (
    // التنسيق الأصلي 1:
    <section
      id="projects"
      ref={sectionRef} 
      className="py-20 sm:py-32  lg:mt-0 bg-transparent dark:bg-transparent -translate-x-10 lg:translate-x-0 "
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 justify-center translate-x-15">
        {/* التنسيق الأصلي 2: */}
        <h2 id='title' className="text-8xl lg:text-9xl  mt-30 lg:-mt-20 lg:mb-20 mb-5 px-13 lg:px-0   font- font-bold tracking-tight text-center
         text-purple-700 dark:text-purple-400 -translate-x-1 ">
          منتجاتنا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 
            w-full h-full -translate-x-10 ">
          {products.map((item) => (
            <Link 
              key={item.id}
              href={{
                pathname: "/productinfo", 
                query: {
                  id: item.id,
                  title: item.name,
                  price: item.price,
                  image: item.images[0]?.src || '',
                  description: item.description ,
                  
                }
              }}
              // التنسيق الأصلي 3:
              className=" "
            >
              <div 
                        key={item.id} 
                        className="flex group flex-col bg-white rounded-3xl overflow-hidden
                            shadow-sm hover:shadow-xl hover:shadow-purple-200/50 
                            transition-all duration-300 border border-zinc-100 
                            cursor-pointer"
                    >
                        {/* Image Area - Uses the first image from the WooCommerce object */}
                        <div className="h-64 bg-zinc-200 relative overflow-hidden">
                            {/* Check if images exist and use the first one's source */}
                            {item.images && item.images.length > 0 ? (
                                <img 
                                    src={item.images[0].src} 
                                    alt={item.name}
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
                                    {item.name}
                                </h3>
                            </div>
                            
                            <div className="flex justify-between items-center mt-4">
                                {/* WooCommerce price is a string/number, rendered as is */}
                                <p className="text-xl font-bold text-zinc-900">
                                    {/* Format price to show currency if not already included */}
                                    {item.price ? `د.ج ${item.price}` : 'N/A'} 
                                </p>
                                
                                {/* Add Button */}
                                <button className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;