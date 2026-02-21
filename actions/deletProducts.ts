'use server'
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";

export  async function deleteProducts(formData : FormData) {

    const productId = formData.get("id") as string;

    await db.product.delete({
        where:{
            id: productId,
        }
    })
    revalidatePath("/dashboard/products")
}