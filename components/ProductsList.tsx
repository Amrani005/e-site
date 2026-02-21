"use client";

import { deleteProducts } from "@/actions/deletProducts";
import { motion } from "framer-motion";
import Link from "next/link";
import { Trash2, Plus, Package, Calendar, Tag } from "lucide-react";

// Animation variants for the staggered list effect
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
    <div className="w-full max-w-5xl mx-auto">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r
           from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            المنتجات
          </h1>
          <p className="text-blue-200/60 text-sm mt-1">إدارة قائمة المنتجات والمخزون</p>
        </div>
        
        <Link 
          href="/dashboard/products/add" 
          className="group bg-gradient-to-r from-blue-600 to-cyan-500
           text-white py-2.5 px-6 rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90
           duration-300" />
          <span>إضافة منتج</span>
        </Link>

        <Link href='/dashboard'
         className="group bg-gradient-to-r from-blue-600 to-cyan-500
          text-white py-2.5 px-6 rounded-xl hover:shadow-lg 
          hover:shadow-cyan-500/20 transition-all duration-300 flex 
          items-center gap-2">
        
          <p className="group-hover:scale-[1.1] duration-300 font-bold
            text-white ">go to dashboard
          </p>
         
        </Link>
      </div>

      {/* Glass Table Container */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-2xl relative">
        
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 p-5 border-b border-white/10 bg-white/5 text-blue-200 font-medium text-sm">
          <div className="flex items-center gap-2"><Package className="w-4 h-4"/> اسم المنتج</div>
          <div className="flex items-center gap-2"><Tag className="w-4 h-4"/> السعر</div>
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4"/> تاريخ الإضافة</div>
          <div className="text-center">إجراءات</div>
        </div>

        {/* Scrollable List with Motion */}
        <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {products.length > 0 ? (
              products.map((product) => (
                <motion.div 
                  variants={itemVariants}
                  key={product.id} 
                  className="grid grid-cols-4 gap-4 p-5 border-b border-white/5 items-center hover:bg-white/5 transition-colors group"
                >
                  {/* Name */}
                  <div className="font-semibold text-white truncate pl-2">
                    {product.name}
                  </div>

                  {/* Price */}
                  <div className="font-bold text-cyan-400">
                    {Number(product.price).toLocaleString('en-US')} <span className="text-xs text-cyan-400/60">DZD</span>
                  </div>

                  {/* Date */}
                  <div className="text-sm text-slate-400">
                    {new Date(product.createdAt).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-center">
                    <form action={deleteProducts}>
                      <input type="hidden" name="id" value={product.id} />
                      <button 
                        type="submit" 
                        className="p-2  text-red-400 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition-all duration-200 opacity-70 group-hover:opacity-100"
                        title="حذف المنتج"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div variants={itemVariants} className="p-12 text-center text-slate-400 flex flex-col items-center gap-4">
                <Package className="w-16 h-16 opacity-20" />
                <p>لا توجد منتجات حتى الآن، ابدأ بإضافة واحد!</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}