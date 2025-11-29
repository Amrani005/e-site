'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, CreditCard, MapPin, Truck } from 'lucide-react';

// --- 1. Wilaya Data ---
interface WilayaData {
  IDWilaya: number;
  Wilaya: string;
  Domicile: string;
  Stopdesk: string;
  Annuler: string;
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

const ProductInfo = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const title = searchParams.get('title');
  const price = searchParams.get('price');
  const rawImage = searchParams.get('image');
  
  // Initialize with the URL image (placeholder), will update after fetch
  const [images, setImages] = useState<string[]>(rawImage ? rawImage.split(',') : []);

  // Product UI States
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- 2. Checkout & Form States ---
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [selectedWilayaID, setSelectedWilayaID] = useState<number | "">("");
  const [deliveryType, setDeliveryType] = useState<"Domicile" | "Stopdesk">("Domicile");
  
  // Financial States
  const [shippingTotal, setShippingTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  
  // Logic States
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  // --- 3. NEW: Fetch Gallery Images from WooCommerce ---
  useEffect(() => {
    if (!id) return;

    const fetchProductGallery = async () => {
      const url = process.env.NEXT_PUBLIC_WOO_URL;
      const key = process.env.NEXT_PUBLIC_WOO_KEY;
      const secret = process.env.NEXT_PUBLIC_WOO_SECRET;

      if (!url || !key || !secret) return;

      try {
        const response = await fetch(
          `${url}/wp-json/wc/v3/products/${id}?consumer_key=${key}&consumer_secret=${secret}`
        );
        const data = await response.json();
        
        // If the product has images in the database, update the state
        if (data.images && data.images.length > 0) {
           const galleryUrls = data.images.map((img: any) => img.src);
           setImages(galleryUrls);
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      }
    };

    fetchProductGallery();
  }, [id]);

  // --- 4. Calculation Logic ---
  useEffect(() => {
    const productPrice = parseFloat(price?.replace(/,/g, '') || '0');
    
    let shippingCost = 0;
    if (selectedWilayaID) {
      const wilayaData = wilayasData.find(w => w.IDWilaya === Number(selectedWilayaID));
      if (wilayaData) {
        if (deliveryType === 'Domicile') {
          shippingCost = parseFloat(wilayaData.Domicile) || 0;
        } else {
          shippingCost = parseFloat(wilayaData.Stopdesk) || 0;
        }
      }
    }

    setShippingTotal(shippingCost);
    setFinalTotal(productPrice + shippingCost);

  }, [selectedWilayaID, deliveryType, price]);

  // --- 5. Checkout Handler ---
  const handleCheckout = async () => {
    if (!selectedSize) {
      setMessage("الرجاء اختيار المقاس أولاً!");
      return;
    }
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
      quantity: 1,
      meta_data: [{ key: "Size", value: selectedSize }]
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
        setIsSuccess(true);
        setMessage("✅ تم إرسال طلبك بنجاح! رقم الطلب: " + responseData.id);
        setCustomerName("");
        setCustomerPhone("");
      } else {
        setMessage(`❌ فشل: ${responseData.message || 'حدث خطأ غير معروف'}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ حدث خطأ تقني.");
    }
    setIsLoading(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleSelectedSize = (size: string) => {
    setSelectedSize(size);
    setMessage(""); 
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-900 text-white p-4">
        <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl">
          <h3 className="text-4xl font-bold text-green-400 mb-4">شكراً لك!</h3>
          <p className="text-xl text-gray-300 mb-6">{message}</p>
          <Link href="/" className="px-8 py-3 bg-purple-600 rounded-xl hover:bg-purple-700 transition">
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 sm:py-32 bg-transparent min-h-screen text-black dark:text-white -translate-x-10 lg:translate-x-0 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link
          href="/"
          className="flex items-center gap-2 text-purple-400 font-medium mb-8 group w-fit"
        >
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>الرجوع إلى المنتجات</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 translate-x-5 lg:translate-x-0 gap-12 items-start">
          
          {/* --- Left Column: Images Slider --- */}
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl shadow-lg overflow-hidden group sticky top-24">
            {images.length > 0 ? (
              <>
                <img
                  src={images[currentImageIndex]}
                  alt={title || 'Product Image'}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                />
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2
                       bg-black/50 hover:bg-black/70 text-white
                        p-2 rounded-full  group-hover:opacity-100
                         transition-opacity duration-300"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2
                       bg-black/50 hover:bg-black/70 text-white p-2
                        rounded-full  group-hover:opacity-100 
                        transition-opacity duration-300"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                 {/* Show a loader while fetching images */}
                <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* --- Right Column: Form --- */}
          <div className="flex flex-col h-full pt-4 text-right">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-purple-400 mb-4">
              {title || 'اسم المنتج'}
            </h2>
            <p className="text-3xl font-semibold text-black dark:text-white mb-6">
              {price ? `${price} د.ج` : 'السعر غير متوفر'}
            </p>
            
            {/* Size Selectors */}
           

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-inner border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-300 dark:border-gray-700 pb-3">معلومات الطلب</h3>
              
              <div className="flex flex-col gap-4 mb-6 text-right">
                <input 
                  type="text" placeholder="* الاسم الكامل" className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white"
                  value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                />
                <input 
                  type="tel" placeholder="* رقم الهاتف" className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white"
                  value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)}
                />
                <input 
                  type="text" placeholder="* العنوان (الحي، الشارع...)" className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white"
                  value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)}
                />
                
                <select
                  value={selectedWilayaID}
                  onChange={(e) => setSelectedWilayaID(Number(e.target.value))}
                  className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white text-right"
                >
                  <option value="" disabled>* اختر الولاية</option>
                  {wilayasData.map((w) => (
                    <option key={w.IDWilaya} value={w.IDWilaya}>
                      {w.IDWilaya} - {w.Wilaya}
                    </option>
                  ))}
                </select>

                {selectedWilayaID && (
                  <div className="mt-4 p-4 bg-white dark:bg-gray-700/50 rounded-lg border border-gray-300 dark:border-gray-600">
                    <h4 className="text-lg font-semibold mb-3 text-purple-600 dark:text-purple-300">طريقة التوصيل:</h4>
                    
                    <label className={`flex items-center justify-between p-3 rounded cursor-pointer mb-2 border transition-all ${deliveryType === 'Domicile' ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-600'}`}>
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" name="delivery" 
                          checked={deliveryType === 'Domicile'} onChange={() => setDeliveryType('Domicile')}
                          className="w-4 h-4 text-purple-600"
                        />
                        <div className="flex items-center gap-2 text-black dark:text-white">
                          <Truck size={18} />
                          <span>توصيل للمنزل</span>
                        </div>
                      </div>
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        {wilayasData.find(w => w.IDWilaya === Number(selectedWilayaID))?.Domicile || 0} د.ج
                      </span>
                    </label>

                    <label className={`flex items-center justify-between p-3 rounded cursor-pointer border transition-all ${deliveryType === 'Stopdesk' ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-600'}`}>
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" name="delivery" 
                          checked={deliveryType === 'Stopdesk'} onChange={() => setDeliveryType('Stopdesk')}
                          className="w-4 h-4 text-purple-600"
                        />
                         <div className="flex items-center gap-2 text-black dark:text-white">
                          <MapPin size={18} />
                          <span>استلام من المكتب</span>
                        </div>
                      </div>
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        {wilayasData.find(w => w.IDWilaya === Number(selectedWilayaID))?.Stopdesk || 0} د.ج
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-8">
                <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                  <span>سعر المنتج</span>
                  <span>{price} د.ج</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                  <span>تكلفة الشحن</span>
                  <span className={shippingTotal > 0 ? "text-purple-500" : "text-gray-500"}>
                    {shippingTotal > 0 ? `${shippingTotal} د.ج` : "---"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-3xl font-bold text-gray-900 dark:text-white pt-4 border-t border-gray-300 dark:border-gray-700 mt-2">
                  <span>الإجمالي</span>
                  <span className="text-purple-600 dark:text-purple-400">{finalTotal.toLocaleString()} د.ج</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 
                           px-8 py-4 bg-purple-700 text-white
                           text-lg font-semibold rounded-xl shadow-lg
                           hover:bg-purple-800 focus:outline-none focus:ring-4
                           focus:ring-purple-300 dark:focus:ring-purple-800
                           transition-all duration-300 transform hover:-translate-y-1
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CreditCard className="h-6 w-6" />
                    <span>تأكيد الطلب الآن</span>
                  </>
                )}
              </button>

              {message && !message.startsWith('✅') && (
                <div className='mt-4 text-center text-lg text-red-500 font-medium'>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;