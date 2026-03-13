'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteProducts(formData: FormData) {
    try {
        const productId = formData.get("id") as string;

        if (!productId) return;

        // 1. حذف المنتج من قاعدة البيانات
        await db.product.delete({
            where: {
                id: productId,
            }
        });

        // 2. غسيل الكاش في كل مكان! (هذا هو السلاح السري)
        revalidatePath("/dashboard/products");
        revalidatePath("/dashboard"); // 👈 لتدمير الشبح من الواجهة الرئيسية
        revalidatePath("/");
    } catch (error) {
        console.error("❌ حدث خطأ أثناء الحذف:", error);
    }
}