'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Truck, MapPin } from 'lucide-react';

// 1. تعريف واجهة بيانات الولاية
interface WilayaData {
  IDWilaya: number;
  Wilaya: string;
  Domicile: string;
  Stopdesk: string;
  Annuler: string;
}

// 2. بيانات الولايات مع الأسعار (تم نسخها كما طلبت)
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

interface CartProduct {
  id: string | number;
  title: string;
  price: string;
  image: string;
  quantity: number;
  size: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  
  // States للحسابات
  const [itemsTotal, setItemsTotal] = useState(0); // مجموع المنتجات فقط
  const [shippingTotal, setShippingTotal] = useState(0); // سعر التوصيل
  const [finalTotal, setFinalTotal] = useState(0); // الإجمالي النهائي

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  
  // State للولاية وتنوع التوصيل
  const [selectedWilayaID, setSelectedWilayaID] = useState<number | "">(""); 
  const [deliveryType, setDeliveryType] = useState<"Domicile" | "Stopdesk">("Domicile");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // تحميل السلة
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const loadedItems: CartProduct[] = JSON.parse(storedCart).map((item: any) => ({
        ...item,
        quantity: item.quantity || 1
      }));
      setCartItems(loadedItems);
    }
  }, []);

  // تحديث الحسابات عند تغير المنتجات، الولاية، أو نوع التوصيل
  useEffect(() => {
    // 1. حساب مجموع المنتجات
    const productsSum = cartItems.reduce((acc, item) => {
      const priceNumber = parseFloat(item.price.replace(/,/g, '')) || 0;
      return acc + (priceNumber * item.quantity);
    }, 0);
    setItemsTotal(productsSum);

    // 2. حساب سعر التوصيل
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

    // 3. الإجمالي النهائي
    setFinalTotal(productsSum + shippingCost);

    // حفظ السلة
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cartItems, selectedWilayaID, deliveryType]);

  const handleUpdateQuantity = (id: string | number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id: string | number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setMessage("سلتك فارغة!");
      return;
    }
    if (!customerName || !customerPhone || !customerAddress || !selectedWilayaID) {
      setMessage("الرجاء ملء جميع معلومات التوصيل (الولاية مطلوبة).");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const line_items = cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity
    }));

    // العثور على اسم الولاية للنظام
    const selectedWilayaData = wilayasData.find(w => w.IDWilaya === Number(selectedWilayaID));
    const cityName = selectedWilayaData ? selectedWilayaData.Wilaya : "";

    // إضافة سطر الشحن للطلب
    const shipping_lines = [
      {
        method_id: "flat_rate",
        method_title: deliveryType === 'Domicile' ? `توصيل للمنزل (${cityName})` : `استلام من المكتب (${cityName})`,
        total: shippingTotal.toString()
      }
    ];

    const orderData = {
      payment_method: "cod",
      payment_method_title: "Cash on delivery",
      set_paid: false,
      billing: {
        first_name: customerName,
        last_name: "(Web Order)",
        address_1: customerAddress,
        city: cityName, // إرسال اسم الولاية الصحيح
        country: "DZ",
        phone: customerPhone,
        delivry:deliveryType,
        state: selectedWilayaID.toString() // اختياري
        
      },
      shipping: {
        first_name: customerName,
        address_1: customerAddress,
        city: cityName,
        country: "DZ"
      },
      line_items: line_items,
      shipping_lines: shipping_lines // إرسال تكلفة الشحن
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
        setMessage("✅ تم إرسال طلبك بنجاح! رقم الطلب: " + responseData.id);
        setCartItems([]);
        localStorage.removeItem('cart');
      } else {
        setMessage(`❌ فشل: ${responseData.message || 'حدث خطأ غير معروف'}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ حدث خطأ تقني.");
    }
    setIsLoading(false);
  };

  // UI للسلة الفارغة
  if (cartItems.length === 0 && !message.startsWith('✅')) {
    return (
      <section className="py-20 sm:py-32 bg-transparent -translate-x-8 dark:bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center text-center">
        <ShoppingBag size={80} className="text-purple-400 mb-6" />
        <h2 className="text-4xl font-bold text-purple-400 mb-4">سلة التسوق فارغة</h2>
        <p className="text-lg text-gray-300 mb-8">لم تقم بإضافة أي منتجات حتى الآن.</p>
        <Link href="/" className="flex items-center justify-center gap-3 px-8 py-4 bg-purple-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-purple-800 transition-all">
          متابعة التسوق
        </Link>
      </section>
    );
  }

  // UI للسلة الممتلئة
  return (
    <section className="py-20 sm:py-32 bg-transparent dark:bg-gray-900 min-h-screen text-white -translate-x-10 lg:translate-x-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-6xl mb-12 pt-10 font-bold tracking-tight text-center translate-x-4 lg:translate-x-0 text-purple-700 dark:text-purple-400">
          سلة التسوق
        </h2>

        {message.startsWith('✅') ? (
          <div className="text-center bg-gray-800 p-10 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold text-green-400 mb-4">شكراً لك!</h3>
            <p className="text-xl text-gray-300">{message}</p>
            <Link href="/" className="mt-8 inline-flex items-center justify-center gap-3 px-8 py-4 bg-purple-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-purple-800 transition-all">
              العودة للرئيسية
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start translate-x-4">
            
            {/* قائمة المنتجات */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={item.id.toString()} className="flex flex-col sm:flex-row gap-4 bg-gray-800 p-4 rounded-lg shadow-lg items-start text-right">
                  <div className="relative w-full sm:w-32 h-32 lg:translate-x-0 flex-shrink-0 rounded-md overflow-hidden">
                    <img src={item.image} alt={item.title} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                  <div className="flex flex-col justify-between h-full w-full">
                    <div>
                      <h3 className="text-2xl sm:text-4xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-lg font-semibold text-purple-400">{item.price} د.ج</p>
                      <h3 className="text-xl sm:text-3xl font-mono text-purple-400 mb-1">{item.size}</h3>
                    </div>
                    <div className="flex justify-between items-center mt-4 w-full">
                      <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-400 transition-colors" aria-label="إزالة المنتج">
                        <Trash2 size={20} />
                      </button>
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="bg-gray-700 p-1 rounded-full text-white hover:bg-purple-700 transition-colors">
                          <Plus size={18} />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="bg-gray-700 p-1 rounded-full text-white hover:bg-purple-700 transition-colors">
                          <Minus size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* تفاصيل الشحن والدفع */}
            <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg h-fit lg:sticky top-28 text-right">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">معلومات التوصيل</h3>
              
              <div className="flex flex-col gap-4 mb-6 text-right">
                <input 
                  type="text" placeholder="* الاسم الكامل" className="w-full p-3 bg-gray-700 rounded-lg text-white"
                  value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                />
                <input 
                  type="tel" placeholder="* رقم الهاتف" className="w-full p-3 bg-gray-700 rounded-lg text-white"
                  value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)}
                />
                <input 
                  type="text" placeholder="* العنوان (الحي، الشارع...)" className="w-full p-3 bg-gray-700 rounded-lg text-white"
                  value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)}
                />
                
                {/* اختيار الولاية */}
                <select
                  value={selectedWilayaID}
                  onChange={(e) => setSelectedWilayaID(Number(e.target.value))}
                  className="w-full p-3 bg-gray-700 rounded-lg text-white text-right"
                >
                  <option value="" disabled>* اختر الولاية</option>
                  {wilayasData.map((w) => (
                    <option key={w.IDWilaya} value={w.IDWilaya}>
                      {w.IDWilaya} - {w.Wilaya}
                    </option>
                  ))}
                </select>

                {/* اختيار نوع التوصيل */}
                {selectedWilayaID && (
                  <div className="mt-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                    <h4 className="text-lg font-semibold mb-3 text-purple-300">طريقة التوصيل:</h4>
                    
                    <label className={`flex items-center justify-between p-3 rounded cursor-pointer mb-2 border transition-all ${deliveryType === 'Domicile' ? 'border-purple-500 bg-purple-900/20' : 'border-gray-600'}`}>
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="delivery" 
                          checked={deliveryType === 'Domicile'} 
                          onChange={() => setDeliveryType('Domicile')}
                          className="w-4 h-4 text-purple-600"
                        />
                        <div className="flex items-center gap-2">
                          <Truck size={18} />
                          <span>توصيل للمنزل (Domicile)</span>
                        </div>
                      </div>
                      <span className="font-bold text-purple-400">
                        {wilayasData.find(w => w.IDWilaya === Number(selectedWilayaID))?.Domicile || 0} د.ج
                      </span>
                    </label>

                    <label className={`flex items-center justify-between p-3 rounded cursor-pointer border transition-all ${deliveryType === 'Stopdesk' ? 'border-purple-500 bg-purple-900/20' : 'border-gray-600'}`}>
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="delivery" 
                          checked={deliveryType === 'Stopdesk'} 
                          onChange={() => setDeliveryType('Stopdesk')}
                          className="w-4 h-4 text-purple-600"
                        />
                         <div className="flex items-center gap-2">
                          <MapPin size={18} />
                          <span>استلام من المكتب (Stopdesk)</span>
                        </div>
                      </div>
                      <span className="font-bold text-purple-400">
                        {wilayasData.find(w => w.IDWilaya === Number(selectedWilayaID))?.Stopdesk || 0} د.ج
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <hr className="border-gray-700 mb-6" />

              {/* ملخص السعر */}
              <div className="space-y-2 mb-8">
                <div className="flex justify-between items-center text-gray-300">
                  <span>مجموع المنتجات</span>
                  <span>{itemsTotal.toLocaleString()} د.ج</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>تكلفة الشحن</span>
                  <span className={shippingTotal > 0 ? "text-purple-400" : "text-gray-500"}>
                    {shippingTotal > 0 ? `${shippingTotal} د.ج` : "---"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-3xl font-bold text-white pt-4 border-t border-gray-700 mt-2">
                  <span>الإجمالي الكلي</span>
                  <span className="text-purple-400">{finalTotal.toLocaleString()} د.ج</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-purple-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CreditCard className="h-6 w-6" />
                    <span>تأكيد الطلب</span>
                  </>
                )}
              </button>
              
              {message && !message.startsWith('✅') && (
                <p className="mt-4 text-center text-lg text-red-400">{message}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;