import React from 'react'
import { db } from '@/lib/db'
import deleteOrders from '@/actions/deleteOrders'
import Link from 'next/link'
import SideBarNav from "@/components/SideBarNav";
import OrderChangeSelecter from '@/components/OrderChangeSelector' // Adjust path if needed
import { 
  ArrowRight, 
  Trash2, 
  FileClock, 
  MapPin, 
  Phone, 
  Package, 
  User 
} from 'lucide-react'

export default async function DraftOrdersPage() {
  const orders = await db.order.findMany({
    where: {
      status: 'draft' 
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div id='#draft' className="min-h-screen bg-[#F8FAFC] pb-12" dir="rtl">
      <SideBarNav/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                <FileClock className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                المسودات <span className="text-lg font-medium text-slate-500 mx-2">({orders.length})</span>
              </h1>
            </div>
            <p className="text-slate-500 text-sm mt-1">
              الزبائن الذين بدأوا الطلب ولم يكملوه. غيّر الحالة إلى "مؤكد" فور اتصالك بهم.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link 
              href="/dashboard"
              className="flex-1 sm:flex-none justify-center bg-white text-slate-700 border border-slate-200 py-2.5 px-4 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
              <span>اللوحة الرئيسية</span>
            </Link>
          </div>
        </div>

        {/* Clean White Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse min-w-[1050px]">
              
              {/* Table Header */}
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">رقم الطلب</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">الزبون</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">العنوان / الولاية</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">التفاصيل</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">المجموع</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center w-36">الحالة</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">التاريخ</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center w-20">إجراء</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 bg-white">
                {orders.map((order) => {
                  
                  // JSON Parse
                  let details: any = {};
                  try {
                    details = JSON.parse(order.orderItems);
                  } catch (e) {
                    details = { quantity: 1, deliveryType: '?' };
                  }

                  return (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                      
                      {/* Order ID */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                          #{order.id.slice(0, 6).toUpperCase()}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                            <User className="w-3.5 h-3.5 text-slate-400"/> 
                            {order.customerName || 'غير معروف'}
                          </span>
                          <span className="text-xs font-medium text-indigo-600 flex items-center gap-1.5" dir="ltr">
                            {order.customerPhone} <Phone className="w-3 h-3"/>
                          </span>
                        </div>
                      </td>

                      {/* Address */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col max-w-[200px]">
                          <span className="font-bold text-slate-700 text-sm mb-1 truncate">
                            {details.wilaya || 'لم يتم التحديد'}
                          </span>
                          <span className="text-xs text-slate-500 flex items-start gap-1 truncate" title={order.customerAddress}>
                            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-50"/>
                            <span className="truncate">{order.customerAddress || 'لا يوجد عنوان'}</span>
                          </span>
                        </div>
                      </td>

                      {/* Details (Quantity & Delivery) */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1.5 items-start">
                          <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                            <Package className="w-3 h-3"/> الكمية: {details.quantity || 1}
                          </span>
                          <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                            {details.deliveryType === 'Domicile' ? 'توصيل للمنزل' : 'توصيل للمكتب'}
                          </span>
                        </div>
                      </td>

                      {/* Total Price */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900 flex items-center gap-1">
                          {Number(order.totalPrice || 0).toLocaleString('en-US')} 
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">DZD</span>
                        </div>
                      </td>

                      {/* Interactive Status Changer */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <OrderChangeSelecter orderId={order.id} currentStatus={order.status} />
                      </td>

                      {/* Date & Time */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="text-slate-700 font-medium mb-0.5">
                          {new Date(order.createdAt).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="text-xs text-slate-400">
                          {new Date(order.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute:'2-digit' })}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <form action={deleteOrders}>
                          <input type="hidden" name="id" value={order.id} />
                          <button 
                            type="submit" 
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors mx-auto block"
                            title="حذف المسودة"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Empty State */}
            {orders.length === 0 && (
              <div className="py-20 text-center flex flex-col items-center justify-center bg-white">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                  <FileClock className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">لا توجد مسودات</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  جميع الطلبات مكتملة ولا يوجد زبائن غادروا صفحة الدفع حالياً.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}