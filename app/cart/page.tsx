import React from 'react'
import Header from '@/components/Header'
import Cart from '@/components/Cart'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className='lg:w-full  w-[100%] flex flex-col'>
      <Header/>
      <Cart/>
      <Footer/>
    </div>
  )
}

export default page
