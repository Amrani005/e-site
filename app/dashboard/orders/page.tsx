
import { db } from '@/lib/db'
import OrdersList from '@/components/OrdersList';

export default async function OrdersPage ()  {

     
     const orders = await db.order.findMany({
      where:{
        NOT:{status: 'draft'}
      },
        orderBy:{
            createdAt: 'desc'
        }
     })
  return(
    <div>
      <OrdersList 
        orders={orders} />
    </div>
  );
}

