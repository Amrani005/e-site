"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function UpgradeProduct(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;
    const hookTitle = formData.get("hookTitle") as string | null;
    const hookSubtitle = formData.get("hookSubtitle") as string | null;
    const hookDesc = formData.get("hookDesc") as string | null;
    const hadithText = formData.get("hadithText") as string | null;
    const packagesData = formData.get("packagesData") as string | null;

    if (!id) return { success: false, error: "ID is missing" };

    const oldProduct = await db.product.findUnique({ where: { id: id } });
    if (!oldProduct) return { success: false, error: "Product not found" };

    const uploadToCloudinary = async (file: File): Promise<string> => {
      if (!file || file.size === 0) return "";
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "dzshop_products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result!.secure_url);
          }
        );
        uploadStream.end(buffer);
      });
    };

    const imageFile = formData.get("image") as File;
    let mainImageUrl = oldProduct.imageUrl; 
    if (imageFile && imageFile.size > 0) {
      const newUrl = await uploadToCloudinary(imageFile);
      if (newUrl) mainImageUrl = newUrl;
    }

    const updateMultipleFiles = async (fieldName: string, oldData: string | null): Promise<string | null> => {
      const files = formData.getAll(fieldName);
      const hasNewFiles = files.some(file => file instanceof File && file.size > 0);
      if (!hasNewFiles) return oldData;
      const urls: string[] = [];
      for (const file of files) {
        if (file instanceof File && file.size > 0) {
          try {
            const url = await uploadToCloudinary(file);
            if (url) urls.push(url);
          } catch (e) {}
        }
      }
      return urls.length > 0 ? JSON.stringify(urls) : oldData;
    };

    const galleryString = await updateMultipleFiles("gallery", oldProduct.images);
    const reviewImages1String = await updateMultipleFiles("reviewImages1", oldProduct.reviewImages1);
    const reviewImages2String = await updateMultipleFiles("reviewImages2", oldProduct.reviewImages2);

    await db.product.update({
      where: { id: id },
      data: {
        name: name,
        price: price,
        description: description || null,
        imageUrl: mainImageUrl,
        images: galleryString || "[]", 
        hookTitle: hookTitle || null,
        hookSubtitle: hookSubtitle || null,
        hookDesc: hookDesc || null,
        hadithText: hadithText || null,
        packagesData: packagesData || null,
        reviewImages1: reviewImages1String || null,
        reviewImages2: reviewImages2String || null,
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}