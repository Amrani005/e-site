"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { UpgradeProduct } from "@/actions/UpgradeProduct"; 
import { motion } from "framer-motion";
import { PackagePlus, DollarSign, AlignLeft, Send, UploadCloud, ImageIcon, Loader2, Type, Quote, Star, ListPlus, X, Pencil } from "lucide-react";
import Link from "next/link";
import SideBarNav from "@/components/SideBarNav";

const CLOUD_NAME = "deimq7tzj"; 
const UPLOAD_PRESET = "dxtx2rdd"; 

export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const safeParse = (data: any) => {
    if (!data) return [];
    try { return JSON.parse(data); } catch (e) { return []; }
  };

  const [imageUrl, setImageUrl] = useState<string | null>(product?.imageUrl || null);
  const [galleryImage, setGalleryImage] = useState<string[]>(safeParse(product?.images));
  const [reviewPreview1, setReviewPreview1] = useState<string[]>(safeParse(product?.reviewImages1));
  const [reviewPreview2, setReviewPreview2] = useState<string[]>(safeParse(product?.reviewImages2));
  const [galleryImages_2, setGalleryImages_2] = useState<string[]>(safeParse(product?.galleryImages_2));
  
  const [dynamicPackages, setDynamicPackages] = useState<any[]>(() => {
    const pkgs = safeParse(product?.packagesData);
    return pkgs.length > 0 ? pkgs : [{ quantity: 5, price: product?.price || 4650, title: product?.name || "" }];
  });

  useEffect(() => {
    if (product) {
      setImageUrl(product.imageUrl || null);
      setGalleryImage(safeParse(product.images));
      setReviewPreview1(safeParse(product.reviewImages1));
      setReviewPreview2(safeParse(product.reviewImages2));
      setGalleryImages_2(safeParse(product.galleryImages_2));
      const pkgs = safeParse(product.packagesData);
      if (pkgs.length > 0) setDynamicPackages(pkgs);
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageUrl(URL.createObjectURL(file));
  };
  
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    const files = e.target.files;
    if (files && files.length > 0) setter(Array.from(files).map(file => URL.createObjectURL(file)));
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
      return json.secure_url;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress("جاري التحقق وتحديث البيانات...");

    try {
      const form = e.currentTarget;
      const finalData = new FormData();
      
      finalData.append("id", product.id);
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
        setUploadProgress("جاري رفع الصورة الرئيسية...");
        const url = await uploadToCloudinary(imageInput.files[0]);
        if (url) finalData.append("imageUrl", url);
      } else {
        finalData.append("imageUrl", product.imageUrl || "");
      }

      // دالة مساعدة لرفع المعارض المتعددة
      const processGallery = async (inputName: string, oldData: string) => {
        const input = form.elements.namedItem(inputName) as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          setUploadProgress(`جاري رفع صور ${inputName}...`);
          const urls = [];
          for (let i = 0; i < input.files.length; i++) {
            const url = await uploadToCloudinary(input.files[i]);
            if (url) urls.push(url);
          }
          finalData.append(inputName, JSON.stringify(urls));
        } else {
          finalData.append(inputName, oldData || "[]");
        }
      };

      await processGallery("gallery", product.images);
      await processGallery("galleryImages_2", product.galleryImages_2);
      await processGallery("reviewImages1", product.reviewImages1);
      await processGallery("reviewImages2", product.reviewImages2);

      setUploadProgress("جاري حفظ البيانات في السيرفر...");
      
      const result = await UpgradeProduct(finalData);

      if (result && result.success) {
        router.push("/dashboard/products");
        router.refresh();
      } else {
        alert("فشل التعديل! تأكد من صحة البيانات.");
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
      {/* Header - Sticky at top for easy access on mobile */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 hidden sm:block">
            <Pencil className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">تعديل المنتج</h1>
            <p className="text-xs text-slate-500">تحديث تفاصيل: {product?.name}</p>
          </div>
        </div>
        <Link 
          href='/dashboard/products' 
          className="text-xs md:text-sm font-medium text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 px-3 py-2 md:px-4 rounded-lg transition-colors border border-slate-200 flex items-center gap-2"
        >
          <X className="w-4 h-4" /> <span className="hidden sm:inline">إلغاء والعودة</span>
        </Link>
      </header>

      {/* Main Form - Grid changes to 1 column on mobile, 3 columns on desktop */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* COLUMN 1: Basic Info & Packages */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
            <h2 className="text-sm font-bold text-indigo-600 mb-1 border-b border-slate-100 pb-2">المعلومات الأساسية</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="relative">
                 <label className="text-xs font-semibold text-slate-500 mb-1 block">اسم المنتج</label>
                 <input name="name" type="text" defaultValue={product?.name || ""} placeholder="مثال: باقة رمضان" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" required disabled={isSubmitting} />
              </div>
              <div className="relative">
                 <label className="text-xs font-semibold text-slate-500 mb-1 block">السعر الافتراضي</label>
                 <input name="price" type="number" defaultValue={product?.price || ""} placeholder="مثال: 4500" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" required disabled={isSubmitting} />
              </div>
            </div>

            <div className="relative">
               <label className="text-xs font-semibold text-slate-500 mb-1 block">وصف المنتج</label>
               <textarea name="description" rows={3} defaultValue={product?.description || ""} placeholder="وصف تفصيلي للمنتج..." className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none" disabled={isSubmitting} />
            </div>

            <div className="mt-2 flex flex-col">
              <h3 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1"><ListPlus className="w-4 h-4 text-indigo-500"/> تخصيص الباقات</h3>
              
              <div className="space-y-3">
                {dynamicPackages.map((pkg: any, index: number) => (
                  <div key={index} className="flex flex-col gap-2 p-3 border border-slate-100 rounded-lg bg-slate-50">
                    <div className="flex gap-2">
                      <input type="number" placeholder="الكمية" required value={pkg.quantity} onChange={(e) => { const newPkgs = [...dynamicPackages]; newPkgs[index].quantity = Number(e.target.value); setDynamicPackages(newPkgs); }} className="w-1/3 p-2 bg-white border border-slate-200 rounded text-sm focus:border-indigo-500 outline-none" />
                      <input type="number" placeholder="السعر" required value={pkg.price} onChange={(e) => { const newPkgs = [...dynamicPackages]; newPkgs[index].price = Number(e.target.value); setDynamicPackages(newPkgs); }} className="w-1/3 p-2 bg-white border border-slate-200 rounded text-sm focus:border-indigo-500 outline-none" />
                      <button type="button" onClick={() => setDynamicPackages(dynamicPackages.filter((_, i) => i !== index))} className="w-1/3 p-2 bg-red-50 text-red-600 text-xs font-bold rounded hover:bg-red-100 transition-colors">حذف</button>
                    </div>
                    <input type="text" placeholder="محتوى الباقة" required value={pkg.title} onChange={(e) => { const newPkgs = [...dynamicPackages]; newPkgs[index].title = e.target.value; setDynamicPackages(newPkgs); }} className="w-full p-2 bg-white border border-slate-200 rounded text-sm focus:border-indigo-500 outline-none" />
                  </div>
                ))}
              </div>
              
              <button type="button" onClick={() => setDynamicPackages([...dynamicPackages, { quantity: 1, price: 1000, title: "باقة جديدة" }])} className="mt-3 text-xs w-full text-indigo-600 bg-indigo-50 border border-indigo-100 py-2.5 rounded-lg hover:bg-indigo-100 transition-colors font-bold">
                + إضافة باقة أخرى
              </button>
            </div>
          </motion.div>

          {/* COLUMN 2: Marketing Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
            <h2 className="text-sm font-bold text-indigo-600 mb-1 border-b border-slate-100 pb-2">النصوص التسويقية (Landing Page)</h2>
            
            <div className="relative">
               <label className="text-xs font-semibold text-slate-500 mb-1 block">العنوان العريض (الخطاف)</label>
               <input name="hookTitle" type="text" defaultValue={product?.hookTitle || ""} placeholder="مثال: فرصة لا تعوض..." className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" disabled={isSubmitting} />
            </div>
            
            <div className="relative">
               <label className="text-xs font-semibold text-slate-500 mb-1 block">العنوان الفرعي</label>
               <input name="hookSubtitle" type="text" defaultValue={product?.hookSubtitle || ""} placeholder="وصف قصير تحت العنوان العريض..." className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" disabled={isSubmitting} />
            </div>

            <div className="relative">
               <label className="text-xs font-semibold text-slate-500 mb-1 block flex items-center gap-1"><Quote className="w-3 h-3"/> نص الحديث النبوي أو الحكمة</label>
               <textarea name="hadithText" rows={3} defaultValue={product?.hadithText || ""} placeholder="قال رسول الله صلى الله عليه وسلم..." className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none" disabled={isSubmitting} />
            </div>

            <div className="relative">
               <label className="text-xs font-semibold text-slate-500 mb-1 block">الوصف التسويقي</label>
               <textarea name="hookDesc" rows={5} defaultValue={product?.hookDesc || ""} placeholder="اشرح للزبون لماذا يجب عليه شراء هذا المنتج الآن..." className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none" disabled={isSubmitting} />
            </div>
          </motion.div>

          {/* COLUMN 3: Media & Submit Action */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col gap-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 lg:sticky lg:top-24">
            <h2 className="text-sm font-bold text-indigo-600 mb-1 border-b border-slate-100 pb-2">الصور والمراجعات</h2>

            {/* Main Image */}
            <div className="relative group border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl bg-slate-50 p-3 transition-colors h-32 flex flex-col justify-center">
              <label className="absolute top-2 right-3 text-[10px] text-slate-400 font-bold">تغيير الصورة الرئيسية</label>
              <input name="image" type="file" accept="image/*" onChange={handleImageChange} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="flex flex-col items-center justify-center text-slate-400">
                {imageUrl ? <img src={imageUrl} alt="Preview" className="h-24 w-auto object-contain rounded" /> : <><UploadCloud className="w-6 h-6 text-indigo-400 mb-1" /><span className="text-xs">اضغط لتغيير الصورة</span></>}
              </div>
            </div>

            {/* 4 Grid Small Images */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl bg-slate-50 p-2 transition-colors h-24">
                 <label className="block text-center text-[10px] text-slate-500 font-semibold mb-1">صور المعرض 1</label>
                 <input name="gallery" type="file" accept="image/*" multiple onChange={(e) => handleGalleryChange(e, setGalleryImage)} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                 <div className="flex flex-col items-center justify-center text-slate-400 h-12">
                  {galleryImage.length > 0 ? <span className="text-xs font-bold text-indigo-500">تم تحديد {galleryImage.length}</span> : <ImageIcon className="w-5 h-5 opacity-50" />}
                 </div>
              </div>

              <div className="relative group border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl bg-slate-50 p-2 transition-colors h-24">
                 <label className="block text-center text-[10px] text-slate-500 font-semibold mb-1">صور المعرض 2</label>
                 <input name="galleryImages_2" type="file" accept="image/*" multiple onChange={(e) => handleGalleryChange(e, setGalleryImages_2)} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                 <div className="flex flex-col items-center justify-center text-slate-400 h-12">
                  {galleryImages_2.length > 0 ? <span className="text-xs font-bold text-indigo-500">تم تحديد {galleryImages_2.length}</span> : <ImageIcon className="w-5 h-5 opacity-50" />}
                 </div>
              </div>

              <div className="relative group border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-xl bg-slate-50 p-2 transition-colors h-24">
                 <label className="block text-center text-[10px] text-amber-600 font-semibold mb-1 flex justify-center items-center gap-1"><Star className="w-3 h-3"/> تقييمات 1</label>
                 <input name="reviewImages1" type="file" accept="image/*" multiple onChange={(e) => handleGalleryChange(e, setReviewPreview1)} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                 <div className="flex flex-col items-center justify-center text-slate-400 h-12">
                  {reviewPreview1.length > 0 ? <span className="text-xs font-bold text-amber-500">تم تحديد {reviewPreview1.length}</span> : <ImageIcon className="w-5 h-5 opacity-50" />}
                 </div>
              </div>

              <div className="relative group border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-xl bg-slate-50 p-2 transition-colors h-24">
                 <label className="block text-center text-[10px] text-amber-600 font-semibold mb-1 flex justify-center items-center gap-1"><Star className="w-3 h-3"/> تقييمات 2</label>
                 <input name="reviewImages2" type="file" accept="image/*" multiple onChange={(e) => handleGalleryChange(e, setReviewPreview2)} disabled={isSubmitting} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                 <div className="flex flex-col items-center justify-center text-slate-400 h-12">
                  {reviewPreview2.length > 0 ? <span className="text-xs font-bold text-amber-500">تم تحديد {reviewPreview2.length}</span> : <ImageIcon className="w-5 h-5 opacity-50" />}
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
                  <><span className="text-sm">حفظ التعديلات</span><Send className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </motion.div>

        </form>
      </main>
    </div>
  );
}