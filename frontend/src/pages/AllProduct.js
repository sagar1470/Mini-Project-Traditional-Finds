import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct.js'
import SummaryApi from '../common/index.js'
import AdminProductCard from '../components/AdminProductCard.js'

const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () =>{
    const response = await fetch(SummaryApi.allProduct.url)
    
    const responseData = await response.json()
    console.log("response data", responseData)

    setAllProduct(responseData?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct();
  }, [])


  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-start'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border py-2 border-red-600 px-4 text-red-600 hover:bg-red-600 hover:text-white transition-all rounded-full' onClick={()=>{setOpenUploadProduct(true)}}>Upload Product</button>
      </div>


      {/* all product */}
      <div className='flex items-center flex-wrap gap-5 py-4 '>
         {
          allProduct.map((product, index)=>{
            return(
              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct}/>
              
            )
          })
         }
  
      </div>





    {/* upload product component */}
    {
      openUploadProduct && (
        <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchdata={fetchAllProduct}/>
      )
    }

    </div>
  )
}

export default AllProduct