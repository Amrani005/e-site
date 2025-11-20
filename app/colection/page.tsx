import React from 'react'
import Header from '@/components/Header'
import Selections from '@/components/Selections'
import Footer from '@/components/Footer'
import { div } from 'motion/react-client'

const page = () => {
  return (
    <div className='lg:w-full  w-[100%]  flex flex-col mt-50'>
       
          <Header/>
        
        <Selections/>
        <Footer/>
    </div>
  )
}

export default page

