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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 justify-center translate-x-17">
        {/* التنسيق الأصلي 2: */}
        <h2 id='title' className="text-8xl  mb-5 px-13 lg:px-0 pt-20  font-tajawal font-bold tracking-tight text-center text-purple-700 dark:text-purple-400 ">
          منتجاتنا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 
w-full h-full -translate-x-14 ">
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
                  description: item.description 
                }
              }}
              // التنسيق الأصلي 3:
              className="project-card  flex h-96 flex-col 
                         justify-end rounded-2xl shadow-lg overflow-hidden
                         cursor-pointer group "
            >
              <img
                src={item.images[0]?.src || ''}
                alt={item.name}
                
                className="z-0 bg-gradient-to-t from-black/70 to-transparent
                           transition-transform duration-300 group-hover:scale-110
                           absolute inset-0 w-full h-full object-cover -my-5"
              />
                
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-center
                bg-gradient-to-t from-black/70 to-transparent transition-opacity
                 duration-300 group-hover:from-black/90p"
              >
                <div>
                {/* التنسيق الأصلي 6: */}
                  <h3 className="text-4xl font-bold text-white translate-y-30 lg:translate-x-0 ">
                    {item.name}
                  </h3>
                  {item.price ? (
                    <p className="text-3xl text-white font-light translate-y-15">
                      {item.price} د.ج
                    </p>
                  ) : (
                    <p className="text-sm text-gray-200">السعر غير متوفر</p>
                  )}
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