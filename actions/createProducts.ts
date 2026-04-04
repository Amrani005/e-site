"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
// 🗑️ نحينا Cloudinary كامل من هنا لأننا ماعادش نحتاجوه في السيرفر

export async function createProducts(formData: FormData) {
  try {
    // السيرفر هنا يستقبل غير النصوص والروابط الواجدة (الوصولات) لي جابهالو المتصفح
    await db.product.create({
      data: {
        name: formData.get("name") as string,
        price: Number(formData.get("price")),
        description: (formData.get("description") as string) || null, 
        
        hookTitle: (formData.get("hookTitle") as string) || null,
        hookSubtitle: (formData.get("hookSubtitle") as string) || null,
        hookDesc: (formData.get("hookDesc") as string) || null,
        hadithText: (formData.get("hadithText") as string) || null,
        packagesData: (formData.get("packagesData") as string) || null, 
        
        // 👇 هنا يرفد الروابط (URLs) الواجدة من الفورم
        imageUrl: (formData.get("imageUrl") as string) || "",
        images: (formData.get("gallery") as string) || "[]",
        galleryImages_2: (formData.get("galleryImages_2") as string) || "[]",
        reviewImages1: (formData.get("reviewImages1") as string) || "[]",
        reviewImages2: (formData.get("reviewImages2") as string) || "[]",
      },
    });

    // غسيل الكاش
    revalidatePath("/dashboard/products");
    revalidatePath("/"); 

    return { success: true };
    
  } catch (error) {
    console.error("❌ CRITICAL ERROR in createProducts:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown server error" };
  }
}