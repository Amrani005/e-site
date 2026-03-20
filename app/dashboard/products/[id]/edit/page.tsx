import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import EditProductForm from "@/components/EditProductForm";

export default async function EditPage({ params }: any) {
  try {
    // 1. انتظار وفك تشفير الـ params لتجنب أخطاء Next.js
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    if (!productId || productId === "[id]") {
      redirect("/dashboard/products");
    }

    // 2. جلب المنتج
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      redirect("/dashboard/products");
    }

    // 3. رمي البيانات للفورم
    return <EditProductForm product={product} />;

  } catch (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white p-6">
        <div className="bg-red-500/10 border border-red-500 rounded-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">فشل التحميل</h1>
        </div>
      </div>
    );
  }
}