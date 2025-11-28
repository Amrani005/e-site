// components/Header.tsx
'use client'; // 1. ضروري لاستخدام Hooks
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu, // For Mobile
  MonitorSmartphone, // For Mobile
  Languages, // For Mobile
  Sun, // For Desktop
  Moon, // For Desktop
  X,
  ArrowBigDown, // 3. أضفنا أيقونة الإغلاق
} from 'lucide-react';
import { useState,useEffect } from 'react'; // 2. استيراد useState
import { navLinks } from '..';
import { ThemeToggle } from '@/app/theme-toggle';

/*
  ملاحظة: لعمل مبدل الوضع (Theme Toggle) بشكل كامل،
  ستحتاج على الأرجح إلى "use client" وحزمة مثل 'next-themes'.
  هذا مجرد مثال شكلي.
*/

 

 


const Header = () => {
  // 2. إضافة متغير الحالة
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  return (
    // أصلحنا px-10 لتكون متجاوبة وأزلنا font-tajawal (يجب أن يكون في globals.css)
    <header className="fixed top-4 translate-x-10 lg:translate-x-0 z-50 w-full px-4 sm:px-10">
      <div
        className="w-full rounded-3xl border border-transparent
        bg-transparent shadow-lg backdrop-blur-xl dark:border-gray-700/80
        dark:bg-gray-950/80 p-5"
      >
        {/* Mobile Header (based on your NEW screenshot)
          Visible on small screens, hidden on 'md' and up
        */}
        <div className="relative flex h-16 items-center justify-between
         px-4 md:hidden ">
          {/* Left: Hamburger Menu Button */}
          

          <div className='flex items-center gap-4'>
            <button
           
            // 3. إضافة onClick لفتح وإغلاق القائمة
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-800 
              dark:text-gray-200 dark:hover:text-purple-400 cursor-pointer
              "
          >
            {/* 3. تبديل الأيقونة بناءً على الحالة */}
            {isMenuOpen ? <X size={40} className='rotate-180 hover:text-purple-600 duration-300 transition-transform ease-in-out' /> : <Menu size={40} className=' duration-300 transition-transform  ease-in-out text-purple-700 ' />}
          </button>
          <Link href='/cart'>
          <ThemeToggle />
          </Link>
          
          </div>

          {/* Right: Logo */}
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <span className="text-2xl font-mono font-bold text-purple-700 dark:text-white">
                iSite
            </span>
            
            <Image
              src="/Gemini_Generated_Image_a9b5i1a9b5i1a9b5.png" // تأكد من وضع أيقونة اللوجو هنا
              alt=" "
              width={50}
              height={50}
              className="h-12 w-12 cursor-pointer bg-white"
            />
          </Link>
        </div>

        {/* --- 4. قائمة الموبايل (تظهر عند الفتح) --- */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 px-4 pb-4 text-center cursor-pointer
          duration-300 transition-all ease-in-out">
            {navLinks.map((item)=>(
              <a href={item.href}>
                <div className="text-lg font-medium text-purple-700 dark:text-gray-300
               hover:text-purple-600 mt-4">
                {item.label}
              </div>
              </a>
              
            ))}
            {/* زر "تواصل معنا" للموبايل */}
            <div className="mt-8 hover:scale-[1.1] duration-300">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center
                 rounded-full bg-purple-600 px-6 py-3 text-base 
                  text-white shadow-sm transition-colors
                  hover:bg-purple-700 hover:scale-[1.1] duration-300"
                prefetch={false}
                onClick={() => setIsMenuOpen(false)}
              >
                 تسجيل الدخول
              </Link>
            </div>
          </div>
        )}

        {/* --- نهاية قائمة الموبايل --- */}

        {/* Desktop Header (based on your FIRST screenshot)
          Hidden on small screens, visible on 'md' and up
        */}
        <div className="hidden h-20 items-center justify-between px-6 md:flex">
          {/* Left: Theme Toggle */}
          
              <Link href='/cart'>
          <ThemeToggle />
          </Link>
          {/* Center: Navigation Links */}
          <nav className='flex  gap-8'>
           {navLinks.map((item)=>(
              <a key={item.label}  href={item.href}>
                <div  key={item.label}  className="text-2xl font-medium text-gray-700 dark:text-gray-300
               hover:text-purple-600 mt-4 ">
                {item.label}
              </div>
              </a>
              
            ))}
          </nav>
          

          {/* Right: Actions (CTA + Logo) */}
          <div className="flex items-center gap-4">
            <div className=' hover:scale-[1.1] duration-300 ease-in-out'>
              <Link
              href="/contact"
              className="inline-flex items-center
               justify-center rounded-full bg-purple-600 px-6 py-2.5
                text-base font-semibold text-white shadow-sm
                 transition-colors hover:bg-purple-700 
                 focus-visible:outline focus-visible:outline-2 
                 focus-visible:outline-offset-2
                  focus-visible:outline-purple-600
                  hover:scale-[1.1] ease-in-out "
              prefetch={false}
            >
                 تسجيل الدخول
            </Link>
            </div>
            
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <span className="text-xl font-mono font-bold text-purple-700 dark:text-white">
                 iSite

              </span>
              <Image
                src="/Gemini_Generated_Image_a9b5i1a9b5i1a9b5.png" // تأكد من وضع أيقونة اللوجو هنا
                alt="بيكسلات لوجو"
                width={50}
                height={50}
                className="h-13 w-13 bg-white"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;