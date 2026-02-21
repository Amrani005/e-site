
"use client"; // لأننا نستخدم تفاعل المستخدم (أزرار وحقول إدخال)

import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // نمنع الصفحة من إعادة التحميل المزعجة
    
    // إرسال البيانات سراً إلى ملف route.ts الذي أنشأناه في الخطوة 2
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false, // نمنع التوجيه التلقائي لكي نتحكم به نحن
    });
    

    if (res?.error) {
      // إذا رجع null من خطوة 2
      setError("❌ البريد أو كلمة المرور غير صحيحة");
    } else {
      // إذا نجح الدخول وتمت صناعة التذكرة، نوجهه إلى الداشبورد
      router.push("/dashboard");
      router.refresh(); // تحديث الصفحة لضمان قراءة التذكرة الجديدة
    }
   
   
  };
  

  return (
    <div className="flex h-screen text-black items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-96 rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">دخول لوحة التحكم</h1>
        
        {/* رسالة الخطأ تظهر هنا إذا أخطأ في الكتابة */}
        {error && <div className="mb-4 text-center text-red-500 font-bold">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="admin@dzshop.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="******"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 text-white font-bold hover:bg-blue-700 transition-colors"
        >
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
}