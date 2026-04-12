"use client"; 

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createProducts } from "@/actions/createProducts"; 
import { motion } from "framer-motion";
import { PackagePlus,DollarSign,Menu, AlignLeft, Send, UploadCloud, ImageIcon, Loader2, Type, Quote, Star, ListPlus, X } from "lucide-react";
import Link from "next/link";
import SideBarNav from "@/components/SideBarNav";


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

      const imageInput = form.elements.namedItem("image") as HTMLInputElement;
      if (imageInput.files && imageInput.files.length > 0) {
        const url = await uploadToCloudinary(imageInput.files[0]);
        if (url) finalData.append("imageUrl", url);
      }

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
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col text-slate-900 pb-12" dir="rtl">
        
         
      <SideBarNav/>

      {/* Main Form - Grid changes to 1 column on mobile, 3 columns on desktop */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* COLUMN 1: Basic Info & Packages */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
            <h2 className="text-sm font-bold text-indigo-600 mb-1 border-b border-slate-100 pb-2">المعلومات الأساسية</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="relative">
                 <label className="text-xs font-semibold text-slate-500 mb-1 block">اسم المنتج</label>
                 <input name="name" type="text" placeholder="مثال: باقة رمضان" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" required disabled={isSubmitting} />
              </div>
              <div className="relative">
                 <label className="text-xs font-semibold text-slate-500 mb-1 block">السعر الافتراضي</label>
                 <input name="price" type="number" placeholder="مثال: 4500" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" required disabled={isSubmitting} />
              </div>
            </div>

            <div className="relative">
               <label className="text-xs font-semibold text-slate-500 mb-1 block">وصف المنتج</label>
               <textarea name="description" rows={3} placeholder="وصف تفصيلي للمنتج..." className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none" disabled={isSubmitting} />
            </div>

            <div className="mt-2 flex flex-col">
              <h3 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1"><ListPlus className="w-4 h-4 text-indigo-500"/> تخصيص الباقات</h3>
              
              <div className="space-y-3">
                {dynamicPackages.map((pkg, index) => (
                  <div key={index} className="flex flex-col gap-2 p-3 border border-slate-100 rounded-lg bg-slate-50">
                    <div className="flex gap-2">
                      <input type="number" placeholder="الكمية" required value={pkg.quantity} onChange={(e) => { const newPkgs = [...dynamicPackages]; newPkgs[index].quantity = Number(e.target.value); setDynamicPackages(newPkgs); }} className="w-1/3 p-2 bg-white border border-slate-200 rounded text-sm focus:border-indigo-500 outline-none" />
                      <input type="number" placeholder="السعر" required value={pkg.price} onChange={(e) => { const newPkgs = [...dynamicPackages]; newPkgs[index].price = Number(e.target.value); setDynamicPackages(newPkgs); }} className="w-1/3 p-2 bg-white border border-slate-200 rounded text-sm focus:border-indigo-500 outline-none" />
                      <button type="button" onClick={() => setDynamicPackages(dynamicPackages.filter((_, i) => i !== index))} className="w-1/3 p-2 bg-red-50 text-red-600 text-xs font-bold rounded hover:bg-red-100 transition-colors">حذف</button>
                    </div>
                    <input type="text" placeholder="محتوى الباقة (مثال: مصاحف برواية ورش)" required value={pkg.title} onChange={(e) => { const newPkgs = [...dynamicPackages]; newPkgs[index].title = e.target.value; setDynamicPackages(newPkgs); }} className="w-full p-2 bg-white border border-slate-200 rounded text-sm focus:border-indigo-500 outline-none" />
                  </div>
                ))}
              </div>
              
              <button type="button" onClick={() => setDynamicPackages([...dynamicPackages, { quantity: 1, price: 1000, title: "" }])} className="mt-3 text-xs w-full text-indigo-600 bg-indigo-50 border border-indigo-100 py-2.5 rounded-lg hover:bg-indigo-100 transition-colors font-bold">
                + إضافة باقة أخرى
              </button>
              <input type="hidden" name="packagesData" value={JSON.stringify(dynamicPackages)} />
            </div>
          </motion.div>

          {/* COLUMN 2: Marketing Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
            <h2 className="text-sm font-bold text-indigo-600 mb-1 border-b border-slate-100 pb-2">النصوص التسويقية (Landing Page)</h2>
            
            <div className="relative">
               <label className="text-xs font-semibold text-slate-500 mb-1 block">العنوان العريض (الخطاف)</label>
               <input name="hookTitle" type="text" placeholder="مثال: فرصة لا تعوض..." className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" disabled={isSubmitting} />
            </div>
            
            <div className="relative">
               <label className="text-xs font-semibold text-slate-500 mb-1 block">العنوان الفرعي</label>
               <input name="hookSubtitle" type="text" placeholder="وصف قصير تحت العنوان العريض..." className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" disabled={isSubmitting} />
            </div>

            <div className="relative">
               <label className="text-xs font-semibold text-slate-500 mb-1 block flex items-center gap-1"><Quote className="w-3 h-3"/> نص الحديث النبوي أو الحكمة</label>
               <textarea name="hadithText" rows={3} placeholder="قال رسول الله صلى الله عليه وسلم..." className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none" disabled={isSubmitting} />
            </div>

            <div className="relative">
               <label className="text-xs font-semibold text-slate-500 mb-1 block">الوصف التسويقي</label>
               <textarea name="hookDesc" rows={5} placeholder="اشرح للزبون لماذا يجب عليه شراء هذا المنتج الآن..." className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none" disabled={isSubmitting} />
            </div>
          </motion.div>

          {/* COLUMN 3: Media & Submit Action */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col gap-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 lg:sticky lg:top-24">
            <h2 className="text-sm font-bold text-indigo-600 mb-1 border-b border-slate-100 pb-2">الصور والمراجعات</h2>

            {/* Main Image */}
            <div className="relative group border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl bg-slate-50 p-3 transition-colors h-32 flex flex-col justify-center">
              <label className="absolute top-2 right-3 text-[10px] text-slate-400 font-bold">الصورة الرئيسية *</label>
              <input name="image" type="file" accept="image/*" required onChange={handleImageChange} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="flex flex-col items-center justify-center text-slate-400">
                {imageUrl ? <img src={imageUrl} alt="Preview" className="h-24 w-auto object-contain rounded" /> : <><UploadCloud className="w-6 h-6 text-indigo-400 mb-1" /><span className="text-xs">اضغط لرفع الصورة</span></>}
              </div>
            </div>

            {/* 4 Grid Small Images */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl bg-slate-50 p-2 transition-colors h-24">
                 <label className="block text-center text-[10px] text-slate-500 font-semibold mb-1">صور المعرض 1</label>
                 <input name="gallery" type="file" accept="image/*" multiple onChange={handleGalleryChange} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                 <div className="flex flex-col items-center justify-center text-slate-400 h-12">
                  {galleryImage.length > 0 ? <span className="text-xs font-bold text-indigo-500">{galleryImage.length} صور</span> : <ImageIcon className="w-5 h-5 opacity-50" />}
                 </div>
              </div>

              <div className="relative group border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl bg-slate-50 p-2 transition-colors h-24">
                 <label className="block text-center text-[10px] text-slate-500 font-semibold mb-1">صور المعرض 2</label>
                 <input name="galleryImages_2" type="file" accept="image/*" multiple onChange={handleGalleryChange_2} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                 <div className="flex flex-col items-center justify-center text-slate-400 h-12">
                  {galleryImages_2.length > 0 ? <span className="text-xs font-bold text-indigo-500">{galleryImages_2.length} صور</span> : <ImageIcon className="w-5 h-5 opacity-50" />}
                 </div>
              </div>

              <div className="relative group border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-xl bg-slate-50 p-2 transition-colors h-24">
                 <label className="block text-center text-[10px] text-amber-600 font-semibold mb-1 flex justify-center items-center gap-1"><Star className="w-3 h-3"/> تقييمات 1</label>
                 <input name="reviewImages1" type="file" accept="image/*" multiple onChange={handleReview1Change} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                 <div className="flex flex-col items-center justify-center text-slate-400 h-12">
                  {reviewPreview1.length > 0 ? <span className="text-xs font-bold text-amber-500">{reviewPreview1.length} صور</span> : <ImageIcon className="w-5 h-5 opacity-50" />}
                 </div>
              </div>

              <div className="relative group border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-xl bg-slate-50 p-2 transition-colors h-24">
                 <label className="block text-center text-[10px] text-amber-600 font-semibold mb-1 flex justify-center items-center gap-1"><Star className="w-3 h-3"/> تقييمات 2</label>
                 <input name="reviewImages2" type="file" accept="image/*" multiple onChange={handleReview2Change} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                 <div className="flex flex-col items-center justify-center text-slate-400 h-12">
                  {reviewPreview2.length > 0 ? <span className="text-xs font-bold text-amber-500">{reviewPreview2.length} صور</span> : <ImageIcon className="w-5 h-5 opacity-50" />}
                 </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-2 pt-4 border-t border-slate-100">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full text-white font-bold py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md'}`}
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /><span className="text-sm">{uploadProgress || "جاري المعالجة..."}</span></>
                ) : (
                  <><span className="text-sm">حفظ ونشر المنتج</span><Send className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </motion.div>

        </form>
      </main>
    </div>
  );
}