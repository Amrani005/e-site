"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut, X } from "lucide-react"; 
import { motion } from 'framer-motion';

export default function LogoutButton() {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleLogOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <>
      {/* 1. الزر الرئيسي في لوحة القيادة */}
      <button 
        type="button" 
        onClick={() => setIsConfirmed(true)}
        className="flex items-center gap-2 px-6 py-3 text-white
         font-tajawal font-bold bg-gradient-to-r from-red-500
          to-red-700 rounded-xl hover:from-red-600 hover:to-red-800 
          transition-all duration-300 shadow-md hover:shadow-xl 
          hover:-translate-y-1 text-xs h-16"
      >
        <LogOut className="w-5 h-5" /> 
        <span>تسجيل الخروج</span>
      </button>

      {/* 2. النافذة المنبثقة (Modal Overlay) */}
      {isConfirmed && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center
         bg-slate-900/40 backdrop-blur-sm transition-opacity">
          
          {/* صندوق التأكيد */}
          <motion.div
            initial={{opacity:0,y:-50}}
            whileInView={{opacity:1,y:0}}
                    
          className="bg-white rounded-3xl p-8  max-w-sm w-full 
          shadow-2xl transform transition-all m-4">
            
            {/* رأس النافذة وزر الإغلاق */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-tajawal font-bold 
              text-slate-800">
                تأكيد الخروج
              </h3>
              <button 
                onClick={() => setIsConfirmed(false)}
                className="text-slate-400 hover:text-slate-700 
                transition-colors bg-slate-100 hover:bg-slate-200 p-2 
                rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* نص الرسالة */}
            <p className="text-slate-600 font-tajawal mb-8 text-sm leading-relaxed">
              هل أنت متأكد أنك تريد إنهاء الجلسة وتسجيل الخروج من لوحة القيادة؟
            </p>

            {/* أزرار الإجراءات */}
            <div className="flex gap-3">
              <button 
                onClick={handleLogOut}
                className="flex-1 py-3 px-4 text-white font-tajawal font-bold bg-red-500 hover:bg-red-600 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
              >
                نعم، خروج
              </button>
              
              <button 
                onClick={() => setIsConfirmed(false)}
                className="flex-1 py-3 px-4 text-slate-700 font-tajawal font-bold bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-300"
              >
                تراجع
              </button>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </>
  );
}