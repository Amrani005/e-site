'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Cairo, Tajawal } from 'next/font/google'; 
import { 
  ArrowRight, ChevronLeft, ChevronRight, CreditCard, 
  MapPin, Truck, AlertOctagon, Gift, CheckCircle2, XCircle, 
  Map, Star, ShieldCheck, Flame, Minus, Plus 
} from 'lucide-react';

// --- 1. FONTS SETUP ---
const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '700', '900'] });
const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400', '500', '700', '800'] });

// --- DATA CONFIGURATION ---

const boxItems = [
  {
    id: 1,
    number: "1",
    title: "المرجع الأسطوري: LAROUSSE",
    description: "موسوعة مصورة بشرح مبسط. الصور تجعل ابنك يحب المادة ويفهمها وحده.",
    isGift: false,
    icon: "🎨" 
  },
  {
    id: 2,
    number: "2",
    title: "سلسلة MAXI POCHE (4 كتب)",
    description: "قواميس شاملة للترجمة (عربي/فرنسي) وللإثراء اللغوي (فرنسي/فرنسي). كل ما يحتاجه التلميذ.",
    isGift: false,
    icon: "📚"
  },
  {
    id: 3,
    number: "Gift", 
    title: "خارطة طريق البطل",
     description:"لعبة تخلي وليدك يحوس وقتاش يفتح القاموس باش يعمر الخانة ويلون النجمة.",
    isGift: true, 
    icon: "🗺️"
  }
];

const scenarios = [
  {
    type: 'bad',
    icon: <XCircle className="w-8 h-8 text-red-500 shrink-0" />,
    text: "السيناريو المرعب: وجه ابنك حزين، نقطة كارثية، المعدل ينزل."
  },
  {
    type: 'good',
    icon: <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />,
    text: "إ السيناريو الذي نحققه لكِ: ثقة عالية، إجابات صحيحة، ونقطة ترفع الرأس إن شاء الله!"
  }
];

interface WilayaData {
  IDWilaya: number;
  Wilaya: string;
  Domicile: string;
  Stopdesk: string;
  Annuler: string;
  
}
export interface WooProduct{
  price:number;
}

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


// --- COMPONENT ---

