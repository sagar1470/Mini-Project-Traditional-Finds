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

      <div className='bg-white p-4 rounded'>
         <div className='w-40 '>
            <img src={data?.productImage[0]} width={100} height={100} className='w-fit mx-auto' alt='' />
            <h1>{data.productName}</h1>

            <div>
               <div className='font-semibold'>
                  {
                     displayNPRCurrency(data.sellingPrice)
                  }
               </div>



               <div className='w-fit ml-auto p-1 bg-green-100 rounded-full hover:text-white hover:bg-green-600 cursor-pointer right-0 bottom-0' onClick={() => setEditProduct(true)}>
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