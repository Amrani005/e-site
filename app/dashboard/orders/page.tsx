import React from 'react'
import { db } from '@/lib/db'
import deleteOrders from '@/actions/deleteOrders'
import Link from 'next/link'


export default async function OrdersPage ()  {
     const orders = await db.order.findMany({
      where:{
        NOT:{status: 'draft'}
      },
        orderBy:{
            createdAt: 'desc'
        }
     })
  return (
    <div id='#orders' className="p-10 bg-slate-50 min-h-screen" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          📦 الطلبات الواردة ({orders.length})
        </h1>
         <Link href='/dashboard'
         className="group bg-gradient-to-r from-blue-600 to-cyan-500
           text-white py-2.5 px-6 rounded-xl hover:shadow-lg 
           hover:shadow-cyan-500/20 transition-all duration-300 flex 
           items-center gap-2"
        >
        
           <p className="group-hover:scale-[1.1] duration-300 font-bold
            text-white ">go to dashboard
            </p>
         
       </Link>
      </div>

      <div className="border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-right bg-white">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4">رقم الطلب</th>
              <th className="p-4">الزبون</th>
              <th className="p-4">العنوان / الولاية</th>
              <th className="p-4">تفاصيل الطلب</th>
              <th className="p-4">المجموع</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">التاريخ</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => {
              
              // 2. فك تشفير البيانات المخزنة كنص (JSON Parse)
              // لأننا خزنا الكمية والولاية داخل حقل نصي في SQLite
              let details: any = {};
              try {
                details = JSON.parse(order.orderItems);
              } catch (e) {
                details = { quantity: 1, deliveryType: '?' };
              }

              return (
                <tr key={order.id} className="hover:bg-slate-50 transition">
                  
                  {/* رقم الطلب (مختصر) */}
                  <td className="p-4 font-mono text-sm text-slate-500">
                    #{order.id.slice(0, 8)}...
                  </td>

                  {/* معلومات الزبون */}
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{order.customerName}</div>
                    <div className="text-sm text-blue-600 dir-ltr text-right">{order.customerPhone}</div>
                  </td>

                  {/* العنوان */}
                  <td className="p-4 text-sm max-w-xs">
                     <span className="block font-bold mb-1">{details.wilaya}</span>
                     <span className="text-slate-500">{order.customerAddress}</span>
                  </td>

                  {/* التفاصيل (الكمية والنوع) */}
                  <td className="p-4">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-xs font-bold">
                       الكمية: {details.quantity}
                    </span>
                    <span className="block text-xs text-slate-500 mt-1">
                      {details.deliveryType === 'Domicile' ? '🏠 توصيل للمنزل' : 'office توصيل للمكتب'}
                    </span>
                  </td>

                  {/* السعر */}
                  <td className="p-4 font-black text-green-600">
                    {order.totalPrice} DZD
                  </td>

                  {/* الحالة */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold
                      ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    `}>
                      {order.status === 'pending' ? 'قيد الانتظار' : order.status}
                    </span>
                  </td>

                  {/* التاريخ */}
                  <td className="p-4 text-sm text-slate-400">
                    {new Date(order.createdAt).toLocaleDateString('ar-DZ')}
                    <br />
                    {new Date(order.createdAt).toLocaleTimeString('ar-DZ', { hour: '2-digit', minute:'2-digit' })}
                  </td>
                  <td >
                    <form className='z-50 border-2 bg-red-600 rounded-3xl justify-center
                     h-10 w-15 text-center  hover:scale-[1.1] duration-300 ' action={deleteOrders}>
                           <input type="hidden" name="id" value={order.id} />
                           <button type="submit" className='text-black w-full h-full '>حذف</button>
                         </form>
                  </td>
                         
                </tr>
              );
            })}
            
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="p-10 text-center text-slate-500">
                  لا توجد طلبات حتى الآن. الرزق على الله! 🤲
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
      </div>
    </div>
  );
}

