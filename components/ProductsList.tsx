"use client";

import { deleteProducts } from "@/actions/deletProducts";
import { motion } from "framer-motion";
import Link from "next/link";
import { Trash2, Plus, Package, Calendar, Tag, Pencil,ArrowRight } from "lucide-react";


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ProductsList({ products }: { products: any[] }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Package className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                المنتجات
              </h1>
            </div>
            <p className="text-slate-500 text-sm mt-1">إدارة قائمة المنتجات والمخزون الخاص بمتجرك</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link 
              href="/dashboard"
              className="flex-1 sm:flex-none justify-center bg-white text-slate-700 border border-slate-200 py-2.5 px-4 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
              <span>اللوحة</span>
            </Link>

            <Link 
              href="/dashboard/products/add" 
              className="flex-1 sm:flex-none justify-center bg-indigo-600 text-white py-2.5 px-5 rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 text-sm font-medium shadow-sm shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة منتج</span>
            </Link>
          </div>
        </div>

        {/* Clean White Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          
          {/* Responsive Wrapper for Mobile Scrolling */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              
              {/* Table Header */}
              <div className="grid grid-cols-[2.5fr_1fr_1fr_100px] gap-4 p-4 border-b border-slate-200 bg-slate-50/80 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                <div className="flex items-center gap-2 pr-4"><Package className="w-4 h-4"/> اسم المنتج</div>
                <div className="flex items-center gap-2"><Tag className="w-4 h-4"/> السعر</div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4"/> تاريخ الإضافة</div>
                <div className="text-center">إجراءات</div>
              </div>

              {/* Scrollable List with Motion */}
              <div className="h-full overflow-y-auto custom-scrollbar bg-white">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col divide-y divide-slate-100"
                >
                  {products.length > 0 ? (
                    products.map((product: any) => (
                      <motion.div 
                        variants={itemVariants}
                        key={product.id} 
                        className="grid grid-cols-[2.5fr_1fr_1fr_100px] gap-4 p-4 items-center hover:bg-slate-50/80 transition-colors group"
                      >
                        {/* Name */}
                        <div className="font-semibold text-slate-900 truncate pr-4">
                          {product.name}
                        </div>

                        {/* Price */}
                        <div className="font-bold text-slate-900 flex items-center gap-1">
                          {Number(product.price).toLocaleString('en-US')} 
                          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">DZD</span>
                        </div>

                        {/* Date */}
                        <div className="text-sm text-slate-500">
                          {new Date(product.createdAt).toLocaleDateString('ar-EG', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-center items-center gap-1">
                          {/* Edit Button - Swapped to Pencil for professional look */}
                          <Link 
                            href={`/dashboard/products/${product.id}/edit`}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="تعديل المنتج"
                          >
                            <Pencil className="w-4 h-4"/>
                          </Link>

                          {/* Delete Form */}
                          <form action={deleteProducts}>
                            <input type="hidden" name="id" value={product.id} />
                            <button 
                              type="submit" 
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="حذف المنتج"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    // Empty State
                    <motion.div variants={itemVariants} className="py-16 px-6 text-center flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                        <Package className="w-8 h-8 text-slate-300" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">لا توجد منتجات</h3>
                      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                        لم تقم بإضافة أي منتجات حتى الآن. ابدأ بإضافة منتجك الأول لتبدأ في استقبال الطلبات.
                      </p>
                      <Link 
                        href="/dashboard/products/add" 
                        className="bg-white border border-slate-200 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        إضافة منتجك الأول
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}