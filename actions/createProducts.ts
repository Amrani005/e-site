"use server"

import {db} from "@/lib/db";
import { revalidatePath } from "next/cache";
import {redirect} from "next/navigation";
import {writeFile} from "fs/promises";
import {join} from "path";

export async function createProducts(formData: FormData) {

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string


    const imageFile = formData.get("image") as File;

    let mainImageUrl = "";
    // if the usezr uplad a photo
    if(imageFile && imageFile.size > 0){
        //transform the file to a Buffer to be able to save it
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const originalName = imageFile.name.replace(/\s/g, "_");
        
        //chane the name of the file by addin a time and date to it as well
        const uniqueName = `${Date.now()}-${originalName}`;;
        
        //determinate the place that wee will save the file in
        const filepath = join(process.cwd(), "public/uploads", uniqueName);
        
        await writeFile(filepath, buffer);

        //thats the link that we will save in the database to be able to show the image later
        mainImageUrl = `uploads/${uniqueName}`;

    
    // سنضع الروابط هنا
    

    // نمر على كل ملف واحد تلو الآخر ونحفظه
    
    }
        const galleryFiles = formData.getAll("gallery") as File[];
        let images: string[] = [];
    for (const file of galleryFiles) {
        if (file.size > 0) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            // اسم فريد لكل صورة
            const cleanName = file.name.replace(/\s/g, "_");
            // نضيف رقم عشوائي لضمان عدم تشابه الأسماء في المعرض
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1000)}-${cleanName}`;
            
            const path = join(process.cwd(), "public/uploads", uniqueName);
            await writeFile(path, buffer);
            
            // نضيف الرابط للقائمة
            images.push(`/uploads/${uniqueName}`);
        }
     }
     const galleryString= JSON.stringify(images)
    await db.product.create({
        data:{
            name:name,
            price: price,
           description: description,
           imageUrl:mainImageUrl,
           images: galleryString
                      

           
        }
    })

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
}
