"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";    

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createProducts(formData: FormData) {
  try {
    // 1. التقاط النصوص بأمان
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;

    const hookTitle = formData.get("hookTitle") as string | null;
    const hookSubtitle = formData.get("hookSubtitle") as string | null;
    const hookDesc = formData.get("hookDesc") as string | null;
    const hadithText = formData.get("hadithText") as string | null;
    
    // 👇 هذا هو السطر الذي كان مفقوداً لالتقاط الباقات الديناميكية!
    const packagesData = formData.get("packagesData") as string | null;

    // 2. دالة الرفع الآمنة للسحابة
    const uploadToCloudinary = async (file: File): Promise<string> => {
      if (!file || file.size === 0) return "";

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "dzshop_products" }, 
          (error, result) => {
            if (error) {
              console.error("Cloudinary Error:", error);
              reject(error);
            } else {
              resolve(result!.secure_url); 
            }
          }
        );
        uploadStream.end(buffer);
      });
    };

    // 3. رفع الصورة الرئيسية بأمان
    const imageFile = formData.get("image") as File;
    let mainImageUrl = "";
    if (imageFile && imageFile.size > 0) {
      mainImageUrl = await uploadToCloudinary(imageFile); 
    }

    // 4. دالة مساعدة محمية لرفع المصفوفات
    const uploadMultipleFiles = async (fieldName: string): Promise<string[]> => {
      const files = formData.getAll(fieldName);
      const urls: string[] = [];
      
      for (const file of files) {
        if (file instanceof File && file.size > 0) {
          try {
            const url = await uploadToCloudinary(file);
            if (url) urls.push(url);
          } catch (e) {
             console.error(`Failed to upload file from ${fieldName}`);
          }
        }
      }
      return urls;
    };

    // 5. رفع المصفوفات
    const galleryUrls = await uploadMultipleFiles("gallery");
    const review1Urls = await uploadMultipleFiles("reviewImages1");
    const review2Urls = await uploadMultipleFiles("reviewImages2");
    const gallery_2Urls = await uploadMultipleFiles("galleryImages_2")

    // 6. الحفظ في قاعدة البيانات
    await db.product.create({
      data: {
        name: name,
        price: price,
        description: description || null, 
        imageUrl: mainImageUrl,
        images: galleryUrls.length > 0 ? JSON.stringify(galleryUrls) : "[]",  
        hookTitle: hookTitle || null,
        hookSubtitle: hookSubtitle || null,
        hookDesc: hookDesc || null,
        hadithText: hadithText || null,
        packagesData: packagesData || null, 
        reviewImages1: review1Urls.length > 0 ? JSON.stringify(review1Urls) : null,
        reviewImages2: review2Urls.length > 0 ? JSON.stringify(review2Urls) : null,
        galleryImages_2: gallery_2Urls.length > 0 ? JSON.stringify(gallery_2Urls):null,
      },
    });

    // 7. غسيل الكاش
    revalidatePath("/dashboard/products");
    revalidatePath("/"); 

    return { success: true };
    
  } catch (error) {
    console.error("❌ CRITICAL ERROR in createProducts:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown server error" };
  }
}