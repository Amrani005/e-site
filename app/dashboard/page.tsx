
import { db } from "@/lib/db";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

import { 
  ShoppingBag, 
  ArrowBigLeft, 
  PlusCircle, 
  Package, 
  ChevronLeft,
  LayoutDashboard,
  TrendingUp 
} from "lucide-react";
import { signOut } from "next-auth/react";

export default async function DashboardPage() {
    
  // 1. جلب الإحصائيات دفعة واحدة (أسرع للأداء)
  const [ordersCount, draftsCount, productsCount] = await Promise.all([
    db.order.count({ where: { status: { not: 'Draft' } } }), // عدد الطلبات الحقيقية
    db.order.count({ where: { status: 'Draft' } }),          // عدد المسودات
    db.product.count()                                       // عدد المنتجات
  ]);

  
  

 

  return (
    <section className="min-h-screen bg-slate-50 p-8" dir="rtl">
      
      {/* Header */}
      <header className="flex mb-10 justify-between">
        <div>
          <div>
          <div className="flex items-center gap-3 text-slate-800 mb-2">
          <LayoutDashboard className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">لوحة القيادة</h1>
        </div>
        <p className="text-slate-500">مرحباً بك في مركز التحكم. لديك <strong className="text-black">{ordersCount}</strong> طلبات نشطة اليوم.</p>
        </div>
        </div>
        <LogoutButton/>
        

      </header>

      {/* Main Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. بطاقة الطلبات (Orders) */}
        <Link 
          href="/dashboard/orders" 
          className="group bg-white p-6 rounded-2xl shadow-sm border
           border-slate-100 hover:shadow-xl hover:-translate-y-1 
           transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ShoppingBag size={28} />
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
              {ordersCount} طلب
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">الطلبات الواردة</h3>
          <p className="text-slate-400 text-sm">متابعة وتأكيد طلبات الزبائن</p>
        </Link>

        {/* 2. بطاقة المسودات (Drafts) */}
        <Link 
          href="/dashboard/draft" 
          className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <ArrowBigLeft size={28} />
            </div>
            <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">
              {draftsCount} مسودة
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">الطلبات المتروكة</h3>
          <p className="text-slate-400 text-sm">استعادة الزبائن الذين لم يكملوا</p>
        </Link>

        {/* 3. بطاقة المنتجات (Products) */}
        <Link 
          href="/dashboard/products" 
          className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Package size={28} />
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">
              {productsCount} منتج
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">جميع المنتجات</h3>
          <p className="text-slate-400 text-sm">تعديل الأسعار والمخزون</p>
        </Link>

        {/* 4. بطاقة إضافة منتج (Add New) */}
        <Link 
          href="/dashboard/products/add" 
          className="group bg-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-white"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/10 rounded-xl text-white group-hover:bg-white group-hover:text-black transition-colors">
              <PlusCircle size={28} />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-1">إضافة منتج جديد</h3>
          <p className="text-slate-400 text-sm">إطلاق منتج جديد للمتجر</p>
        </Link>

      </div>

      {/* Quick Access / Stats Section (Optional Decoration) */}
      <div className="mt-10 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl text-white shadow-lg flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">🚀 نصيحة اليوم</h2>
          <p className="text-indigo-100 max-w-md">
            لديك {draftsCount} زبائن وصلوا لصفحة الدفع وخرجوا. جرب الاتصال بهم الآن، غالباً سيشترون!
          </p>
        </div>
        
        <Link 
          href="/dashboard/draft"
          className="mt-4 md:mt-0 relative z-10 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg flex items-center gap-2"
        >
           مشاهدة المسودات <ChevronLeft size={20} />
        </Link>
      </div>

    </section>
  );
}