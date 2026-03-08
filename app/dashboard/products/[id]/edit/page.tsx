import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import EditProductForm from "@/components/EditProductForm";

export default async function EditPage({ params }: any) {
  try {
    const resolvedParams = await params;
    const productId = resolvedParams.id;
     


    const product = await db.product.findUnique({
      where: { 
        id: productId 
      },
    });


    if (!product) {
      redirect("/dashboard/products");
    }

    return <EditProductForm product={product} />;

  } catch (error) {
    console.error("Critical Server Error in Edit Page:", error);
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white p-6">
        <div className="bg-red-500/10 border border-red-500 rounded-xl p-8 max-w-lg text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">فشل تحميل بيانات المنتج</h1>
          <p className="text-slate-300 mb-4">
            حدث خطأ في الخادم أثناء محاولة جلب البيانات من قاعدة البيانات.
          </p>
          <p className="text-sm text-slate-400 bg-black/50 p-4 rounded-lg">
            يرجى فتح شاشة الـ Terminal في برنامج VS Code لقراءة رسالة الخطأ الحمراء ومعرفة السبب الدقيق.
          </p>
        </div>
      </div>
    );
  }
}