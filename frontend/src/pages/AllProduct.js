import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct.js'

const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-start'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border py-2 border-red-600 px-4 text-red-600 hover:bg-red-600 hover:text-white transition-all rounded-full' onClick={()=>{setOpenUploadProduct(true)}}>Upload Product</button>
      </div>

    {/* upload product component */}
    {
      openUploadProduct && (
        <UploadProduct onClose={()=>setOpenUploadProduct(false)}/>
      )
    }

    </div>
  )
}

export default AllProduct