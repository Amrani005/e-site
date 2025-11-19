// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    // 1. Footer container: Black background, white text, full width
    <footer className="  text-purple-400 w-full
     contain-content lg:w-full -translate-x-5">
      
      {/* 2. Main Footer Content Area: NAD STORE & Description */}
      {/* py-16 for vertical padding, container for centered content */}
      <div className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          
          {/* Title: NAD STORE (Centered, large, uppercase) */}
          <h2 className="text-3xl font-extrabold tracking-widest mb-8 uppercase ">
            ISITE STORE
          </h2>
          
          {/* Description Block (Arabic Text) */}
          {/* dir="rtl" is essential for proper right-to-left layout for Arabic */}
          <div>
            <p 
              className="text-lg text-gray-400 leading-relaxed font-medium" 
              dir="rtl"
            >
              متجركم **isite store** يوفر لكم أفضل المنتجات التقنية الحديثة بأسعار مميزة
            </p>
          </div>
          
        </div>
      </div>

      {/* 3. Copyright Bar (Bottom-most section) */}
      {/* Subtle border and smaller padding for the very bottom line */}
      <div className=" py-3 px-4 text-center text-sm ">
        <div className="container mx-auto">
          {/* Copyright Text (Arabic Text) */}
          <p className="text-gray-500" dir="rtl">
            حقوق النشر &copy; محفوظة لموقع iSite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;