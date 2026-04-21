'use client';
import Link from 'next/link';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { useState } from 'react';
import { navLinks } from '..';

const Header = () => {
  

  return (

    
    // Fixed: Cleaned up the wrapper. inset-x-0 pins it to left/right edges.
    <div className="fixed inset-x-0 top-0 z-50 w-full">

      
      <div className="w-full bg-green-900  text-center text-sm font-medium text-white">
       أي استفسار او لطلب المستعجل اتصل على 0795351720 أو 0561818058
      </div>

      <input type="checkbox" id="sidebar-toggle" className="hidden peer" />

      {/* 2. The Dark Overlay Backdrop */}
      <label 
        htmlFor="sidebar-toggle" 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm 
        z-40 hidden peer-checked:block cursor-pointer transition-opacity"
      ></label>
      
      <aside className="fixed top-0 right-0 h-full w-72 bg-white
       shadow-2xl z-50 transform translate-x-full
        peer-checked:translate-x-0 transition-transform duration-300 
        ease-in-out flex flex-col px-5" dir="rtl">
         <div >
            <div className="flex flex-col gap-6">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="بحث..." 
                  className="w-full rounded-none border-b-2 border-gray-300 bg-transparent py-3 pl-10 pr-4 text-lg outline-none transition-colors focus:border-orange-600"
                />
                <Search className="absolute left-2 top-3.5 text-black" size={24} />
              </div>

              {navLinks.map((item) => (
                <Link key={item.label} href={item.href} >
                  <div className="text-xl font-bold text-gray-800 transition-colors hover:text-black">
                    {item.label}
                  </div>
                </Link>
              ))}
              
              <div className="mt-4 flex w-full items-center border-t border-gray-200 pt-6">
                <Link
                  href="/contact"
                  className="flex items-center gap-3 text-lg font-bold text-black transition-colors hover:text-black"
                 
                >
                  <User className="text-black" size={24} />
                  حسابي
                </Link>
              </div>
            </div>
          </div>
      </aside>

      <header className="w-full border-b border-gray-100 bg-white/95
       backdrop-blur-md">
        <div className="mx-auto flex h-15 max-w-7xl items-center justify-between 
        px-4 sm:px-8">
          
          <div className="flex items-center gap-6">
           <Link href="/cart" className="relative flex items-center text-black transition-transform hover:scale-110">
              <ShoppingBag size={28} />
            </Link>
            <button className="hidden text-black transition-transform 
            hover:scale-110 md:block">
              <Search size={28} />
            </button>
          </div>

          <div className="flex-1 text-center md:flex-none">
            <Link href="/" className="inline-block" prefetch={false}>
              <span className="font-sans text-xl uppercase tracking-widest text-black sm:text-3xl">
                Likolin Kitaboh
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-5 sm:gap-8">
            <Link href="/contact" className="hidden text-black transition-transform hover:scale-110 md:block">
              <User size={28} />
            </Link>
            <label htmlFor="sidebar-toggle"
              className="text-black transition-transform hover:scale-110
               md:hidden"
            >
               <Menu size={32} />
            </label>
            
          </div>
        </div>

        <nav className="hidden h-14 w-full items-center justify-center gap-10 border-t border-gray-100 bg-white/50 md:flex">
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} className="group relative py-2">
              <span className="text-lg font-semibold uppercase tracking-wider text-gray-600 transition-colors group-hover:text-black">
                {item.label}
              </span>
              <span className="absolute bottom-0 left-0 h-[2px] w-full origin-center scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

       
      </header>
    </div>
  );
};

export default Header;