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

    if (!id) return { success: false };

    const oldProduct = await db.product.findUnique({
      where: { id: id },
    });

    if (!oldProduct) return { success: false };

    const uploadToCloudinary = async (file: File): Promise<string> => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "dzshop_products" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result!.secure_url);
            }
          }
        );
        uploadStream.end(buffer);
      });
    };

    const imageFile = formData.get("image") as File;
    let mainImageUrl = oldProduct.imageUrl;
    const hasNewMainImage = imageFile && imageFile.size > 0;

    if (hasNewMainImage) {
      mainImageUrl = await uploadToCloudinary(imageFile);
    }

    const galleryFiles = formData.getAll("gallery") as File[];
    let galleryString = oldProduct.images;
    const hasNewGallery = galleryFiles.some((file) => file.size > 0);

    if (hasNewGallery) {
      let images: string[] = [];
      for (const file of galleryFiles) {
        if (file.size > 0) {
          const url = await uploadToCloudinary(file);
          images.push(url);
        }
      }
      galleryString = JSON.stringify(images);
    }

    await db.product.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        price: price,
        description: description,
        imageUrl: mainImageUrl,
        images: galleryString,
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}