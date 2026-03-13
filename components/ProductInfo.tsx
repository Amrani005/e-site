'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById, placeOrder, saveDraftOrder, deletDraft } from "@/actions/shop"; 
import { Cairo, Tajawal } from 'next/font/google'; 
import { 
  ArrowRight, ChevronLeft, ChevronRight, CreditCard, 
  MapPin, Truck, AlertOctagon, CheckCircle2, XCircle, 
  Minus, Plus, ShieldCheck, Star, 
  UserCircle, BookOpen, Palette // 👈 أيقونات جديدة تناسب منتجاتك
} from 'lucide-react';

// --- 1. FONTS SETUP ---
const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '700', '900'] });
const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400', '500', '700', '800'] });

// --- DATA CONFIGURATION ---
// 👈 هنا قمنا بتحديث المنتجات لربطها بمشكلة تأخر النطق والتعلم
const boxItems = [
  { 
    id: 1, 
    title: "كتاب جسم الإنسان التفاعلي + مجسمات", 
    description: "يخلي وليدك يتعلم أسماء أعضاء الجسم بطريقة ملموسة، ويشجعه ينطقها وهو يركب في المجسمات، مما ينمي مهاراته الحركية والذهنية في نفس الوقت.", 
    isGift: false, 
    icon: <UserCircle className="w-8 h-8 text-blue-500" /> 
  },
  { 
    id: 2, 
    title: "قصتين كرتونيتين (سلسلة الفتى الماهر)", 
    description: "صور كرتونية جذابة تشد انتباه الطفل وتزيد تركيزه. القراءة المشتركة تبني رصيده اللغوي بكلمات جديدة وتخليه يحاول يقلد الأصوات والأحداث.", 
    isGift: false, 
    icon: <BookOpen className="w-8 h-8 text-purple-500" /> 
  },
  { 
    id: 3, 
    title: "كتاب للتلوين والرسم", 
    description: "مساحة حرة يعبر فيها وليدك وتفرغ طاقته، وفرصة ممتازة باش تجلسي معاه وتسميلو الألوان والأشكال باش تحفزيه على النطق أثناء اللعب.", 
    isGift: true, 
    icon: <Palette className="w-8 h-8 text-yellow-600" /> 
  }
];

const scenarios = [
  { 
    type: 'bad', 
    icon: <XCircle className="w-10 h-10 text-red-500 shrink-0" />, 
    text: "السيناريو المقلق: وليدك ينعزل، يلقى صعوبة باش يفهموه الناس، ويبكي كي ما يقدرش يعبر على واش يحب." 
  },
  { 
    type: 'good', 
    icon: <CheckCircle2 className="w-10 h-10 text-green-500 shrink-0" />, 
    text: "السيناريو اللي نتمناوه: طفل واثق، يهدر بطلاقة، يعبر على أفكارو، ويفرحك بأول كلماته الواضحة!" 
  }
];

