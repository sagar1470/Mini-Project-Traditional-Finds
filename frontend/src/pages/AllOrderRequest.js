import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'

const AllOrderRequest = () => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.AllUserOrderRequest.url, {
        method: SummaryApi.AllUserOrderRequest.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        }
      })

      const dataResponse = await response.json()
      if (dataResponse.success) {
        setData(dataResponse.data)
      } else {
        toast.error(dataResponse.message)
      }
    } catch (error) {
      toast.error("Failed to fetch orders")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-blue-900">Order Management</h1>
        <div className="flex items-center gap-4">
          <span className="px-4 py-2 bg-white rounded-lg shadow-sm text-blue-700">
            Total Orders: {data.length}
          </span>
        </div>
      </div>
  
      <div className="space-y-6">
        {data.map((order) => (
          <div key={order._id} className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
            {/* Order Header */}
            <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-800 px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-white">
                <div className="space-y-1">
                  <label className="text-sm font-medium opacity-90">Customer</label>
                  <p className="font-semibold text-lg">{order.BuyerName}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium opacity-90">Order Date</label>
                  <p className="font-medium">{moment(order.createdAt).format('LLL')}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium opacity-90">Total Amount</label>
                  <p className="text-xl font-bold">{displayINRCurrency(order.TotalPrice)}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium opacity-90">Status</label>
                  <span className="inline-block px-3 py-1 rounded-full bg-white ml-1 bg-opacity-5 backdrop-blur-sm">
                    Processing
                  </span>
                </div>
              </div>
            </div>
  
            {/* Order Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Customer Info */}
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Customer Information
                    </h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm text-blue-600">Email</dt>
                        <dd className="text-blue-900 font-medium">{order.BuyerEmail}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-blue-600">Phone</dt>
                        <dd className="text-blue-900 font-medium">{order.phone_no}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-blue-600">Shipping Address</dt>
                        <dd className="text-blue-900 font-medium">{order.address}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
  
                {/* Products */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Order Items ({order.orderQty})
                  </h3>
                  <div className="space-y-4">
                    {order.orderDetails.map((product) => (
                      <div key={product._id} className="flex items-start border border-blue-100 rounded-xl p-4 bg-white hover:border-blue-200 transition-colors">
                        <img
                          src={product.productId.productImage[0]}
                          alt={product.productId.productName}
                          className="w-24 h-24 object-contain bg-white rounded-lg border p-2 shadow-sm"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-semibold text-blue-900">{product.productId.productName}</h4>
                              <p className="text-sm text-blue-600">{product.productId.sellerName}</p>
                              <p className="text-sm text-blue-500 mt-1">
                                <span className="font-medium">Sold by:</span> {product.productId.shopName}
                              </p>
                            </div>
                            <p className="text-xl font-bold text-blue-600">
                              {displayINRCurrency(product.productId.sellingPrice)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-sm text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                              Qty: {product.quantity}
                            </span>
                            <div className="text-sm font-semibold text-blue-900">
                              Line Total: {displayINRCurrency(product.productId.sellingPrice * product.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default AllOrderRequest