const ProductInfo = () => {
  const router = useRouter(); 
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const title = searchParams.get('title');
  const rawImage = searchParams.get('image');
  
  // 1. ADDED: State for Price
  const [price, setPrice] = useState<number>(0);

  const [images, setImages] = useState<string[]>(rawImage ? rawImage.split(',') : []);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Form States
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [selectedWilayaID, setSelectedWilayaID] = useState<number | "">("");
  const [deliveryType, setDeliveryType] = useState<"Domicile" | "Stopdesk">("Domicile");
  
  // COUNTING SYSTEM STATES
  const [count, setCount] = useState(1);
  const [shippingTotal, setShippingTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  // 1. IMPROVED INCREMENT/DECREMENT LOGIC
  const increment = () => {
     setCount((prev) => prev + 1);
  }
  
  const decrement = () => {
     if(count > 1 ) {
        setCount((prev) => prev - 1);
     }
  }
 
  // Fetch Gallery AND PRICE Logic
  useEffect(() => {
    if (!id) return;
    const fetchProductData = async () => {
      const url = process.env.NEXT_PUBLIC_WOO_URL;
      const key = process.env.NEXT_PUBLIC_WOO_KEY;
      const secret = process.env.NEXT_PUBLIC_WOO_SECRET;
      if (!url || !key || !secret) return;
      try {
        const response = await fetch(
          `${url}/wp-json/wc/v3/products/${id}?consumer_key=${key}&consumer_secret=${secret}`
        );
        const data = await response.json();
        
        // Handle Images
        if (data.images && data.images.length > 0) {
           const galleryUrls = data.images.map((img: any) => img.src);
           setImages(galleryUrls);
        }

        // 2. Handle Price (FETCHED FROM WOOCOMMERCE)
        if (data.price) {
            setPrice(parseFloat(data.price));
        }

      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };
    fetchProductData();
  }, [id]);

  // 3. UPDATED PRICING LOGIC (Uses Fetched Price)
  useEffect(() => {
    // OLD: const productPrice = parseFloat(price?.replace(/,/g, '') || '0');
    // NEW: Use state price
    const productPrice = price;

    let shippingCost = 0;
    if (selectedWilayaID) {
      const wilayaData = wilayasData.find(w => w.IDWilaya === Number(selectedWilayaID));
      if (wilayaData) {
        shippingCost = deliveryType === 'Domicile' ? parseFloat(wilayaData.Domicile) : parseFloat(wilayaData.Stopdesk);
      }
    }
    setShippingTotal(0);
    
    // FORMULA: (Price * Count) + Shipping
    setFinalTotal((productPrice * count) );
  }, [selectedWilayaID, deliveryType, price, count]); 

  // 4. UPDATED CHECKOUT LOGIC
  const handleCheckout = async () => {
    if (!customerName || !customerPhone || !customerAddress || !selectedWilayaID) {
      setMessage("الرجاء ملء جميع معلومات التوصيل (الولاية مطلوبة).");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const selectedWilayaData = wilayasData.find(w => w.IDWilaya === Number(selectedWilayaID));
    const cityName = selectedWilayaData ? selectedWilayaData.Wilaya : "";

    const line_items = [{
      product_id: id,
      quantity: count,
      // If we fetched the price, we don't necessarily need to send 'total' manually unless overwriting,
      // but WooCommerce usually calculates it from ID. 
      // However, if you want to enforce exact pricing or metadata:
      meta_data: selectedSize ? [{ key: "Size", value: selectedSize }] : []
    }];

    const shipping_lines = [{
      method_id: "flat_rate",
      method_title: deliveryType === 'Domicile' ? `توصيل للمنزل (${cityName})` : `استلام من المكتب (${cityName})`,
      total: shippingTotal.toString()
    }];

    const orderData = {
      payment_method: "cod",
      payment_method_title: "Cash on delivery",
      set_paid: false,
      billing: {
        first_name: customerName,
        last_name: "(Direct Order)",
        address_1: customerAddress,
        city: cityName,
        country: "DZ",
        phone: customerPhone,
        state: selectedWilayaID.toString()
      },
      shipping: {
        first_name: customerName,
        address_1: customerAddress,
        city: cityName,
        country: "DZ"
      },
      line_items: line_items,
      shipping_lines: shipping_lines
    };

    const url = process.env.NEXT_PUBLIC_WOO_URL;
    const key = process.env.NEXT_PUBLIC_WOO_KEY;
    const secret = process.env.NEXT_PUBLIC_WOO_SECRET;

    if (!url || !key || !secret) {
      setMessage("خطأ في إعدادات الـ API.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${url}/wp-json/wc/v3/orders?consumer_key=${key}&consumer_secret=${secret}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        router.push(`/thank-you?orderId=${responseData.id}`);
      } else {
        setMessage(`❌ فشل: ${responseData.message || 'حدث خطأ غير معروف'}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ حدث خطأ تقني.");
    }
    setIsLoading(false);
  };

  const nextImage = () => { setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)); };
  const prevImage = () => { setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); };

  return (
    <div className={`min-h-screen  mr-5 ${tajawal.className} overflow-x-hidden text-right`} dir="rtl">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto mt-10 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* RIGHT SIDE (Mobile Top): Hook + Images */}
            <div className="order-1 lg:order-1 flex flex-col gap-6">
                
                {/* HEADLINE */}
                <div className="text-center lg:text-right">
                    <h1 className={`${cairo.className} text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4`}>
                        خايفة وليدك يكمل العام <br/>
                        <span className="text-red-600 relative inline-block">
                            ضعيف في الفرنسية؟ 😟
                            <span className="absolute bottom-0 left-0 w-full h-2 bg-red-100 -z-10"></span>
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-6 max-w-lg mx-auto lg:mx-0">
                        الحل راهو في جيبه! اكتشفي باقة <strong className="text-orange-600">Le Mega Pro</strong> + هدية التحدي الحصرية.
                    </p>
                </div>

                {/* PAIN BAR */}
                <div className="bg-red-50 border-2 border-dashed border-red-300 rounded-xl p-4 text-center lg:text-right animate-pulse-slow">
                    <p className="text-red-700 font-bold flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base">
                        <AlertOctagon className="w-6 h-6 shrink-0" />
                        كتب ثقيلة.. مصطلحات واعرين.. والنتيجة: التلميذ يكره المادة!
                    </p>
                </div>

                {/* IMAGE GALLERY */}
                <div className="relative w-full aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
                  {images.length > 0 ? (
                    <>
                      <img
                        src={images[currentImageIndex]}
                        alt={title || 'Product'}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      {images.length > 1 && (
                        <>
                          <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg transition-all"><ChevronLeft /></button>
                          <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg transition-all"><ChevronRight /></button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">Loading Images...</div>
                  )}
                </div>
                
                {/* Thumbnails */}
                <div className='flex gap-2 overflow-x-auto pb-2'>
                    {images.map((item, index) => (
                    <img key={index} src={item} onClick={() => setCurrentImageIndex(index)}
                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-orange-500 scale-105' : 'border-transparent opacity-70'}`}
                    />
                    ))}
                </div>
            </div>

            {/* LEFT SIDE: THE FORM */}
            <div className="order-2 lg:order-2 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden sticky top-4">
               {/* Pricing Header */}
               <div className="bg-slate-900 text-white p-6 text-center">
                  <h3 className={`${cairo.className} text-xl font-bold mb-2`}>عرض خاص للأولياء الحريصين 💎</h3>
                  <div className="flex items-center justify-center gap-4">
                      {/* Optional: Add Regular Price here if API provides it */}
                      <span className="text-slate-400 line-through text-lg">4700 د.ج</span>
                      {/* 5. DISPLAY FETCHED PRICE */}
                      <span className="text-green-400 text-4xl font-black">{price} د.ج</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">السعر شامل 5 كتب + هدية التحدي</p>
               </div>

               {/* Form Body */}
               <div className="p-6 sm:p-8 space-y-4">
                    <div className="space-y-4 ">
                        <input type="text" placeholder="الاسم الكامل" className="w-full placeholder-black text-black  p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                        
                        <input type="tel" placeholder="رقم الهاتف (للاتصال)" className="w-full placeholder-zinc-400 text-black  p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                        
                        <div className="grid grid-cols-2 gap-3">
                             <select value={selectedWilayaID} onChange={(e) => setSelectedWilayaID(Number(e.target.value))}
                                className="w-full p-4 bg-slate-50 text-black borde border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none appearance-none">
                                <option value="" disabled >الولاية</option>
                                {wilayasData.map((w) => (<option key={w.IDWilaya} value={w.IDWilaya}>{w.IDWilaya} - {w.Wilaya}</option>))}
                            </select>
                            <input type="text" placeholder="البلدية" className="w-full placeholder-zinc-400  p-4 text-black bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                                value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
                        </div>

                        {selectedWilayaID && (
                            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                 <div className="bg-emerald-50 border-2 border-emerald-500 border-dashed rounded-xl p-3 my-4 text-center shadow-sm animate-pulse-slow">
  <h1 className='text-emerald-800 text-xl sm:text-2xl font-black font-tajawal flex items-center justify-center gap-2'>
    <Truck className="w-6 h-6" />
    التوصيل مجاني 69 ولاية!! 🇩🇿
  </h1>
</div>
                            </div>
                        )}

                        {/* 4. QUANTITY SELECTOR UI */}
                        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                           <span className="font-bold text-slate-700">الكمية:</span>
                           <div className="flex items-center gap-4 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                              <button onClick={decrement} className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded hover:bg-slate-200 text-slate-600 transition-colors">
                                 <Minus size={16} />
                              </button>
                              <span className="font-bold text-xl text-black w-6 text-center">{count}</span>
                              <button onClick={increment} className="w-8 h-8 flex items-center justify-center bg-orange-100 rounded hover:bg-orange-200 text-orange-600 transition-colors">
                                 <Plus size={16} />
                              </button>
                           </div>
                        </div>

                        {/* Order Summary */}
                        <div className="pt-4 border-t border-slate-100 space-y-2">
                           {count > 1 && (
                              <div className="flex justify-between items-center text-sm text-slate-500">
                                 <span>سعر الباقات ({count}x):</span>
                                 {/* DISPLAY SUB-TOTAL */}
                                 <span>{price * count} د.ج</span>
                              </div>
                           )}
                           <div className="flex justify-between items-center text-xl font-bold text-slate-900">
                               <span>المجموع الكلي:</span>
                               {/* DISPLAY FINAL TOTAL */}
                               <span className="text-orange-600">{finalTotal} د.ج</span>
                           </div>
                        </div>

                        {/* BIG ORANGE BUTTON */}
                        <button onClick={handleCheckout} disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xl font-black rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2">
                             {isLoading ? <span className="animate-spin text-2xl">↻</span> : <><ShieldCheck /> اضغط هنا للطلب</>}
                        </button>
                        <p className="text-center text-xs text-slate-400">الدفع عند الاستلام (Main à main) - ضمان 100%</p>
                        
                        {message && <p className="text-center text-red-500 font-bold bg-red-50 p-2 rounded">{message}</p>}
                    </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <img src="/der2.jpeg" className='rounded-3xl border-1 bg-zinc-400 mb-10' />

      {/* --- 2. THE SECRET WEAPON (THE MAP) --- */}
      <section className="py-12 px-4 bg-yellow-50 border-y-4 border-yellow-400">
         <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 shadow-md animate-bounce">
               🎁 هدية مجانية حصرية
            </div>
            <h2 className={`${cairo.className} text-3xl sm:text-4xl font-black text-slate-900 mb-4`}>
                🗺️ خارطة طريق البطل (تحدي 30 يوم)
            </h2>
            <p className="text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto mb-8">
               ماشي مجرد جدول.. هذه <strong>لعبة</strong> تخلي وليدك "يحوس" وقتاش يفتح القاموس باش يعمر الخانة ويلون النجمة! <br/>
               <span className="text-sm opacity-80">(توصلك مطبوعة مع الباقة)</span>
            </p>
            
            <div className="flex justify-center gap-2 text-yellow-500">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-8 h-8 fill-yellow-400" />)}
            </div>
         </div>
      </section>

      {/* --- 3. WHAT'S INSIDE --- */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
           <h2 className={`${cairo.className} text-3xl font-black text-center text-slate-900 mb-12`}>
               واش كاين داخل "باقة الإنقاذ"؟ 📦
           </h2>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {boxItems.map((item) => (
                 <div key={item.id} className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${item.isGift ? 'bg-yellow-50 border-yellow-400' : 'bg-slate-50 border-slate-100 hover:border-blue-200'}`}>
                    <div className="flex items-start gap-4">
                        <span className="text-4xl">{item.icon}</span>
                        <div>
                           <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                           <p className="text-slate-600 leading-relaxed">{item.description}</p>
                        </div>
                     </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- 4. SCENARIOS --- */}
      <section className="py-16 px-4 bg-slate-900 text-white rounded-3xl">
          <div className="max-w-4xl mx-auto">
             <h2 className={`${cairo.className} text-3xl font-bold text-center mb-10`}>تخيلي السيناريو يوم كشف النقاط...</h2>
             <div className="grid gap-6">
                {scenarios.map((scenario, idx) => (
                   <div key={idx} className={`flex items-center gap-4 p-6 rounded-xl ${scenario.type === 'bad' ? 'bg-slate-800 opacity-70' : 'bg-green-900/40 border border-green-500'}`}>
                      {scenario.icon}
                      <p className={`text-lg ${scenario.type === 'bad' ? 'line-through text-slate-400' : 'font-bold text-white'}`}>{scenario.text}</p>
                   </div>
                ))}
             </div>
          </div>
      </section>
      <p className='text-3xl font-tajawal text-black text-center mt-10
      font-bold'>🗺️خارطة الكنز</p>
      <img src="/map.jpeg" className='border rounded-3xl mt-5 '
       />
      
        
      
      

      {/* --- 5. SOCIAL PROOF --- */}
      <section className="py-16 px-4 bg-[#f8fafc] text-center">
         <h2 className="text-2xl font-bold text-slate-800 mb-8">
         ⭐️⭐️⭐️⭐️⭐️ أمهات جربن باقاتنا</h2>

         <div className="grid grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
             <img src="/der1.jpeg" width={240} height={120} />
             <img src="/der5.jpeg" width={240} height={120} />
             <img src="/der3.jpeg" width={240} height={120} />
             <img src="/der4.jpeg" width={240} height={120} />
             <img src="/der6.jpeg" width={240} height={120} />
             <img src="/der7.jpeg" width={240} height={120} />
             <img src="/der8.jpeg" width={240} height={120} />
             <img src="/der9.jpeg" width={240} height={120} />
             <img src="/der10.jpeg" width={240} height={120} />
             <img src="/der11.jpeg" width={240} height={120} />
             <img src="/der13.jpeg" width={240} height={120} />
             <img src="/der14.jpeg" width={240} height={120} />
         </div>
      </section>

      

      {/* --- 6. FLOATING CTA --- */}
      <div className="fixed bottom-0  left-5 w-full bg-white border-t border-slate-200 p-4  lg:hidden z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
         <button onClick={handleCheckout} 
            className="w-full bg-orange-600 text-white font-bold py-3
             rounded-xl shadow-lg flex items-center justify-center gap-2 ">
            <CreditCard size={20} /> اطلبي الباقة الآن ({price} د.ج)
         </button>
      </div>

    </div>
  );
};

export default ProductInfo;