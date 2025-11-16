'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // 1. تم إرجاعه
import Link from 'next/link'; // 2. تم إرجاعه
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';

// ... (قائمة 58 ولاية جزائرية - لا تغيير)
const algerianWilayas = [
  "1. أدرار", "2. الشلف", "3. الأغواط", "4. أم البواقي", "5. باتنة", "6. بجاية", 
  "7. بسكرة", "8. بشار", "9. البليدة", "10. البويرة", "11. تمنراست", "12. تبسة",
  "13. تلمسان", "14. تيارت", "15. تيزي وزو", "16. الجزائر", "17. الجلفة", 
  "18. جيجل", "19. سطيف", "20. سعيدة", "21. سكيكدة", "22. سيدي بلعباس", 
  "23. عنابة", "24. قالمة", "25. قسنطينة", "26. المدية", "27. مستغانم", 
  "28. المسيلة", "29. معسكر", "30. ورقلة", "31. وهران", "32. البيض", "33. إليزي",
  "34. برج بوعريريج", "35. بومرداس", "36. الطارف", "37. تندوف", "38. تيسمسيلت",
  "39. الوادي", "40. خنشلة", "41. سوق أهراس", "42. تيبازة", "43. ميلة", 
  "44. عين الدفلى", "45. النعامة", "46. عين تموشنت", "47. غرداية", "48. غليزان",
  "49. تيميمون", "50. برج باجي مختار", "51. أولاد جلال", "52. بني عباس", 
  "53. عين صالح", "54. عين قزام", "55. تقرت", "56. جانت", "57. المغير", 
  "58. المنيعة"
];


interface CartProduct {
  id: string | number;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); 

  // ... (useEffect لتحميل السلة - لا تغيير)
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

  // ... (useEffect لتحديث الإجمالي - لا تغيير)
  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      const priceNumber = parseFloat(item.price.replace(/,/g, '')) || 0;
      return acc + (priceNumber * item.quantity);
    }, 0);
    setTotal(newTotal);

    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cartItems]);

  // ... (دوال تحديث السلة - لا تغيير)
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

  // ... (دالة handleCheckout لإرسال الطلب - لا تغيير)
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setMessage("سلتك فارغة!");
      return;
    }
    if (!customerName || !customerPhone || !customerAddress || !selectedWilaya) {
      setMessage("الرجاء ملء جميع معلومات التوصيل.");
      return;
    }
    setIsLoading(true);
    setMessage("");

    const line_items = cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity
    }));

    const orderData = {
      payment_method: "cod",
      payment_method_title: "Cash on delivery",
      set_paid: false,
      billing: {
        first_name: customerName,
        last_name: "(عميل موقع)",
        address_1: customerAddress,
        city: selectedWilaya,
        country: "DZ",
        phone: customerPhone
      },
      shipping: {
        first_name: customerName,
        address_1: customerAddress,
        city: selectedWilaya,
        country: "DZ"
      },
      line_items: line_items
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
      } else {
        setMessage(`❌ فشل: ${responseData.message || 'حدث خطأ غير معروف'}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ حدث خطأ تقني.");
    }
    setIsLoading(false);
  };

  // 3. عرض السلة الفارغة (استخدام <Link>)
  if (cartItems.length === 0 && !message.startsWith('✅')) {
    return (
      <section className="py-20 sm:py-32 bg-transparent -translate-x-8 dark:bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center text-center">
        <ShoppingBag size={80} className="text-purple-400 mb-6" />
        <h2 className="text-4xl font-bold text-purple-400 mb-4">
          سلة التسوق فارغة
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          لم تقم بإضافة أي منتجات حتى الآن.
        </p>
        <Link
          href="/" // العودة إلى الصفحة الرئيسية
          className="flex items-center justify-center gap-3 
                     px-8 py-4 bg-purple-700 text-white
                     text-lg font-semibold rounded-xl shadow-lg
                     hover:bg-purple-800 transition-all"
        >
          متابعة التسوق
        </Link>
      </section>
    );
  }

  // 4. عرض السلة الممتلئة أو رسالة النجاح (استخدام <Image> و <Link>)
  return (
    <section className="py-20 sm:py-32 bg-transparent dark:bg-gray-900
     min-h-screen text-white -translate-x-10 lg:translate-x-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-6xl mb-12 pt-10 font-bold tracking-tight text-center text-purple-700 dark:text-purple-400">
          سلة التسوق
        </h2>

        {message.startsWith('✅') ? (
          <div className="text-center bg-gray-800 p-10 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold text-green-400 mb-4">شكراً لك!</h3>
            <p className="text-xl text-gray-300">{message}</p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center gap-3 
                         px-8 py-4 bg-purple-700 text-white
                         text-lg font-semibold rounded-xl shadow-lg
                         hover:bg-purple-800 transition-all"
            >
              العودة للرئيسية
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {cartItems.map((item) => (
                <div 
                  key={item.id.toString()}
                  className="flex flex-col sm:flex-row gap-4 bg-gray-800 p-4 rounded-lg shadow-lg items-start text-right"
                >
                  <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-md overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="flex flex-col justify-between h-full w-full">
                    {/* ... (باقي كود السلة) ... */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-lg font-semibold text-purple-400">
                        {item.price} د.ج
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4 w-full">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                        aria-label="إزالة المنتج"
                      >
                        <Trash2 size={20} />
                      </button>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-700 p-1 rounded-full text-white hover:bg-purple-700 transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-700 p-1 rounded-full text-white hover:bg-purple-700 transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ... (ملخص الطلب وحقول الإدخال - لا تغيير) ... */}
            <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg h-fit lg:sticky top-28 text-right">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">
                معلومات التوصيل
              </h3>
              
              <div className="flex flex-col gap-4 mb-6 text-right">
                <input 
                  type="text" 
                  placeholder="* الاسم الكامل" 
                  className="w-full p-3 bg-gray-700 rounded-lg text-white"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  aria-label="الاسم الكامل"
                />
                <input 
                  type="tel" 
                  placeholder="* رقم الهاتف" 
                  className="w-full p-3 bg-gray-700 rounded-lg text-white"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  aria-label="رقم الهاتف"
                />
                <input 
                  type="text" 
                  placeholder="* العنوان (الحي، الشارع...)" 
                  className="w-full p-3 bg-gray-700 rounded-lg text-white"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  aria-label="العنوان"
                />
                <select
                  value={selectedWilaya}
                  onChange={(e) => setSelectedWilaya(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-lg text-white text-right"
                  aria-label="اختر الولاية"
                >
                  <option value="" disabled>* اختر الولاية</option>
                  {algerianWilayas.map((wilaya) => (
                    <option key={wilaya} value={wilaya}>{wilaya}</option>
                  ))}
                </select>
              </div>

              <hr className="border-gray-700 mb-6" />

              <div className="flex justify-between items-center text-2xl font-bold text-white mb-8">
                <span>الإجمالي</span>
                <span>{total.toFixed(2)} د.ج</span>
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
                    <span>إتمام الشراء</span>
                  </>
                )}
              </button>
              
              {message && !message.startsWith('✅') && (
                <p className={`mt-4 text-center text-lg ${message.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;