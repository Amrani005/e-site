import { db } from "@/lib/db";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import DashboardChart from "@/components/DashboardChart";
import { 
  ShoppingBag, 
  ArrowBigLeft, 
  Package, 
  Plus,
  Search,
  Bell,
  TrendingUp,
  MoreHorizontal,
  ArrowUpRight
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default async function DashboardPage() {
  // Fetching data - Added a query for the 5 most recent orders to populate a table
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [ordersCount, draftsCount, productsCount, recentOrderDates, recentOrders] = await Promise.all([
    db.order.count({ where: { status: { not: 'draft' } } }),
    db.order.count({ where: { status: 'draft' } }),
    db.product.count(),
    db.order.findMany({
      where: { status: { not: 'draft' }, createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true } 
    }),
    // Fetch 5 latest orders for the data table
    db.order.findMany({
      where: { status: { not: 'draft' } },
      orderBy: { createdAt: 'desc' },
      take: 5,
     
    })
  ]);

  return (
    <section className="min-h-screen bg-[#F8FAFC] pb-12" dir="rtl">
      
      {/* 1. Professional Topbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 w-1/3">
          <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="البحث عن طلب، زبون، أو منتج..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <LogoutButton />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">نظرة عامة</h1>
            <p className="text-sm text-slate-500 mt-1">
              مرحباً بك مجدداً. إليك ملخص أداء متجرك اليوم.
            </p>
          </div>
          <Link 
            href="/dashboard/products/add" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" /> إضافة منتج
          </Link>
        </div>

        {/* 2. KPI Stat Cards (Minimalist & Clean) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">إجمالي الطلبات</p>
                <h3 className="text-3xl font-bold text-slate-900">{ordersCount}</h3>
              </div>
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="flex items-center text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                <TrendingUp className="w-3 h-3 ml-1" /> +12%
              </span>
              <span className="text-slate-400">مقارنة بالشهر الماضي</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">الطلبات المتروكة (المسودات)</p>
                <h3 className="text-3xl font-bold text-slate-900">{draftsCount}</h3>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                <ArrowBigLeft className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-slate-500">فرصة لاستعادة المبيعات الضائعة</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">المنتجات النشطة</p>
                <h3 className="text-3xl font-bold text-slate-900">{productsCount}</h3>
              </div>
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Link href="/dashboard/products" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                إدارة الكتالوج <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Middle Section: Chart & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            {/* Using the Chart Component from earlier */}
            <DashboardChart orders={recentOrderDates} />
          </div>

          {/* Actionable Insights Panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-4">إجراءات مقترحة</h3>
            
            <div className="flex-1 flex flex-col justify-center">
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
                  <h4 className="font-semibold text-indigo-900">حملة استعادة</h4>
                </div>
                <p className="text-sm text-indigo-700 leading-relaxed mb-4">
                  يوجد {draftsCount} زبائن لم يكملوا الدفع. إرسال رسالة تذكير الآن قد يرفع نسبة تحويلاتك.
                </p>
                <Link 
                  href="/dashboard/draft"
                  className="w-full inline-block text-center bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  معالجة المسودات
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Data Table: Recent Orders */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-white">
            <h3 className="text-lg font-bold text-slate-900">أحدث الطلبات</h3>
            <Link href="/dashboard/orders" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              عرض الكل
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium">رقم الطلب</th>
                  <th className="px-6 py-4 font-medium">التاريخ</th>
                  <th className="px-6 py-4 font-medium">الحالة</th>
                  <th className="px-6 py-4 font-medium text-left">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      لا توجد طلبات حديثة
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">#{order.id.slice(-6).toUpperCase()}</td>
                      <td className="px-6 py-4 text-slate-600">
                        {format(new Date(order.createdAt), "dd MMMM yyyy", { locale: ar })}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          مكتمل
                        </span>
                      </td>
                      <td className="px-6 py-4 text-left">
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}