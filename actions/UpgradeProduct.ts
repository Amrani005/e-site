"use sign"; // أو "use server" حسب واش راك كاتب
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function UpgradeProduct(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    if (!id) return { success: false, error: "ID missing" };

    // السيرفر هنا يستقبل الروابط مباشرة ويحفظها في قاعدة البيانات في رمشة عين
    await db.product.update({
      where: { id: id },
      data: {
        name: formData.get("name") as string,
        price: Number(formData.get("price")),
        description: formData.get("description") as string,
        hookTitle: formData.get("hookTitle") as string,
        hookSubtitle: formData.get("hookSubtitle") as string,
        hadithText: formData.get("hadithText") as string,
        hookDesc: formData.get("hookDesc") as string,
        packagesData: formData.get("packagesData") as string,
        
        // 👇 هنا يستقبل الروابط (URLs) اللي جابهالنا المتصفح من Cloudinary
        imageUrl: formData.get("imageUrl") as string,
        images: formData.get("gallery") as string,
        galleryImages_2: formData.get("galleryImages_2") as string,
        reviewImages1: formData.get("reviewImages1") as string,
        reviewImages2: formData.get("reviewImages2") as string,
      }
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Database Update Error:", error);
    return { success: false };
  }
}