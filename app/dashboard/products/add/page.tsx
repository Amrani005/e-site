"use client"; 

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createProducts } from "@/actions/createProducts"; 
import { motion } from "framer-motion";
import { PackagePlus, DollarSign, AlignLeft, Send, UploadCloud, ImageIcon, Loader2, Type, Quote, Star, ListPlus } from "lucide-react";
import Link from "next/link";
import imageCompression from "browser-image-compression"; 

export default function AddProductPage() {
  const router = useRouter(); 

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [galleryImage, setGalleryImage] = useState<string[]>([]);
  
  const [reviewPreview1, setReviewPreview1] = useState<string[]>([]);
  const [reviewPreview2, setReviewPreview2] = useState<string[]>([]);

  // --- نظام الباقات الديناميكي المخصص بالكامل ---
  const [dynamicPackages, setDynamicPackages] = useState([
    { quantity: 5, price: 4650, title: "مصاحف برواية ورش مقاس 14.20 سم" }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageUrl(URL.createObjectURL(file));
    else setImageUrl(null);
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) setGalleryImage(Array.from(files).map(file => URL.createObjectURL(file)));
    else setGalleryImage([]);
  };

  const handleReview1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) setReviewPreview1(Array.from(files).map(file => URL.createObjectURL(file)));
    else setReviewPreview1([]);
  };

  const handleReview2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) setReviewPreview2(Array.from(files).map(file => URL.createObjectURL(file)));
    else setReviewPreview2([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsSubmitting(true); 

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const options = {
        maxSizeMB: 0.2, 
        maxWidthOrHeight: 1080, 
        useWebWorker: true,
      };

      const imageFile = formData.get("image") as File;
      if (imageFile && imageFile.size > 0) {
        const compressedImage = await imageCompression(imageFile, options);
        formData.set("image", compressedImage, compressedImage.name);
      }

      const compressAndAppendFiles = async (fieldName: string) => {
        const files = formData.getAll(fieldName) as File[];
        formData.delete(fieldName); 
        for (const file of files) {
          if (file.size > 0) {
            const compressedFile = await imageCompression(file, options);
            formData.append(fieldName, compressedFile, compressedFile.name);
          }
        }
      };

      await compressAndAppendFiles("gallery");
      await compressAndAppendFiles("reviewImages1");
      await compressAndAppendFiles("reviewImages2");

      const result = await createProducts(formData);
      
      if (result && result.success) {
        router.push("/dashboard/products");
        router.refresh(); 
      } else {
        alert("فشل الحفظ في السيرفر! تأكد من صحة البيانات.");
      }
      
    } catch (error) {
       alert("حدث خطأ أثناء الضغط والرفع");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="relative flex-col min-h-screen w-full flex items-center py-20 justify-center overflow-hidden bg-[#0f172a]">
      
      <div className="flex justify-between gap-6 mb-10 z-10">
        <Link href='/dashboard/products' className="text-white bg-white/10 px-6 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition">رجوع للوحة</Link>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/20 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl p-6 mx-4" 
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 text-white">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent mb-2">
              إضافة باقة جديدة
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" dir="rtl">
            
            {/* --- BASIC INFO --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                 <PackagePlus className="absolute left-4 top-3.5 w-5 h-5 text-emerald-300" />
                 <input name="name" type="text" placeholder="اسم المنتج الأساسي" className="w-full bg-slate-900/50 border border-white/10 p-3 pl-12 rounded-xl focus:outline-none focus:border-emerald-400" required disabled={isSubmitting} />
              </div>
              <div className="relative group">
                 <DollarSign className="absolute left-4 top-3.5 w-5 h-5 text-emerald-300" />
                 <input name="price" type="number" placeholder="السعر الافتراضي" className="w-full bg-slate-900/50 border border-white/10 p-3 pl-12 rounded-xl focus:outline-none focus:border-emerald-400" required disabled={isSubmitting} />
              </div>
            </div>

            <div className="relative group">
               <AlignLeft className="absolute left-4 top-3.5 w-5 h-5 text-emerald-300" />
               <textarea name="description" rows={2} placeholder="وصف المنتج (الأساسي)" className="w-full bg-slate-900/50 border border-white/10 p-3 pl-12 rounded-xl focus:outline-none focus:border-emerald-400" disabled={isSubmitting} />
            </div>

            <hr className="border-white/10 my-2" />

            {/* --- CUSTOM PACKAGES (DYNAMIC) --- */}
            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-600 shadow-inner">
              <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2"><ListPlus className="w-5 h-5"/> تخصيص الباقات (الكمية، السعر، والمحتوى)</h3>
              
              {dynamicPackages.map((pkg, index) => (
                <div key={index} className="flex flex-col gap-3 mb-4 p-4 border border-slate-600/50 rounded-lg bg-slate-900/80">
                  
                  <div className="flex gap-2">
                    <input 
                      type="number" placeholder="الكمية" required
                      value={pkg.quantity} 
                      onChange={(e) => {
                        const newPkgs = [...dynamicPackages];
                        newPkgs[index].quantity = Number(e.target.value);
                        setDynamicPackages(newPkgs);
                      }} 
                      className="w-1/3 p-3 bg-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500 border border-transparent transition-all" 
                    />
                    <input 
                      type="number" placeholder="السعر" required
                      value={pkg.price} 
                      onChange={(e) => {
                        const newPkgs = [...dynamicPackages];
                        newPkgs[index].price = Number(e.target.value);
                        setDynamicPackages(newPkgs);
                      }} 
                      className="w-1/3 p-3 bg-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500 border border-transparent transition-all" 
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        const newPkgs = dynamicPackages.filter((_, i) => i !== index);
                        setDynamicPackages(newPkgs);
                      }}
                      className="w-1/3 p-3 bg-red-500/20 text-red-400 font-bold rounded-lg hover:bg-red-500/40 transition-colors"
                    >
                      حذف
                    </button>
                  </div>

                  <input 
                    type="text" placeholder="محتوى الباقة (مثال: مصاحف برواية ورش مقاس 14 سم)" required
                    value={pkg.title} 
                    onChange={(e) => {
                      const newPkgs = [...dynamicPackages];
                      newPkgs[index].title = e.target.value;
                      setDynamicPackages(newPkgs);
                    }} 
                    className="w-full p-3 bg-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500 border border-transparent transition-all text-right" 
                  />
                </div>
              ))}
              
              <button 
                type="button" 
                onClick={() => setDynamicPackages([...dynamicPackages, { quantity: 1, price: 1000, title: "محتوى الباقة الجديدة" }])}
                className="text-sm w-full text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 py-3 rounded-lg hover:bg-emerald-500/20 transition-colors font-bold"
              >
                + إضافة باقة جديدة
              </button>

              <input type="hidden" name="packagesData" value={JSON.stringify(dynamicPackages)} />
            </div>

            <hr className="border-white/10 my-2" />

            {/* --- MARKETING TEXTS --- */}
            <h3 className="text-cyan-400 font-bold text-sm">النصوص التسويقية (الخطاف والحديث)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                 <Type className="absolute left-4 top-3.5 w-5 h-5 text-cyan-300" />
                 <input name="hookTitle" type="text" placeholder="العنوان العريض" className="w-full bg-slate-900/50 border border-white/10 p-3 pl-12 rounded-xl focus:outline-none focus:border-cyan-400" disabled={isSubmitting} />
              </div>
              <div className="relative group">
                 <Type className="absolute left-4 top-3.5 w-5 h-5 text-cyan-300" />
                 <input name="hookSubtitle" type="text" placeholder="العنوان الفرعي" className="w-full bg-slate-900/50 border border-white/10 p-3 pl-12 rounded-xl focus:outline-none focus:border-cyan-400" disabled={isSubmitting} />
              </div>
            </div>

            <div className="relative group">
               <Quote className="absolute left-4 top-3.5 w-5 h-5 text-emerald-300" />
               <textarea name="hadithText" rows={2} placeholder="نص الحديث النبوي" className="w-full bg-slate-900/50 border border-emerald-500/30 p-3 pl-12 rounded-xl focus:outline-none focus:border-emerald-400" disabled={isSubmitting} />
            </div>

            <div className="relative group">
               <AlignLeft className="absolute left-4 top-3.5 w-5 h-5 text-cyan-300" />
               <textarea name="hookDesc" rows={2} placeholder="الوصف التسويقي أسفل العنوان" className="w-full bg-slate-900/50 border border-white/10 p-3 pl-12 rounded-xl focus:outline-none focus:border-cyan-400" disabled={isSubmitting} />
            </div>

            <hr className="border-white/10 my-2" />

            {/* --- IMAGES SECTION --- */}
            <h3 className="text-cyan-400 font-bold text-sm">الصور والمراجعات</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group border-2 border-dashed border-slate-500 hover:border-emerald-400 rounded-xl transition bg-slate-800/50 p-4">
                <label className="block text-center text-xs text-emerald-400 font-bold mb-2">الصورة الرئيسية *</label>
                <input name="image" type="file" accept="image/*" required onChange={handleImageChange} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" />
                <div className="flex flex-col items-center justify-center text-slate-400 h-24">
                  {imageUrl ? <img src={imageUrl} alt="Preview" className="h-full object-cover rounded-lg" /> : <><UploadCloud size={24} /><span className="text-xs mt-1">رفع</span></>}
                </div>
              </div>

              <div className="relative group border-2 border-dashed border-slate-500 hover:border-emerald-400 rounded-xl transition bg-slate-800/50 p-4">
                 <label className="block text-center text-xs text-emerald-400 font-bold mb-2">صور المعرض</label>
                 <input name="gallery" type="file" accept="image/*" multiple onChange={handleGalleryChange} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" />
                 <div className="flex flex-col items-center justify-center text-slate-400 h-24">
                  {galleryImage.length > 0 ? (
                    <div className="flex gap-1 overflow-hidden h-full">
                      {galleryImage.slice(0,3).map((img, i) => <img key={i} src={img} className="h-full w-12 object-cover rounded" />)}
                    </div>
                  ) : <><ImageIcon size={24} /><span className="text-xs mt-1">متعدد</span></>}
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group border-2 border-dashed border-slate-500 hover:border-yellow-400 rounded-xl transition bg-slate-800/50 p-4">
                 <label className="block text-center text-xs text-yellow-400 font-bold mb-2 flex justify-center gap-1"><Star size={14}/> صور تقييمات 1</label>
                 <input name="reviewImages1" type="file" accept="image/*" multiple onChange={handleReview1Change} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" />
                 <div className="flex flex-col items-center justify-center text-slate-400 h-16">
                  {reviewPreview1.length > 0 ? <span className="text-sm font-bold text-yellow-400">{reviewPreview1.length} صور محددة</span> : <span className="text-xs">اضغط للرفع</span>}
                 </div>
              </div>

              <div className="relative group border-2 border-dashed border-slate-500 hover:border-yellow-400 rounded-xl transition bg-slate-800/50 p-4">
                 <label className="block text-center text-xs text-yellow-400 font-bold mb-2 flex justify-center gap-1"><Star size={14}/> صور تقييمات 2</label>
                 <input name="reviewImages2" type="file" accept="image/*" multiple onChange={handleReview2Change} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" />
                 <div className="flex flex-col items-center justify-center text-slate-400 h-16">
                  {reviewPreview2.length > 0 ? <span className="text-sm font-bold text-yellow-400">{reviewPreview2.length} صور محددة</span> : <span className="text-xs">اضغط للرفع</span>}
                 </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={isSubmitting}
              className={`mt-6 w-full text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 ${isSubmitting ? 'bg-slate-600 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-cyan-500'}`}
            >
              {isSubmitting ? (
                <><span>جاري الضغط والرفع...</span><Loader2 className="w-5 h-5 animate-spin" /></>
              ) : (
                <><span>حفظ المنتج والباقات</span><Send className="w-5 h-5" /></>
              )}
            </motion.button>

          </form>
        </div>
      </motion.div>
    </div>
  );
}