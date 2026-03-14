'use client';
import Link from 'next/link';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { useState } from 'react';
import { navLinks } from '..';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Fixed: Cleaned up the wrapper. inset-x-0 pins it to left/right edges.
    <div className="fixed inset-x-0 top-0 z-50 w-full">
      {/* Fixed: Removed -mr-10 and w-120. Replaced with w-full */}
      <div className="w-full bg-green-900 py-2 text-center text-sm font-medium text-white">
       أي استفسار او لطلب المستعجل اتصل على 0795351720 أو 0561818058
      </div>

      {/* Fixed: Removed -mr-6 and px-2. Replaced with w-full */}
      <header className="w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-8">
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black transition-transform hover:scale-110 md:hidden"
            >
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
            <button className="hidden text-black transition-transform hover:scale-110 md:block">
              <Search size={28} />
            </button>
          </div>

          <div className="flex-1 text-center md:flex-none">
            <Link href="/" className="inline-block" prefetch={false}>
              <span className="font-sans text-2xl uppercase tracking-widest text-black sm:text-3xl">
                Likolin Kitaboh
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-5 sm:gap-8">
            <Link href="/contact" className="hidden text-black transition-transform hover:scale-110 md:block">
              <User size={28} />
            </Link>
            <Link href="/cart" className="relative flex items-center text-black transition-transform hover:scale-110">
              <ShoppingBag size={28} />
            </Link>
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

        {isMenuOpen && (
          <div className="absolute left-0 top-full w-full border-b border-gray-200 bg-white px-6 py-8 shadow-xl md:hidden">
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
                <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                  <div className="text-xl font-bold text-gray-800 transition-colors hover:text-black">
                    {item.label}
                  </div>
                </Link>
              ))}
              
              <div className="mt-4 flex w-full items-center border-t border-gray-200 pt-6">
                <Link
                  href="/contact"
                  className="flex items-center gap-3 text-lg font-bold text-black transition-colors hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="text-black" size={24} />
                  حسابي
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;