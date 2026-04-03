'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById, placeOrder, saveDraftOrder, deletDraft } from "@/actions/shop";
import { Cairo, Tajawal } from 'next/font/google';
import {
  ArrowRight, ChevronLeft, ChevronRight, CreditCard,
  MapPin, Truck, AlertOctagon, CheckCircle2, XCircle,
  Minus, Plus, ShieldCheck, Star,
  UserCircle, BookOpen, Palette, HeartHandshake, Package,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { img } from 'motion/react-client';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '700', '900'] });
const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400', '500', '700', '800'] });

// --- DEFAULT PACKAGES (البيانات الاحتياطية متضمنة النص) ---
const defaultPackages = [
  { id: 'pack-5', quantity: 5, price: 4650, title: "مصاحف برواية ورش عن نافع مقاس 14.20 سم" },
  { id: 'pack-7', quantity: 7, price: 5990, title: "مصاحف برواية ورش عن نافع مقاس 14.20 سم" },
  { id: 'pack-10', quantity: 10, price: 7950, title: "مصاحف برواية ورش عن نافع مقاس 14.20 سم" },
  { id: 'pack-15', quantity: 15, price: 12800, title: "مصاحف برواية ورش عن نافع مقاس 14.20 سم" }
];

const wilayasData = [
  { "IDWilaya": 1, "Wilaya": "Adrar", "Domicile": "1400", "Stopdesk": "970", "Annuler": "200" },
  { "IDWilaya": 2, "Wilaya": "Chlef", "Domicile": "750", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 3, "Wilaya": "Laghouat", "Domicile": "950", "Stopdesk": "670", "Annuler": "200" },
  { "IDWilaya": 4, "Wilaya": "Oum El Bouaghi", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 5, "Wilaya": "Batna", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 6, "Wilaya": "Bejaia", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 7, "Wilaya": "Biskra", "Domicile": "950", "Stopdesk": "670", "Annuler": "200" },
  { "IDWilaya": 8, "Wilaya": "Bechar", "Domicile": "1050", "Stopdesk": "720", "Annuler": "200" },
  { "IDWilaya": 9, "Wilaya": "Blida", "Domicile": "750", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 10, "Wilaya": "Bouira", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 11, "Wilaya": "Tamanrasset", "Domicile": "1600", "Stopdesk": "1120", "Annuler": "250" },
  { "IDWilaya": 12, "Wilaya": "Tebessa", "Domicile": "850", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 13, "Wilaya": "Tlemcen", "Domicile": "700", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 14, "Wilaya": "Tiaret", "Domicile": "750", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 15, "Wilaya": "Tizi Ouzou", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 16, "Wilaya": "Alger", "Domicile": "650", "Stopdesk": "470", "Annuler": "200" },
  { "IDWilaya": 17, "Wilaya": "Djelfa", "Domicile": "950", "Stopdesk": "670", "Annuler": "200" },
  { "IDWilaya": 18, "Wilaya": "Jijel", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 19, "Wilaya": "Sétif", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 20, "Wilaya": "Saida", "Domicile": "750", "Stopdesk": "570", "Annuler": "200" },
  { "IDWilaya": 21, "Wilaya": "Skikda", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 22, "Wilaya": "Sidi Bel Abbès", "Domicile": "700", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 23, "Wilaya": "Annaba", "Domicile": "850", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 24, "Wilaya": "Guelma", "Domicile": "850", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 25, "Wilaya": "Constantine", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 26, "Wilaya": "Medea", "Domicile": "750", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 27, "Wilaya": "Mostaganem", "Domicile": "700", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 28, "Wilaya": "M'Sila", "Domicile": "900", "Stopdesk": "570", "Annuler": "200" },
  { "IDWilaya": 29, "Wilaya": "Mascara", "Domicile": "700", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 30, "Wilaya": "Ouargla", "Domicile": "950", "Stopdesk": "720", "Annuler": "200" },
  { "IDWilaya": 31, "Wilaya": "Oran", "Domicile": "400", "Stopdesk": "370", "Annuler": "200" },
  { "IDWilaya": 32, "Wilaya": "El Bayadh", "Domicile": "1000", "Stopdesk": "670", "Annuler": "200" },
  { "IDWilaya": 33, "Wilaya": "Illizi", "Domicile": "0", "Stopdesk": "0", "Annuler": "0" },
  { "IDWilaya": 34, "Wilaya": "Bordj Bou Arreridj", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 35, "Wilaya": "Boumerdes", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 36, "Wilaya": "El Tarf", "Domicile": "850", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 37, "Wilaya": "Tindouf", "Domicile": "0", "Stopdesk": "0", "Annuler": "0" },
  { "IDWilaya": 38, "Wilaya": "Tissemsilt", "Domicile": "750", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 39, "Wilaya": "El Oued", "Domicile": "950", "Stopdesk": "720", "Annuler": "200" },
  { "IDWilaya": 40, "Wilaya": "Khenchela", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 41, "Wilaya": "Souk Ahras", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 42, "Wilaya": "Tipaza", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 43, "Wilaya": "Mila", "Domicile": "800", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 44, "Wilaya": "Ain Defla", "Domicile": "750", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 45, "Wilaya": "Naama", "Domicile": "1000", "Stopdesk": "670", "Annuler": "200" },
  { "IDWilaya": 46, "Wilaya": "Ain Temouchent", "Domicile": "650", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 47, "Wilaya": "Ghardaia", "Domicile": "950", "Stopdesk": "670", "Annuler": "200" },
  { "IDWilaya": 48, "Wilaya": "Relizane", "Domicile": "750", "Stopdesk": "520", "Annuler": "200" },
  { "IDWilaya": 49, "Wilaya": "Timimoun", "Domicile": "1400", "Stopdesk": "0", "Annuler": "200" },
  { "IDWilaya": 50, "Wilaya": "Bordj Badji Mokhtar", "Domicile": "0", "Stopdesk": "0", "Annuler": "0" },
  { "IDWilaya": 51, "Wilaya": "Ouled Djellal", "Domicile": "950", "Stopdesk": "670", "Annuler": "200" },
  { "IDWilaya": 52, "Wilaya": "Béni Abbès", "Domicile": "1050", "Stopdesk": "970", "Annuler": "200" },
  { "IDWilaya": 53, "Wilaya": "In Salah", "Domicile": "1600", "Stopdesk": "0", "Annuler": "250" },
  { "IDWilaya": 54, "Wilaya": "In Guezzam", "Domicile": "1600", "Stopdesk": "0", "Annuler": "250" },
  { "IDWilaya": 55, "Wilaya": "Touggourt", "Domicile": "950", "Stopdesk": "720", "Annuler": "200" },
  { "IDWilaya": 56, "Wilaya": "Djanet", "Domicile": "0", "Stopdesk": "0", "Annuler": "0" },
  { "IDWilaya": 57, "Wilaya": "M'Ghair", "Domicile": "950", "Stopdesk": "0", "Annuler": "200" },
  { "IDWilaya": 58, "Wilaya": "Meniaa", "Domicile": "950", "Stopdesk": "0", "Annuler": "200" }
];

const ProductCheckoutPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [productName, setProductName] = useState<string>("جاري التحميل...");
  const [price, setPrice] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [reviewImages1, setReviewImages1] = useState<string[]>([]);
  const [reviewImages2, setReviewImages2] = useState<string[]>([]);
  const [galleryImages_2,setGalleryImage_2]= useState<string[]>([]);
  const [fullScreen,setFullScreen]= useState(false);

  // --- DYNAMIC PACKAGES STATE ---
  const [availablePackages, setAvailablePackages] = useState(defaultPackages);
  const [count, setCount] = useState(defaultPackages[0].quantity); 
  const [selectedPackage, setSelectedPackage] = useState<any>(defaultPackages[0]);

  // --- DYNAMIC CONTENT STATES ---
  const [hookTitle, setHookTitle] = useState("مصاحف برواية ورش عن نافع مقاس 14.20 سم");
  const [hookSubtitle, setHookSubtitle] = useState("مع توصيل سريع");
  const [hookDesc, setHookDesc] = useState("ساهم في نشر كتاب الله واكسب أجراً مستمراً لك أو لمن تحب. اختر الباقة التي تناسبك ونحن نتكفل بالباقي.");
  const [hadithText, setHadithText] = useState("إذا مات ابن آدم انقطع عمله إلا من ثلاث: صدقة جارية، أو علم ينتفع به، أو ولد صالح يدعو له.");
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [selectedWilayaID, setSelectedWilayaID] = useState<number | "">("");
  const [deliveryType, setDeliveryType] = useState<"Domicile" | "Stopdesk">("Domicile");
  const [draftId , setDraftId] = useState<string | null>(null);

  const [shippingTotal, setShippingTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [poids,setPoids]= useState(0.75);
  const [extraCosts,setExtraCost]= useState(0);
 
  useEffect(()=>{
    if(!customerPhone || customerPhone.length !== 10) return;
    const timer = setTimeout(async () => {
      const draftData = {
        draftId: draftId,
        productId: id,
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
        wilaya: selectedWilayaID ? wilayasData.find(w => w.IDWilaya === Number(selectedWilayaID))?.Wilaya : "",
        deliveryType: deliveryType,
        quantity: count,
        total: finalTotal
      };
      const result = await saveDraftOrder(draftData);
      if (result?.draftId) setDraftId(result.draftId);
    }, 1000);
    return () => clearTimeout(timer);
  },[customerName, customerPhone, customerAddress, selectedWilayaID, deliveryType, count, finalTotal, draftId, id]);

  useEffect(() => {
    if (!id) return;
    const loadProduct = async () => {
      try {
        const product = await getProductById(id);
        if (product) {
          setProductName(product.name);
          setPrice(product.price);
          const validMainImage = product.imageUrl.startsWith('/') || product.imageUrl.startsWith('http') ? product.imageUrl : `/${product.imageUrl}`;
          setImages([validMainImage]);
         
          if (product.images) {
            try { setGalleryImages(JSON.parse(product.images) || []); } catch (e) { setGalleryImages([]); }
          }

          if (product.hookTitle) setHookTitle(product.hookTitle);
          if (product.hookSubtitle) setHookSubtitle(product.hookSubtitle);
          if (product.hookDesc) setHookDesc(product.hookDesc);
          if (product.hadithText) setHadithText(product.hadithText);
          if (product.reviewImages1) try { setReviewImages1(JSON.parse(product.reviewImages1)); } catch (e) {}
          if (product.reviewImages2) try { setReviewImages2(JSON.parse(product.reviewImages2)); } catch (e) {}
          if(product.galleryImages_2) try {setGalleryImage_2(JSON.parse(product.galleryImages_2));} catch (e) {}

          // استيراد الباقات الديناميكية
          if (product.packagesData) {
            try {
              const parsedPackages = JSON.parse(product.packagesData);
              if (parsedPackages && parsedPackages.length > 0) {
                setAvailablePackages(parsedPackages);
                setCount(parsedPackages[0].quantity); 
                setSelectedPackage(parsedPackages[0]);
              }
            } catch (e) {}
          }

        } else {
          setProductName("المنتج غير موجود");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    loadProduct();
  }, [id]);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    let cost = 0;
    let kg = poids * count;
    let currentExtraCost=0;
   
    if (selectedWilayaID) {
      const wilayaInfo = wilayasData.find(w => w.IDWilaya === Number(selectedWilayaID));
      if (wilayaInfo) {
        cost = parseInt(wilayaInfo[deliveryType], 10) || 0;
      }
    }
    setShippingTotal(cost);

    const activePackage = availablePackages.find((pkg: any) => pkg.quantity === count);
    setSelectedPackage(activePackage || null);
   
    if (kg > 5) {
      const integerkg = Math.floor(kg);
      const extraKg = integerkg - 5;
      if (extraKg > 0) {
        currentExtraCost = extraKg * 50;
      }
    }
    setExtraCost(currentExtraCost);

    if(activePackage) {
      setFinalTotal(activePackage.price + cost + currentExtraCost);
    } else {
      setFinalTotal((price * count) + cost+ currentExtraCost);
    }
  }, [selectedWilayaID, deliveryType, count, price, availablePackages]);

  const nextImage = () => { setCurrentGalleryIndex((preca) => (preca === galleryImages.length ? 0 : preca + 1)); };
  const precaImage = () => { setCurrentGalleryIndex((preca) => (preca === 0 ? galleryImages.length : preca - 1)); };
  const scrollToForm = () => { document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' }); };

  const handleCheckout = async () => {
    if (!customerAddress || !selectedWilayaID) {
      setMessage("الرجاء ملء جميع معلومات التوصيل .");
      return;
    }
    if(customerPhone.length !== 10){
      setMessage("الرجاء إدخال رقم هاتف صحيح مكون من 10 أرقام.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const selectedWilayaData = wilayasData.find(w => w.IDWilaya === Number(selectedWilayaID));
    const cityName = selectedWilayaData ? selectedWilayaData.Wilaya : "غير محدد";

    const orderData = {
      draftId: draftId,
      productId: id,
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      wilaya: cityName,
      deliveryType: deliveryType,
      quantity: count,
      total: finalTotal
    };

    try {
      const result = await placeOrder(orderData);
      if (result.success ) {
        if (draftId) {
            const formData = new FormData();
            formData.append('draftId', draftId);
            await deletDraft(formData);
        }
        router.push('/thank-you');
      }
    } catch (error) {
      setMessage("❌ حدث خطأ أثناء حفظ الطلب.");
    }
    setIsLoading(false);
  };

  return (
    <section className={`flex flex-col  h-full ${tajawal.className}   text-slate-900    `} >
      {/* --- HERO & FORM SECTION --- */}
      <section className="  p-6 -mr-2 sm:px-6 mt-40 lg:mt-60 ">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
             
            {/* RIGHT SIDE: Images */}
            <div className=" flex flex-col gap-6">
                  {images.length > 0 || galleryImages.length > 0 ? (
                    <img
                      src={[...images, ...galleryImages][currentGalleryIndex] ?? images[0] ?? ''}
                     alt="Product"
                     className="bg-cover rounded-3xl transition-transform duration-700 hover:scale-105 cursor-pointer "
                     onClick={()=>setFullScreen(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center animate-pulse text-slate-400">
                      جاري تحميل الصور...
                    </div>
                  )}
                 {fullScreen && (
                    <div className="fixed w-full inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl  cursor-zoom-out ">
                    <button className="absolute right-6 top-6 text-white transition-colors hover:text-orange-600 md:right-10 md:top-10" onClick={() => setFullScreen(false)}>
                      <X size={40} />
                    </button>
                    <div className="flex flex-col lg:flex items-center justify-center gap-2 ">
                     <button onClick={precaImage} className="p-2 bg-white shadow-sm border border-slate-200 rounded-full hover:bg-emerald-50 transition-colors">
                       <ChevronUp className="w-5 h-5 text-slate-700" />
                     </button>
                     <img
                       src={[...images, ...galleryImages][currentGalleryIndex] ?? images[0] ?? ''}
                       alt="Product Fullscreen"
                       className="max-h-[90vh] max-w-full rounded-3xl object-contain cursor-default select-none"
                       onClick={(e) => e.stopPropagation()}
                      />
                      <button onClick={nextImage} className="p-2 bg-white shadow-sm border border-slate-200 rounded-full hover:bg-emerald-50 transition-colors">
                        <ChevronDown className="w-5 h-5 text-slate-700" />
                      </button>
                    </div>
                    </div>
                 )}

                {/* Thumbnails */}
                {galleryImages.length > 0 && (
                  <div className="flex items-center justify-center gap-2 md:gap-4">
                    <button onClick={precaImage} className="p-2 bg-white shadow-sm border border-slate-200 rounded-full hover:bg-emerald-50 transition-colors">
                      <ChevronRight className="w-5 h-5 text-slate-700" />
                    </button>
                    <div className='flex gap-2 overflow-x-auto py-2 px-1 scrollbar-hide'>
                       <img
                         src={images[0]}
                         alt="Main Thumbnail"
                         className={`w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg cursor-pointer border-2 transition-all shrink-0 ${currentGalleryIndex === 0 ? 'border-emerald-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'} `}
                         onClick={() => setCurrentGalleryIndex(0)}
                       />
                      {galleryImages.map((img, index) => (
                      <img
                        key={index}
                        src={img.startsWith('/') || img.startsWith('http') ? img : `/${img}`}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg cursor-pointer border-2 transition-all shrink-0 ${currentGalleryIndex === index + 1 ? 'border-emerald-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'} `}
                        onClick={() => setCurrentGalleryIndex(index + 1)}
                      />
                    ))}
                    </div>
                    <button onClick={nextImage} className="p-2 bg-white shadow-sm border border-slate-200 rounded-full hover:bg-emerald-50 transition-colors">
                      <ChevronLeft className="w-5 h-5 text-slate-700" />
                    </button>
                  </div>
                )}
            </div>

             {/* --- MARKETING HOOK --- */}
            <section className="pt-24 lg:hidden md:hidden  px-4 sm:px-6">
             <div className="max-w-4xl mx-auto -mt-15 text-center">
                <h1 className={`${cairo.className} text-3xl md:text-5xl font-black text-slate-800 leading-tight mb-4`}>
                 {hookTitle}  <br className="hidden md:block"/>
                  <span className="text-emerald-600"> {hookSubtitle} </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 font-medium mb-8">
                 {hookDesc}
                </p>
              </div>
            </section>
           
            {/* LEFT SIDE: THE FORM */}
            <div id="checkout-form" className=" bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden top-24 ">
               <div className="bg-emerald-600 text-white p-6 text-center relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-900 rounded-full opacity-20 blur-2xl"></div>
                  <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full opacity-20 blur-2xl"></div>
                  <h2 className={`${cairo.className} text-xl sm:text-2xl font-bold mb-2 relative z-10`}>المرجو ادخال المعلومات   </h2>
                  <p className="text-sm text-slate-300 mt-2 relative z-10">باقة {count} قطع</p>
               </div>
                     
               <div className="p-6 sm:p-8 space-y-4">
                    <div className="space-y-4">
                        <input type="text" placeholder="الاسم الكامل" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                       
                        <input type="tel" placeholder="رقم الهاتف (للاتصال)" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-left" dir="ltr"
                            value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                       
                        <div className="grid grid-cols-2 gap-3">
                             <select value={selectedWilayaID} onChange={(e) => setSelectedWilayaID(Number(e.target.value))}
                                 className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500">
                                 <option value="" disabled>الولاية</option>
                                 {wilayasData.map((w) => (<option key={w.IDWilaya} value={w.IDWilaya}>{w.IDWilaya} - {w.Wilaya}</option>))}
                             </select>
                           
                             <input type="text" placeholder="البلدية" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                                 value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
                        </div>

                         <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                          <span className="font-bold text-slate-700">الكمية:</span>
                             <div className="flex items-center gap-4 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                                <button onClick={decrement} className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded hover:bg-slate-200 transition-colors"><Minus size={16} /></button>
                                 <span className="font-bold text-xl w-6 text-center">{count}</span>
                               <button onClick={increment} className="w-8 h-8 flex items-center justify-center bg-orange-100 rounded hover:bg-orange-200 text-orange-600 transition-colors"><Plus size={16} /></button>
                              </div>
                             </div>

                        {/* --- أزرار اختيار نوع التوصيل --- */}
                        <div className="flex gap-3 mt-4">
                            <button type="button" onClick={() => setDeliveryType("Domicile")} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-bold transition-all ${deliveryType === "Domicile" ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm' : 'border-slate-200 text-slate-500 hover:bg-slate-50' }`}><Truck className="w-5 h-5" /> للمنزل</button>
                            <button type="button" onClick={() => setDeliveryType("Stopdesk")} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-bold transition-all ${deliveryType === "Stopdesk" ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm' : 'border-slate-200 text-slate-500 hover:bg-slate-50' }`}><Package className="w-5 h-5" /> للمكتب (Stopdesk)</button>
                        </div>

                        {selectedWilayaID && (
                         <div className='border-2 border-dashed border-emerald-500 bg-emerald-50 w-full p-4 text-center rounded-xl text-emerald-700 font-bold flex flex-col items-center justify-center gap-2 animate-in fade-in'>
                             <div className="flex items-center gap-2">
                                <Truck className="w-5 h-5" />
                                <span>توصيل إلى ({wilayasData.find(w=>w.IDWilaya === selectedWilayaID)?.Wilaya}) - {deliveryType === 'Domicile' ? 'للمنزل' : 'للمكتب'}</span>
                             </div>
                             <span className="text-xl bg-white px-3 py-1 rounded-lg border border-emerald-200 mt-1 shadow-sm">{shippingTotal > 0 ? `${shippingTotal} د.ج` : 'مجاني'}</span>
                         </div>
                        )}

                        {/* --- PACKAGE SELECTION SECTION (DYNAMIC) --- */}
                        {availablePackages.length > 0 && (
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4">
                             <span className="font-bold text-slate-700 block mb-3 text-lg">اختر حجم الباقة:</span>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                               {availablePackages.map((pkg: any, index: number) => (
                                 <button
                                   key={index}
                                   type="button"
                                   onClick={() => setCount(pkg.quantity)}
                                   className={`p-4 rounded-xl border-2 flex flex-col items-start text-right transition-all ${
                                     selectedPackage?.quantity === pkg.quantity
                                     ? 'border-emerald-500 bg-emerald-50 shadow-md scale-[1.02]'
                                     : 'border-slate-200 hover:border-emerald-300 bg-white'
                                   }`}
                                 >
                                   <div className="flex justify-between items-center w-full mb-2">
                                     <span className="font-black text-xl text-emerald-600 bg-emerald-100 px-3 py-1 rounded-lg"> 
                                       {pkg.quantity} قطع 
                                     </span>
                                     <span className={`text-lg font-black ${selectedPackage?.quantity === pkg.quantity ? 'text-emerald-700' : 'text-slate-800'}`}>
                                       {pkg.price} د.ج
                                     </span>
                                   </div>
                                    
                                    <span className="font-bold text-sm text-slate-600 leading-relaxed"> 
                                      {pkg.title || "باقة مميزة"} 
                                    </span>
                                    
                                 </button>
                               ))}
                             </div>
                          </div>
                        )}

                        <div className="pt-4 border-t border-slate-100 space-y-3">
                           <div className="flex justify-between items-center text-sm text-slate-500">
                              <span>المجموع (باقة {count} قطع):</span>
                              <span className="font-bold">{selectedPackage ? selectedPackage.price : (price * count)} د.ج</span>
                           </div>
                           <div className="flex justify-between items-center text-sm text-slate-500">
                              <span>التوصيل ({deliveryType === 'Domicile' ? 'للمنزل' : 'للمكتب'}):</span>
                              <span className="font-bold">{!selectedWilayaID ? `0 د.ج` : `${shippingTotal} د.ج`}</span>
                           </div>
                           <div className="flex justify-between items-center text-xl sm:text-2xl font-black text-slate-900 mt-4 pt-4 border-t border-slate-100">
                               <span>المجموع الكلي:</span>
                               <span className="text-emerald-600">{finalTotal} د.ج</span>
                           </div>
                        </div>

                        <button onClick={handleCheckout} disabled={isLoading} className="w-full py-4 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-black rounded-xl shadow-[0_8px_20px_rgb(5,150,105,0.3)] hover:shadow-[0_8px_25px_rgb(5,150,105,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0">
                             {isLoading ? <span className="animate-spin text-2xl">↻</span> : <><ShieldCheck className="w-6 h-6"/> اطلب باقتك الآن</>}
                        </button>
                        <p className="text-center text-slate-400 text-sm mt-2">الدفع عند الاستلام (Main à main) - ضمان 100%</p>
                        {message && <p className="text-center text-red-600 font-bold bg-red-50 p-3 rounded-lg border border-red-100 mt-2 animate-in fade-in slide-in-from-top-2">{message}</p>}
                    </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 -mr-2  bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className='flex flex-col gap-3'>
             {galleryImages_2.map((imgSrc, idx) => (
                <img key={idx} src={imgSrc}  className="w-full h-auto object-cover  shadow-sm border border-slate-200" />
              ))}
           </div>
          </div>
      </section>

      {/* --- HADITH SECTION --- */}
      <section className="pt-24   px-4 sm:px-6">
        <div className="max-w-4xl mx-auto -mt-15 text-center">
          <div className="bg-emerald-50 border-2 border-emerald-200 border-dashed rounded-xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-center gap-3  shadow-sm">
            <HeartHandshake className="text-emerald-500 w-10 h-10 shrink-0 animate-pulse" />
            <p className="text-emerald-800 w-60 font-bold text-base md:text-lg">
                {hadithText}
            </p>
          </div>
        </div>
      </section>

      {/* --- REVIEWS 1 --- */}
      <section className="py-16 px-4 mr-4 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-8 h-8 text-yellow-400 fill-yellow-400" />)}
              </div>
              <h2 className={`${cairo.className} text-3xl font-black text-slate-800 mb-8`}>آراء من ساهموا معنا في الخير</h2>
                <div className='grid grid-cols-2 gap-3'>
                  {reviewImages1.map((imgSrc, idx) => (
                    <img key={idx} src={imgSrc} alt='Review' className="w-full h-auto object-cover rounded-xl shadow-sm border border-slate-200" />
                  ))}
                </div>
          </div>
      </section>

      {/* --- REVIEWS 2 --- */}
      <section className="py-16 px-4 mr-4 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-8 h-8 text-yellow-400 fill-yellow-400" />)}
              </div>
              <h2 className={`${cairo.className} text-3xl font-black text-slate-800 mb-8`}>آراء عملائنا الأخرى</h2>
                <div className='grid grid-cols-2 lg:grid-cols-2 gap-3'>
                  {reviewImages2.map((imgSrc, idx) => (
                    <img key={idx} src={imgSrc} alt='Review' className="w-full h-auto object-cover rounded-xl shadow-sm border border-slate-200" />
                  ))}
                </div>
          </div>
      </section>

      {/* --- STICKY CTA BUTTON --- */}
      <div className="fixed -bottom-3 left-0 w-full p-4 bg-white/95 backdrop-blur-md rounded-t-3xl border-t border-slate-200 z-50 flex flex-col items-center justify-center shadow-[0_-15px_40px_rgba(0,0,0,0.08)] -right-5 lg:right-0">
          <button onClick={scrollToForm} className="w-full  max-w-md py-4 bg-emerald-600 text-white text-xl font-black rounded-xl shadow-[0_8px_20px_rgb(5,150,105,0.3)] hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 animate-[pulse_2s_infinite]">
              <HeartHandshake className="w-6 h-6" /> إملأ معلوماتك  وإختر باقتك
          </button>
          <span className="text-emerald-700 text-sm font-bold mt-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> لا تدفع شيئاً الآن.. الدفع يداً بيد عند الاستلام
          </span>
      </div>
    </section>
  );
};

export default ProductCheckoutPage;