// --- WILAYA DATA ---
interface WilayaData { IDWilaya: number; Wilaya: string; Domicile: string; Stopdesk: string; Annuler: string; }
const wilayasData: WilayaData[] = [
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

  // Product Data State
  const [productName, setProductName] = useState<string>("جاري التحميل...");
  const [price, setPrice] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]); 

  // Form States
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [selectedWilayaID, setSelectedWilayaID] = useState<number | "">("");
  const [deliveryType, setDeliveryType] = useState<"Domicile" | "Stopdesk">("Domicile");
  const [draftId , setDraftId] = useState<string | null>(null);

  // Calculation States
  const [count, setCount] = useState(1);
  const [shippingTotal, setShippingTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  
  // حفظ المسودة التلقائي
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

  // جلب المنتج
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
            try {
              const parsedGallery = JSON.parse(product.images);
              setGalleryImages(Array.isArray(parsedGallery) ? parsedGallery : []);
            } catch (e) {
              setGalleryImages([]);
            }
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

  // حساب التكلفة
  useEffect(() => {
    
    
    setFinalTotal((price * count) ); 
  }, [selectedWilayaID, deliveryType, price, count]); 

  // Helpers
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => { if(count > 1 ) setCount((prev) => prev - 1); };
  const nextImage = () => { setCurrentGalleryIndex((prev) => (prev === galleryImages.length ? 0 : prev + 1)); };
  const prevImage = () => { setCurrentGalleryIndex((prev) => (prev === 0 ? galleryImages.length : prev - 1)); };

  const scrollToForm = () => {
    document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // إرسال الطلب النهائي
  const handleCheckout = async () => {
    if (!customerName  || !customerAddress || !selectedWilayaID) {
      setMessage("الرجاء ملء جميع معلومات التوصيل (الولاية مطلوبة).");
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
      console.error(error);
      setMessage("❌ حدث خطأ أثناء حفظ الطلب.");
    }
    setIsLoading(false);
  };

  return (
    <section className={`flex flex-col  h-full${tajawal.className} text-right  text-slate-900    `} dir="rtl">
      
      {/* --- MARKETING HOOK (Top Section) --- */}
      <section className="pt-24 pb-6 mr-5 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto mt-6 text-center">
          <h1 className={`${cairo.className} text-3xl md:text-5xl font-black text-slate-800 leading-tight mb-4`}>
            خايفة على وليدك من <br className="hidden md:block"/> 
            <span className="text-red-600">تأخر النطق وصعوبات التعلم؟ 🥺</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium mb-8">
            الحل راهو بين يديك! اكتشفي <span className="font-bold text-orange-600">باقة التعلم التفاعلي والتخاطب</span> + هدية التلوين لتنمية تركيزه.
          </p>
          
          {/* Warning Box */}
          <div className="bg-red-50 border-2 border-red-200 border-dashed rounded-xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 shadow-sm">
            <AlertOctagon className="text-red-500 w-10 h-10 shrink-0 animate-pulse" />
            <p className="text-red-700 font-bold text-base md:text-lg">
              تأخر الكلام وضعف التركيز يقدر يأثر على ثقة الطفل بنفسه.. الأنشطة التفاعلية الملموسة هي أفضل حل لإنقاذه!
            </p>
          </div>
        </div>
      </section>

      {/* --- HERO & FORM SECTION --- */}
      <section className="pb-12  mr-5 sm:px-6 ">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 
          items-start">
            
            {/* RIGHT SIDE: Images */}
            <div className="order-1 flex flex-col gap-6">
                <div className="relative w-full aspect-[4/3] rounded-2xl 
                shadow-xl overflow-hidden border-4 border-white
                 bg-white">
                  {images.length > 0 || galleryImages.length > 0 ? (
                    <img
                      src={[...images, ...galleryImages][currentGalleryIndex]
                       ?? 
                       images[0]  
                       ?? 
                      ''}
                     alt="Product"
                     className="w-full h-full object-cover 
                     transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex 
                    items-center justify-center animate-pulse 
                    text-slate-400">
                      جاري تحميل الصور...
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {galleryImages.length > 0 && (
                  <div className="flex items-center justify-center gap-2 md:gap-4">
                    <button onClick={prevImage} className="p-2 bg-white shadow-sm border border-slate-200 rounded-full hover:bg-orange-50 transition-colors">
                      <ChevronRight className="w-5 h-5 text-slate-700" />
                    </button>
                    <div className='flex gap-2 overflow-x-auto py-2 px-1 scrollbar-hide'>
                       <img
                         src={images[0]}
                         alt="Main Thumbnail"
                         className={`w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg cursor-pointer border-2 transition-all shrink-0
                         ${currentGalleryIndex === 0 ? 'border-orange-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}
                         `}
                         onClick={() => setCurrentGalleryIndex(0)} 
                       />
                      {galleryImages.map((img, index) => (
                      <img
                        key={index}
                        src={img.startsWith('/') || img.startsWith('http') ? img : `/${img}`} 
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg cursor-pointer border-2 transition-all shrink-0
                        ${currentGalleryIndex === index + 1 ? 'border-orange-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}
                        `}
                        onClick={() => setCurrentGalleryIndex(index + 1)} 
                      />
                    ))}
                    </div>
                    <button onClick={nextImage} className="p-2 bg-white shadow-sm border border-slate-200 rounded-full hover:bg-orange-50 transition-colors">
                      <ChevronLeft className="w-5 h-5 text-slate-700" />
                    </button>
                  </div>
                )}
            </div>
            
            {/* LEFT SIDE: THE FORM */}
            <div id="checkout-form" className="order-2 bg-white
              rounded-3xl shadow-xl border border-slate-200 overflow-hidden sticky top-24">
               <div className="bg-slate-900 text-white p-6 text-center relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500 rounded-full opacity-20 blur-2xl"></div>
                  <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
                  <h2 className={`${cairo.className} text-xl sm:text-2xl font-bold mb-2 relative z-10`}>عرض خاص للأمهات الحريصات 💎</h2>
                  <div className="flex items-center justify-center gap-3 relative z-10">
                      <span className="text-green-400 text-4xl font-black">{price} د.ج</span>
                  </div>
                  <p className="text-sm text-slate-300 mt-2 relative z-10">السعر شامل المنتجات + هدية التلوين</p>
               </div>

               <div className="p-6 sm:p-8 space-y-4">
                    <div className="space-y-4">
                        <input type="text" placeholder="الاسم الكامل" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                        
                        <input type="tel" placeholder="رقم الهاتف (للاتصال)" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all text-left" dir="ltr"
                            value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                        
                        <div className="grid grid-cols-2 gap-3">
                             <select value={selectedWilayaID} onChange={(e) => setSelectedWilayaID(Number(e.target.value))}
                                 className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500">
                                 <option value="" disabled>الولاية</option>
                                 {wilayasData.map((w) => (<option key={w.IDWilaya} value={w.IDWilaya}>{w.IDWilaya} - {w.Wilaya}</option>))}
                             </select>
                            
                             <input type="text" placeholder="البلدية" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                                 value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
                        </div>
                               
                        {selectedWilayaID && (
                         <div className='border-2 border-dashed border-green-500 bg-green-50 w-full p-4 text-center rounded-xl text-green-700 font-bold flex items-center justify-center gap-2 animate-in fade-in'>
                             <Truck className="w-5 h-5" />
                             <span>توصيل  مجاني ({wilayasData.find(w=>w.IDWilaya === selectedWilayaID)?.Wilaya})</span>
                         </div>
                        )}

                        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                           <span className="font-bold text-slate-700">الكمية:</span>
                           <div className="flex items-center gap-4 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                              <button onClick={decrement} className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded hover:bg-slate-200 transition-colors"><Minus size={16} /></button>
                              <span className="font-bold text-xl w-6 text-center">{count}</span>
                              <button onClick={increment} className="w-8 h-8 flex items-center justify-center bg-orange-100 rounded hover:bg-orange-200 text-orange-600 transition-colors"><Plus size={16} /></button>
                           </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 space-y-3">
                           <div className="flex justify-between items-center text-sm text-slate-500">
                              <span>المجموع ({count}x):</span>
                              <span className="font-bold">{price * count} د.ج</span>
                           </div>
                           <div className="flex justify-between items-center text-sm text-slate-500">
                              <span>التوصيل:</span>
                              <span className="font-bold">{!selectedWilayaID ?`0 د.ج` : `مجاني`}</span>
                           </div>
                           <div className="flex justify-between items-center text-xl sm:text-2xl font-black text-slate-900 mt-4 pt-4 border-t border-slate-100">
                               <span>المجموع الكلي:</span>
                               <span className="text-orange-600">{finalTotal} د.ج</span>
                           </div>
                        </div>

                        <button onClick={handleCheckout} disabled={isLoading}
                            className="w-full py-4 mt-4 bg-orange-600 hover:bg-orange-700 text-white text-xl font-black rounded-xl shadow-[0_8px_20px_rgb(234,88,12,0.3)] hover:shadow-[0_8px_25px_rgb(234,88,12,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0">
                             {isLoading ? <span className="animate-spin text-2xl">↻</span> : <><ShieldCheck className="w-6 h-6"/> اطلبي الباقة الآن</>}
                        </button>
                        <p className="text-center text-slate-400 text-sm mt-2">الدفع عند الاستلام (Main à main) - ضمان 100%</p>
                        
                        {message && <p className="text-center text-red-600 font-bold bg-red-50 p-3 rounded-lg border border-red-100 mt-2 animate-in fade-in slide-in-from-top-2">{message}</p>}
                    </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT'S INSIDE SECTION --- */}
      <section className="py-16 px-4 mr-5 bg-white border-t border-slate-100">
         <div className="max-w-3xl mx-auto">
             <h2 className={`${cairo.className} text-2xl md:text-4xl font-black text-center mb-10 text-slate-900`}>
                 واش كاين داخل الباقة؟ 📦
             </h2>
             <div className="space-y-4">
                 {boxItems.map(item => (
                     <div key={item.id} className={`flex items-start gap-4 p-6 rounded-2xl transition-all hover:shadow-md ${item.isGift ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-slate-50 border border-slate-200'}`}>
                         <div className="text-4xl shrink-0 bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm">{item.icon}</div>
                         <div>
                             <h3 className="font-bold text-lg md:text-xl text-slate-800 mb-2 flex items-center gap-2">
                                 {item.title}
                                 {item.isGift && <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold">هدية!</span>}
                             </h3>
                             <p className="text-slate-600 leading-relaxed">{item.description}</p>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      </section>

      {/* --- SCENARIOS SECTION --- */}
      <section className="py-16 px-4 bg-slate-900 mr-5 rounded-3xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-5 rounded-full blur-3xl"></div>
          <div className="max-w-5xl mx-auto relative z-10">
              <h2 className={`${cairo.className} text-3xl md:text-4xl font-black text-center mb-12`}>تخيلي كيفاش تتغير حياة وليدك...</h2>
              <div className="grid md:grid-cols-2 gap-6">
                  {scenarios.map((s, idx) => (
                      <div key={idx} className={`p-8 rounded-3xl border-2 flex flex-col items-center text-center gap-4 ${s.type === 'bad' ? 'bg-slate-800/50 border-slate-700' : 'bg-green-900/20 border-green-500/50'}`}>
                          {s.icon}
                          <p className={`text-lg md:text-xl font-medium ${s.type === 'bad' ? 'text-slate-300 line-through decoration-red-500/50' : 'text-green-50'}`}>
                              {s.text}
                          </p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- REVIEWS / SOCIAL PROOF --- */}
      <section className="py-16 px-4 mr-4 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-8 h-8 text-yellow-400 fill-yellow-400" />)}
              </div>
              <h2 className={`${cairo.className} text-3xl font-black text-slate-800 mb-8`}>أمهات شافوا النتيجة مع ولادهم</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="aspect-[9/16] bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm border border-slate-300">صورة رأي أم</div>
                  <div className="aspect-[9/16] bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm border border-slate-300">صورة رأي أم</div>
                  <div className="aspect-[9/16] bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm border border-slate-300 hidden md:flex">صورة رأي أم</div>
              </div>
          </div>
      </section>

      {/* --- STICKY CTA BUTTON --- */}
      <div className="fixed  bottom-0 left-0 w-full p-4 bg-white/80 
      backdrop-blur-md rounded-t-3xl border-t border-slate-200 z-50 flex justify-center
       shadow-[0_-10px_30px_rgba(0,0,0,0.05)] -right-5 lg:right-0">
          <button 
             onClick={scrollToForm}
             className="w-full  max-w-md py-4 bg-orange-600 text-white
              text-xl font-black rounded-xl shadow-lg
               hover:bg-orange-700 transition-colors flex items-center
                justify-center gap2">
              <CreditCard className="w-6 h-6" />
              اطلبي الباقة الآن ({price} د.ج)
          </button>
      </div>

    </section>
  );
};

export default ProductCheckoutPage;