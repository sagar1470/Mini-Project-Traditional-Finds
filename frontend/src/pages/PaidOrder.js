import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'


const PaidOrder = () => {
  const [data, setData] = useState([])

  const fetchOrderDetail = async()=>{
    const response = await fetch(SummaryApi.order.url, {
      method : SummaryApi.order.method, 
      credentials: "include",
      headers : {
        'Content-Type' : 'application'
  }
    })
    const responseData = await response.json()
    setData(responseData.data)
    // console.log("responseData", responseData)
  }

  useEffect(()=>{
    fetchOrderDetail()
   },[])


  return (
    <div className='h-[calc(100vh-100px)] overflow-y-auto z-10 bg-slate-300 mt-20'>
    {!data[0] && (
      <div className='flex flex-col items-center justify-center h-full space-y-4'>
        <div className='w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className='text-2xl font-semibold text-gray-800'>No Orders Found</h3>
        <p className='text-gray-600'>Your order history will appear here once you make purchases</p>
      </div>
    )}
  
    <div className='space-y-6'>
      {data.map((item, index) => (
        <div key={item.userId + index} className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-10'>
          {/* Order Header */}
          <div className='bg-sky-100 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
            <div className='flex items-center gap-4'>
              <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
                Order #{index + 1}
              </span>
              <p className='text-gray-600 font-medium'>{item.email}</p>
            </div>
            <p className='text-sm text-gray-500 font-medium'>
              <svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5 mr-2 -mt-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {moment(item.createdAt).format('LL')}
            </p>
          </div>
  
          {/* Order Body */}
          <div className='p-6 grid lg:grid-cols-3 gap-8'>
            {/* Product List */}
            <div className='lg:col-span-2 space-y-4 '>
              {item?.productDetails.map((product, index) => (
                <div key={product.productId + index} className='flex gap-4 p-4 bg-gray-50  rounded-lg'>
                  <img
                    src={product.image[0]}
                    className='w-20 h-20 object-contain bg-white p-2 rounded border border-gray-200'
                    alt={product.name}
                  />
                  <div className='flex-1'>
                    <h3 className='font-semibold text-gray-800 truncate'>{product.name}</h3>
                    <div className='flex items-center gap-4 mt-2'>
                      <div className='text-lg font-medium text-blue-600'>
                        {displayINRCurrency(product.price)}
                      </div>
                      <div className='flex items-center gap-2 text-gray-600'>
                        <span className='bg-white px-2 py-1 rounded border'>Qty: {product.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Order Summary */}
            <div className='space-y-6'>
              {/* Payment Details */}
              <div className='p-4 bg-gray-50 rounded-lg border border-gray-200'>
                <h4 className='text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Payment Details
                </h4>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Method:</span>
                    <span className='font-medium text-gray-800 capitalize'>{item.paymentDetails.payment_method_type[0]}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Status:</span>
                    <span className={`font-medium ${
                      item.paymentDetails.payment_status === 'succeeded' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {item.paymentDetails.payment_status}
                    </span>
                  </div>
                </div>
              </div>
  
              {/* Shipping Details */}
              <div className='p-4 bg-gray-50 rounded-lg border border-gray-200'>
                <h4 className='text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                  Shipping Details
                </h4>
                <div className='space-y-2 text-sm'>
                  {item.shipping_options.map((shipping, index) => (
                    <div key={shipping.shipping_rate} className='flex justify-between'>
                      <span className='text-gray-600'>Shipping Rate:</span>
                      <span className='font-medium text-gray-800'>
                        {displayINRCurrency(shipping.shipping_amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Total Amount */}
              <div className='p-4 bg-blue-50 rounded-lg border border-blue-200'>
                <div className='flex justify-between items-center'>
                  <span className='font-semibold text-blue-800'>Total Amount:</span>
                  <span className='text-xl font-bold text-blue-800'>
                    {displayINRCurrency(item.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  )
}

export default PaidOrder