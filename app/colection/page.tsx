'use server'
import Header from '@/components/Header'
import Selections from '@/components/Selections'
import Footer from '@/components/Footer'
import { db } from '@/lib/db'
export default async function page() {

   const products = await db.product.findMany({
      orderBy:{
       createdAt:'desc',
      }
    })
  return (
    <div className='lg:w-full  w-[100%]  flex flex-col mt-50'>
       
          <Header/>
        
        <Selections products={products}/>
        <Footer/>
    </div>
  )
}



