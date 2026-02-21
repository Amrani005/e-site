"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary"; // 👈 استدعاء السحابة

// ⚙️ إعداد الاتصال بالسحابة (سيقرأها من Vercel لاحقاً)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createProducts(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;

    // 🧠 دالة سحرية: تحول الملف إلى بيانات قابلة للقراءة وترفعها للسحابة
    const uploadToCloudinary = async (file: File): Promise<string> => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "dzshop_products" }, // سيتم إنشاء مجلد بهذا الاسم في حسابك
          (error, result) => {
            if (error) {
              console.error("Cloudinary Error:", error);
              reject(error);
            } else {
              resolve(result!.secure_url); // نأخذ الرابط الآمن المشفر (https)
            }
          }
        );
        uploadStream.end(buffer);
      });
    };

    // --- 1. رفع الصورة الرئيسية ---
    const imageFile = formData.get("image") as File;
    let mainImageUrl = "";
    if (imageFile && imageFile.size > 0) {
      mainImageUrl = await uploadToCloudinary(imageFile); 
    }

    // --- 2. رفع صور المعرض (Gallery) ---
    const galleryFiles = formData.getAll("gallery") as File[];
    let images: string[] = [];
    for (const file of galleryFiles) {
      if (file.size > 0) {
        const url = await uploadToCloudinary(file);
        images.push(url);
      }
    }
    const galleryString = JSON.stringify(images);

    // --- 3. حفظ المنتج في قاعدة البيانات (مع الروابط السحابية) ---
    await db.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        imageUrl: mainImageUrl, // نحفظ الرابط فقط!
        images: galleryString,  // نحفظ قائمة الروابط فقط!
      },
    });


      revalidatePath("/dashboard/products");
    revalidatePath("/"); 
    // إذا كان لديك صفحة خاصة بالمنتجات في الموقع أضفها أيضاً مثل: revalidatePath("/products");

    // 2. إرسال رسالة نجاح للفرونت إند بدلاً من الـ redirect
    return { success: true };
  } catch (error) {
    console.error("❌ حدث خطأ أثناء الحفظ:", error);
    return { success: false, error: "فشل في حفظ المنتج" };
  }

  
}