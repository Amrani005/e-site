"use server";

import { db } from "@/lib/db";
// 👇 غيرنا هذا السطر من sheets إلى baserow
import { saveToBaserow } from "@/lib/baserow"; 
import { redirect } from "next/navigation";

// 1. وظيفة لجلب بيانات المنتج
export async function getProductById(id: string) {
  if (!id) return null;
  const product = await db.product.findUnique({
    where: { id: id },
  });
  return product;
}

// 2. حفظ المسودة (Draft)
export async function saveDraftOrder(data: any) {
   const orderItems = JSON.stringify({
     productId : data.productId,
     quantity: data.quantity,
     price: data.price,
     wilya : data.wilaya, 
     deliveryType: data.deliveryType,
     size: data.size || "Standard"
   });
   
   const fullAdress = `${data.adress} - ولاية: ${data.wilaya} (${data.deliveryType})`

   let resultDraftId = null;

   if(data.draftId){
    await db.order.update({
      where : {id : data.draftId},
      data:{
        customerName: data.name,
        customerPhone: data.phone,
        customerAddress: fullAdress,
        totalPrice: Number(data.total),
        status: "draft", 
        orderItems: orderItems, 
      }
    })
    resultDraftId = data.draftId;
   } else {
    const newDraft = await db.order.create({
      data:{
         customerName: data.name,
        customerPhone: data.phone,
        customerAddress: fullAdress,
        totalPrice: Number(data.total),
        status: "draft", 
        orderItems: orderItems, 
      }
    })
    resultDraftId = newDraft.id;

    // 👇 هنا  التغييرلـ Baserow
    // نرسل فقط إذا كان هناك رقم هاتف
    if (data.phone) {
        const baserowData = {
            "Name": data.name || "بدون اسم",
            "Phone": data.phone,
            "Wilaya": data.wilaya,
            "Address": fullAdress,     // العنوان الكامل
            "Product": data.productName || "منتج",
            "Price": data.total?.toString() || "0",
            "Delivery": "غير محدد",
            "Status": "مسودة (Draft)", // حالة الطلب
            "Date": new Date().toLocaleString('ar-DZ')
        };
        // إرسال البيانات
        saveToBaserow(baserowData);
    }
   }
   
   return {draftId : resultDraftId}
}

// 3. حفظ الطلب النهائي (Place Order)
export async function placeOrder(data: any) {
  const orderDetail = JSON.stringify({
    productId : data.productId,
    quantity: data.quantity,
    price: data.price,
    wilya : data.wilaya,
    deliveryType: data.deliveryType,
    size: data.size || "Standard"
  });

  const fullAdress = `${data.adress} - ولاية: ${data.wilaya} (${data.deliveryType})`;

  const newOrder = await db.order.create({
    data: {
      customerName: data.name,
      customerPhone: data.phone,
      customerAddress: fullAdress,
      totalPrice: Number(data.total),
      status: "pending", 
      orderItems: orderDetail,
    },
  });

  if (newOrder) {
     // 👇 تجهيز البيانات لـ Baserow
     // ملاحظة: المفاتيح (Name, Phone...) يجب أن تطابق أعمدة Baserow بالحرف
     const baserowData = {
        "Name": data.name,
        "Phone": data.phone,
        "Wilaya": data.wilaya,
        "Address": fullAdress,
        "Product": data.productName || "منتج",
        "Price": data.total.toString(),
        "Delivery": data.deliveryType,
        "Status": "طلب جديد (New)", // حالة الطلب
        "Date": new Date().toLocaleString('ar-DZ')
     };

     // إرسال البيانات
     saveToBaserow(baserowData); 
  }

  return { success: true, orderId: newOrder.id };
}

export async function deletDraft(formData: FormData){
  const draftId = formData.get("draftId") as string;
   await db.order.deleteMany({
    where:{
      id:draftId
    }
   })
}

