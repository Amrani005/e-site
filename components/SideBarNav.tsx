import React from 'react'
import Link from 'next/link'
import LogoutButton from "@/components/LogoutButton";
import { 
  Store, LayoutDashboard, ShoppingBag, FileClock, Package, PlusCircle, X, Menu, Search, Bell 
} from 'lucide-react'

const DashboardNavbar = () => {
  return (
    <>
      {/* 1. The CSS-Only State Checkbox */}
      <input type="checkbox" id="sidebar-toggle" className="hidden peer" />

      {/* 2. The Dark Overlay Backdrop */}
      <label 
        htmlFor="sidebar-toggle" 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 hidden peer-checked:block cursor-pointer transition-opacity"
      ></label>

      {/* 3. The Slide-Out Navigation Drawer */}
      <aside className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col" dir="rtl">
        {/* Drawer Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <Store className="w-6 h-6" />
            <span>متجري</span>
          </div>
          <label htmlFor="sidebar-toggle" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </label>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:shadow-sm hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-100 transition-all">
            <LayoutDashboard className="w-5 h-5 text-slate-600" /> نظرة عامة
          </Link>
          <Link href="/dashboard/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:shadow-sm hover:border-indigo-100 hover:text-indigo-700 hover:bg-indigo-50 transition-all">
            <ShoppingBag className="w-5 h-5 text-slate-400" /> الطلبات الواردة
          </Link>
          <Link href="/dashboard/draft" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:shadow-sm hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-700 transition-all">
            <FileClock className="w-5 h-5 text-slate-400" /> المسودات
          </Link>
          <Link href="/dashboard/products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:shadow-sm hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-700 transition-all">
            <Package className="w-5 h-5 text-slate-400" /> إدارة المنتجات
          </Link>
        </nav>

        {/* Special Action Button */}
        <div className="p-6 border-t border-slate-100 bg-slate-50">
          <Link href="/dashboard/products/add" className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-md shadow-indigo-600/20">
            <PlusCircle className="w-5 h-5" /> إضافة منتج جديد
          </Link>
        </div>
      </aside>

      {/* 4. The Top Navigation Bar (Always visible on the page) */}
      <header className="bg-white border-b p-10 border-slate-200 h-16 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between" dir="rtl">
        <div className="flex items-center gap-4 w-full max-w-md">
          
          {/* THE TRIGGER: Hamburger Button */}
          <label htmlFor="sidebar-toggle" className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer">
            <Menu className="w-10 h-10" />
          </label>
          
          
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4">
          
          <div className="h-6 w-px bg-slate-200 mx-1 sm:mx-2"></div>
          <LogoutButton />
        </div>
      </header>
    </>
  )
}

export default DashboardNavbar;