import { db } from "@/lib/db";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import DashboardChart from "@/components/DashboardChart";
import SideBarNav from "@/components/SideBarNav";
import { 
  ShoppingBag, 
  ArrowBigLeft, 
  Package, 
  Plus,
  Search,
  Bell,
  TrendingUp,
  MoreHorizontal,
  ArrowUpRight,
  Menu,
  X,
  LayoutDashboard,
  FileClock,
  PlusCircle,
  Store
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default async function DashboardPage() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Fetching all data
  const [ordersCount, draftsCount, productsCount, recentOrderDates, recentOrders] = await Promise.all([
    db.order.count({ where: { status: { not: 'draft' } } }),
    db.order.count({ where: { status: 'draft' } }),
    db.product.count(),
    db.order.findMany({
      where: { status: { not: 'draft' }, createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true } 
    }),
    db.order.findMany({
      where: { status: { not: 'draft' } },
      orderBy: { createdAt: 'desc' },
      take: 5,
    })
  ]);

  return (
    <section className="min-h-screen bg-[#F8FAFC] relative overflow-hidden" dir="rtl">
      
      
      

      <div className="flex flex-col min-h-screen pb-12">

        <SideBarNav/>

        {/* Dashboard Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 w-full">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">نظرة عامة</h1>
              <p className="text-sm text-slate-500 mt-1">مرحباً بك مجدداً. إليك ملخص أداء متجرك اليوم.</p>
            </div>
            <Link href="/dashboard/products/add" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm shadow-indigo-600/20">
              <Plus className="w-4 h-4" /> إضافة منتج
            </Link>
          </div>

          {/* KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link href="/dashboard/orders" className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all block">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1 group-hover:text-indigo-600 transition-colors">إجمالي الطلبات</p>
                  <h3 className="text-3xl font-bold text-slate-900">{ordersCount}</h3>
                </div>
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="flex items-center text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                  <TrendingUp className="w-3 h-3 ml-1" /> +12%
                </span>
                <span className="text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">عرض الطلبات <ArrowUpRight className="w-3 h-3" /></span>
              </div>
            </Link>

            <Link href="/dashboard/draft" className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-amber-300 transition-all block">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1 group-hover:text-amber-600 transition-colors">المسودات</p>
                  <h3 className="text-3xl font-bold text-slate-900">{draftsCount}</h3>
                </div>
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <ArrowBigLeft className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-500">فرصة لاستعادة المبيعات</span>
                <span className="text-amber-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">معالجة المسودات <ArrowUpRight className="w-3 h-3" /></span>
              </div>
            </Link>

            <Link href="/dashboard/products" className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-400 transition-all block">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1 group-hover:text-slate-800 transition-colors">المنتجات النشطة</p>
                  <h3 className="text-3xl font-bold text-slate-900">{productsCount}</h3>
                </div>
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-500">تعديل الأسعار والمخزون</span>
                <span className="text-slate-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">إدارة الكتالوج <ArrowUpRight className="w-3 h-3" /></span>
              </div>
            </Link>
          </div>

          {/* Chart & Insights Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <DashboardChart orders={recentOrderDates} />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-4">إجراءات مقترحة</h3>
              <div className="flex-1 flex flex-col justify-center">
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                    <h4 className="font-semibold text-indigo-900">حملة استعادة</h4>
                  </div>
                  <p className="text-sm text-indigo-700 leading-relaxed mb-4">
                    يوجد {draftsCount} زبائن لم يكملوا الدفع. إرسال رسالة تذكير الآن قد يرفع نسبة تحويلاتك.
                  </p>
                  <Link href="/dashboard/draft" className="w-full inline-block text-center bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    الذهاب للمسودات
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-white">
              <h3 className="text-lg font-bold text-slate-900">أحدث الطلبات</h3>
              <Link href="/dashboard/orders" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">عرض الكل</Link>
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
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-500">لا توجد طلبات حديثة</td>
                    </tr>
                  ) : (
                    recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">#{order.id.slice(-6).toUpperCase()}</td>
                        <td className="px-6 py-4 text-slate-600">
                          {format(new Date(order.createdAt), "dd MMMM yyyy", { locale: ar })}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">مكتمل</span>
                        </td>
                        <td className="px-6 py-4 text-left">
                          <Link href={`/dashboard/orders/${order.id}`} className="text-slate-400 hover:text-indigo-600 transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </section>
  );
}