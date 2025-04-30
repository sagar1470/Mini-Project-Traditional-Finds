import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct.js'
import SummaryApi from '../common/index.js'
import AdminProductCard from '../components/AdminProductCard.js'

const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)

    const responseData = await response.json()
    console.log("response data", responseData)

    setAllProduct(responseData?.data || [])
  }

  useEffect(() => {
    fetchAllProduct();
  }, [])


  return (
    <div>
      {/* <div className='bg-white py-2 px-4 flex justify-between items-start'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border py-2 border-red-600 px-4 text-red-600 hover:bg-red-600 hover:text-white transition-all rounded-full' onClick={() => { setOpenUploadProduct(true) }}>Upload Product</button>
      </div> */}

      <div className=' py-4 px-6 flex justify-between items-center rounded-3xl shadow-md'>
        <h2 className='font-semibold text-2xl text-gray-800'>All Products</h2>

        <button
          onClick={() => setOpenUploadProduct(true)}
          className='bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-700 transition-all ease-in-out hover:scale-110 duration-300 text-white px-6 py-2 rounded-full shadow-lg font-medium'
        >
          Upload Product
        </button>
      </div>



      {/* all product */}
      {/* <div className='flex items-center flex-wrap gap-5 py-4 '>
         {
          allProduct.map((product, index)=>{
            return(
              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct}/>
              
            )
          })
         }
  
      </div> */}
      <div className=" mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:gap-4 md:gap-6">
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />

            )
          })
        }
      </div>


      {/* upload product component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchdata={fetchAllProduct} />
        )
      }

    </div>
  )
}

export default AllProduct