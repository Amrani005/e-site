'use server'
import {db} from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function deleteOrders(formData: FormData) {

    const orderId= formData.get("id") as string;
     
        await db.order.deleteMany({
        where:{
            id:orderId
        }
    })
    revalidatePath("/dashboard/orders");
  revalidatePath("/dashboard/draft");
    
}