// File: app/thank-you/page.tsx
'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

const ThankYouContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); // Get the ID from the URL

  return (
    <div className="min-h-screen  bg-white flex flex-col 
    items-center justify-center p-4 text-center">
      <div className="bg-white p-8 sm:p-12 rounded-3xl 
      shadow-2xl border border-white dark:borde-black  max-w-lg w-full
       relative overflow-hidden">
        
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-green-00/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-tajawal font-bold  text-orange-600 mb-2">
            شكراً لطلبك!
          </h1>
          <p className="dark:text-gray-400 text-black  text-lg mb-8">
            تم استلام طلبك بنجاح وسنتصل بك قريباً للتأكيد.
          </p>

          

          
        </div>
      </div>
    </div>
  );
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">جاري التحميل...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}