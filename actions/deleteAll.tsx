'use server'
import {db} from "@/lib/db";

export default async function deleteOrders(formData: FormData) {

    
     
        await db.order.deleteMany({
        where:{orderItems: formData.get("orderItems") as string}
    })
    
}