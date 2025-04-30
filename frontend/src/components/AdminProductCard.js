import React, { useState } from 'react'
import { BiSolidEditAlt } from "react-icons/bi"
import AdminEditProduct from './AdminEditProduct.js'
import displayNPRCurrency from '../helpers/displayCurrency.js'

const AdminProductCard = ({
   data,
   fetchdata,
}) => {
   const [editProduct, setEditProduct] = useState(false)

   return (

      // <div className='bg-white p-4 rounded shadow h-[280px] flex flex-col justify-between'>
      //    <div className='w-48'>
      //       <div className='w-40 h-40 flex justify-center items-center'>
      //          <img src={data?.productImage[0]} className='object-fill mix-blend-multiply h-full mx-auto' alt={data?.productName} />
      //       </div>

      //       <h1 className='font-medium text-ellipsis line-clamp-2 mt-2'>
      //          {data?.productName}
      //       </h1>

      //       <div className='flex items-center justify-between mt-2'>
      //          <p className='font-semibold text-black'>
      //             {displayNPRCurrency(data?.sellingPrice)}
      //          </p>
      //          <div
      //             className='p-1 bg-green-100 rounded-full hover:text-white hover:bg-green-600 cursor-pointer'
      //             onClick={() => setEditProduct(true)}
      //          >
      //             <BiSolidEditAlt />
      //          </div>
      //       </div>

      //    </div>
      //    {
      //       editProduct && (
      //          <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
      //       )
      //    }

      // </div>


      <div className='bg-slate-200 p-4 rounded-lg shadow-md hover:shadow-lg border border-gray-200 hover:border-blue-500 transition-all duration-300 h-[360px] flex flex-col justify-between relative group'>
         <div className='w-full'>
            {/* Image Container */}
            <div className='w-48 h-48 bg-gray-100 rounded-lg flex justify-center items-center mx-auto p-4 relative overflow-hidden'>
               <img
                  src={data?.productImage[0]}
                  className='lg:object-cover  object-contain h-full lg:w-full group-hover:scale-105 mx-auto mix-blend-multiply transition-transform duration-300'
                  alt={data?.productName}
               />

               {/* Hover Actions */}
               <div className='absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div
                     className='p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-blue-500 hover:text-white cursor-pointer'
                     onClick={() => setEditProduct(true)}
                  >
                     <BiSolidEditAlt className="text-lg" />
                  </div>
               </div>
            </div>

            {/* Product Info */}
            <div className='mt-4 space-y-2'>
               <h1 className='font-semibold text-gray-800 text-ellipsis line-clamp-2 min-h-[48px]'>
                  {data?.productName}
               </h1>

               {/* Price Section */}
               <div className='flex items-center justify-between'>
                  <div>
                     <span className='text-sm text-gray-500'>Price:</span>
                     <p className='font-bold text-xl text-red-600'>
                        {displayNPRCurrency(data?.sellingPrice)}
                     </p>
                  </div>

                  {/* MOQ Badge */}
                  <div className='bg-gray-100 px-3 py-1 rounded-full text-sm'>
                     MOQ: {data?.moq || '1 pc'}
                  </div>
               </div>
            </div>
         </div>

         {/* Edit Modal */}
         {editProduct && (
            <AdminEditProduct
               productData={data}
               onClose={() => setEditProduct(false)}
               fetchdata={fetchdata}
            />
         )}
      </div>
   )
}

export default AdminProductCard