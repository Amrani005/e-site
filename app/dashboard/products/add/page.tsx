"use client"; 

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createProducts } from "@/actions/createProducts"; 
import { motion } from "framer-motion";
import { PackagePlus, DollarSign, AlignLeft, Send, UploadCloud, ImageIcon, Loader2, Type, Quote, Star, ListPlus } from "lucide-react";
import Link from "next/link";

const CLOUD_NAME = "deimq7tzj"; 
const UPLOAD_PRESET = "dxtx2rdd"; 

export default function AddProductPage() {
  const router = useRouter(); 

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [galleryImage, setGalleryImage] = useState<string[]>([]);
  const [galleryImages_2, setGalleryImages_2] = useState<string[]>([]);
  
  const [reviewPreview1, setReviewPreview1] = useState<string[]>([]);
  const [reviewPreview2, setReviewPreview2] = useState<string[]>([]);

  const [dynamicPackages, setDynamicPackages] = useState([
    { quantity: 5, price: 4650, title: "مصاحف برواية ورش مقاس 14.20 سم" }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

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
  const handleGalleryChange_2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) setGalleryImages_2(Array.from(files).map(file => URL.createObjectURL(file)));
    else setGalleryImages_2([]);
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

  // دالة الرفع المباشر لـ Cloudinary
  const uploadToCloudinary = async (file: File) => {
    if (!file) return null;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET); 
    
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data,
      });
      
      const json = await res.json();
      
      if (json.error) {
        console.error("Cloudinary Error:", json.error.message);
        return null;
      }
      
      return json.secure_url;
    } catch (err) {
      console.error("Fetch Error:", err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsSubmitting(true); 
    setUploadProgress("جاري رفع الصور بجودة عالية...");

    try {
      const form = e.currentTarget;
      const finalData = new FormData();
      
      finalData.append("name", (form.elements.namedItem("name") as HTMLInputElement).value);
      finalData.append("price", (form.elements.namedItem("price") as HTMLInputElement).value);
      finalData.append("description", (form.elements.namedItem("description") as HTMLTextAreaElement).value);
      finalData.append("hookTitle", (form.elements.namedItem("hookTitle") as HTMLInputElement).value);
      finalData.append("hookSubtitle", (form.elements.namedItem("hookSubtitle") as HTMLInputElement).value);
      finalData.append("hadithText", (form.elements.namedItem("hadithText") as HTMLTextAreaElement).value);
      finalData.append("hookDesc", (form.elements.namedItem("hookDesc") as HTMLTextAreaElement).value);
      finalData.append("packagesData", JSON.stringify(dynamicPackages));

      // رفع الصورة الرئيسية
      const imageInput = form.elements.namedItem("image") as HTMLInputElement;
      if (imageInput.files && imageInput.files.length > 0) {
        const url = await uploadToCloudinary(imageInput.files[0]);
        if (url) finalData.append("imageUrl", url);
      }

      // دالة مساعدة لرفع المعارض المتعددة
      const processGallery = async (inputName: string) => {
        const input = form.elements.namedItem(inputName) as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          const urls = [];
          for (let i = 0; i < input.files.length; i++) {
            const url = await uploadToCloudinary(input.files[i]);
            if (url) urls.push(url);
          }
          finalData.append(inputName, JSON.stringify(urls));
        } else {
          finalData.append(inputName, "[]");
        }
      };

      await processGallery("gallery");
      await processGallery("galleryImages_2");
      await processGallery("reviewImages1");
      await processGallery("reviewImages2");

      setUploadProgress("جاري حفظ البيانات في السيرفر...");
      
      // ارسال البيانات (روابط فقط) الى السيرفر
      const result = await createProducts(finalData);
      
      if (result && result.success) {
        router.push("/dashboard/products");
        router.refresh(); 
      } else {
        alert("فشل الحفظ في السيرفر! تأكد من صحة البيانات.");
      }
      
    } catch (error) {
       alert("حدث خطأ أثناء الرفع.");
    } finally {
      setIsSubmitting(false); 
      setUploadProgress("");
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
              <div className="relative group border-2 border-dashed border-slate-500 hover:border-emerald-400 rounded-xl transition bg-slate-800/50 p-4">
                 <label className="block text-center text-xs text-emerald-400 font-bold mb-2"> صور عامة للمنتج</label>
                 <input name="galleryImages_2" type="file" accept="image/*" multiple onChange={handleGalleryChange_2} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" />
                 <div className="flex flex-col items-center justify-center text-slate-400 h-24">
                  {galleryImages_2.length > 0 ? (
                    <div className="flex gap-1 overflow-hidden h-full">
                      {galleryImages_2.slice(0,3).map((img, i) => <img key={i} src={img} className="h-full w-12 object-cover rounded" />)}
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
                <><span>{uploadProgress || "جاري المعالجة..."}</span><Loader2 className="w-5 h-5 animate-spin" /></>
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