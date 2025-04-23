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

      <div className='bg-white p-4 rounded shadow h-[280px] flex flex-col justify-between'>
         <div className='w-48'>
            <div className='w-40 h-40 flex justify-center items-center'>
               <img src={data?.productImage[0]} className='object-fill mix-blend-multiply h-full mx-auto' alt={data?.productName} />
            </div>

            <h1 className='font-medium text-ellipsis line-clamp-2 mt-2'>
               {data?.productName}
            </h1>

            <div className='flex items-center justify-between mt-2'>
               <p className='font-semibold text-black'>
                  {displayNPRCurrency(data?.sellingPrice)}
               </p>
               <div
                  className='p-1 bg-green-100 rounded-full hover:text-white hover:bg-green-600 cursor-pointer'
                  onClick={() => setEditProduct(true)}
               >
                  <BiSolidEditAlt />
               </div>
            </div>

         </div>
         {
            editProduct && (
               <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
            )
         }

      </div>
   )
}

export default AdminProductCard