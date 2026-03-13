"use client"; 

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createProducts } from "@/actions/createProducts"; 
import { motion } from "framer-motion";
import { PackagePlus, DollarSign, AlignLeft, Send, UploadCloud, ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import imageCompression from "browser-image-compression"; 

export default function AddProductPage() {
  const router = useRouter(); // 👈 العقل المدبر للتوجيه تم تفعيله هنا

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [galleryImage, setGalleryImage] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    } else {
      setImageUrl(null);
    }
  };

  const handleImageChange_2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) { 
      const newGallery = Array.from(files).map(file => URL.createObjectURL(file));
      setGalleryImage(newGallery);
    } else {
      setGalleryImage([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsSubmitting(true); 

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const options = {
        maxSizeMB: 0.04, 
        maxWidthOrHeight: 1080, 
        useWebWorker: true,
      };

      // 1. ضغط الصورة الرئيسية
      const imageFile = formData.get("image") as File;
      if (imageFile && imageFile.size > 0) {
        const compressedImage = await imageCompression(imageFile, options);
        formData.set("image", compressedImage, compressedImage.name);
      }

      // 2. ضغط صور المعرض
      const galleryFiles = formData.getAll("gallery") as File[];
      formData.delete("gallery"); 
      
      for (const file of galleryFiles) {
        if (file.size > 0) {
          const compressedFile = await imageCompression(file, options);
          formData.append("gallery", compressedFile, compressedFile.name);
        }
      }

      // 3. إرسال "الصندوق الخفيف" إلى الباك إند
      const result = await createProducts(formData);
      
      // 4. التحقق والتوجيه الآمن
      if (result && result.success) {
        router.push("/dashboard/products");
        router.refresh(); 
      } else {
        alert("فشل الحفظ في السيرفر! تأكد من صحة البيانات.");
      }
      
    } catch (error) {
      
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="relative flex-col min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0f172a]">
      
      <div className="flex justify-between gap-6 mb-10 z-10">
        <Link href='/dashboard/products' className="text-white bg-white/10 px-6 py-2 rounded-xl">Back</Link>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-6 mx-4"
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 text-white">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
              إضافة منتج جديد
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            <div className="relative group">
               <PackagePlus className="absolute right-4 top-3.5 w-5 h-5 text-blue-300" />
               <input name="name" type="text" placeholder="اسم المنتج" className="w-full bg-slate-900/50 border border-white/10 p-3 pr-12 rounded-xl text-right focus:outline-none focus:border-cyan-400" required disabled={isSubmitting} />
            </div>
            <div className="relative group">
               <DollarSign className="absolute right-4 top-3.5 w-5 h-5 text-blue-300" />
               <input name="price" type="number" placeholder="السعر" className="w-full bg-slate-900/50 border border-white/10 p-3 pr-12 rounded-xl text-right focus:outline-none focus:border-cyan-400" required disabled={isSubmitting} />
            </div>
            <div className="relative group">
               <AlignLeft className="absolute right-4 top-3.5 w-5 h-5 text-blue-300" />
               <textarea name="description" rows={3} placeholder="وصف المنتج" className="w-full bg-slate-900/50 border border-white/10 p-3 pr-12 rounded-xl text-right focus:outline-none focus:border-cyan-400" disabled={isSubmitting} />
            </div>

            <div className="relative group border-2 border-dashed border-slate-500 hover:border-cyan-400 rounded-xl transition bg-slate-800/50">
              <label className="absolute -top-3 right-3 bg-[#0f172a] px-2 text-xs text-cyan-400 font-bold z-20">صورة المنتج الرئيسية</label>
              <input 
                name="image" 
                type="file" 
                accept="image/*" 
                required
                onChange={handleImageChange}
                disabled={isSubmitting}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"                
              />
              <div className="p-8 flex flex-col items-center justify-center text-slate-400">
                {imageUrl ? (
                   <img src={imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-lg shadow-lg" />
                ) : (
                   <>
                     <UploadCloud size={40} className="mb-2" />
                     <span className="text-xs">اضغط لرفع الصورة الرئيسية</span>
                   </>
                )}
              </div>
            </div>

            <div className="relative group border-2 border-dashed border-slate-500 hover:border-cyan-400 rounded-xl transition bg-slate-800/50">
               <label className="absolute -top-3 right-3 bg-[#0f172a] px-2 text-xs text-cyan-400 font-bold z-20">صور المعرض</label>
               <input 
                name="gallery" 
                type="file" 
                accept="image/*" 
                required
                multiple
                onChange={handleImageChange_2}
                disabled={isSubmitting}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"                
              />
              <div className="p-8 flex flex-col items-center justify-center text-slate-400">
                {galleryImage.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 w-full">
                      {galleryImage.map((img, index) =>(
                        <img key={index} src={img} alt="gallery" className="w-full h-16 object-cover rounded-md border border-slate-600" />
                      ))}
                  </div>
                ) : ( 
                  <>
                     <ImageIcon size={40} className="mb-2 opacity-50" />
                     <span className="text-xs">اضغط لرفع صور إضافية</span>
                  </>
                )}
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={isSubmitting}
              className={`mt-4 w-full text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 ${isSubmitting ? 'bg-slate-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-cyan-500'}`}
            >
              {isSubmitting ? (
                <>
                  <span>جاري الضغط والرفع...</span>
                  <Loader2 className="w-5 h-5 animate-spin" />
                </>
              ) : (
                <>
                  <span>حفظ المنتج</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>

          </form>
        </div>
      </motion.div>
    </div>
  );
}