import React from 'react'
import Header from '@/components/Header'
import ProductInfo from '@/components/ProductInfo'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className='lg:w-full  w-[100%] flex flex-col'>
       <div className='px-5'>
        <Header/>
      </div>
      <ProductInfo/>
      <Footer/>
    </div>
  )
}

export default page
