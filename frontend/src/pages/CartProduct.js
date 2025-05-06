








import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import { MdDelete } from "react-icons/md"
import displayINRCurrency from '../helpers/displayCurrency'
import { loadStripe } from '@stripe/stripe-js'
import PlaceOrder from '../components/PlaceOrder'

const CartProduct = ({ onClose }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const context = useContext(Context)
  const loadingCart = new Array(context.cartProductCount).fill(null)

  const [openPlaceOrder, setOpenPlaceOrder] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQty, setTotalQty] = useState(0)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [confirmedDetails, setConfirmedDetails] = useState({
    qty: 0,
    price: 0
  })

  const fetchData = async () => {
    const response = await fetch(SummaryApi.DisplayingAddedCartProduct.url, {
      method: SummaryApi.DisplayingAddedCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
    })

    const responseData = await response.json()
    if (responseData.success) {
      setData(responseData.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Calculate totals whenever data changes
  useEffect(() => {
    const newTotalQty = data.reduce((prev, curr) => prev + curr.quantity, 0)
    const newTotalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0)
    setTotalQty(newTotalQty)
    setTotalPrice(newTotalPrice)
  }, [data])

  // Reset order if cart changes after placement
  useEffect(() => {
    if (orderPlaced && (totalQty !== confirmedDetails.qty || totalPrice !== confirmedDetails.price)) {
      setOrderPlaced(false)
    }
  }, [totalQty, totalPrice, orderPlaced, confirmedDetails])

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.UpdateCartProduct.url, {
      method: SummaryApi.UpdateCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1
      })
    })
    const responseData = await response.json()
    if (responseData.success) {
      fetchData()
    }
  }

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.UpdateCartProduct.url, {
        method: SummaryApi.UpdateCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1
        })
      })
      const responseData = await response.json()
      if (responseData.success) {
        fetchData()
      }
    }
  }

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.DeleteCartProduct.url, {
      method: SummaryApi.DeleteCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({
        _id: id,
      })
    })
    const responseData = await response.json()
    if (responseData.success) {
      fetchData()
      context.fetchUserAddToCart()
    }
  }

  const handlePayment = async () => {
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({
        cartItems: data
      })
    })

    const responseData = await response.json()
    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData?.id })

    }
  }

  const confirmOrder = () => {
    setConfirmedDetails({
      qty: totalQty,
      price: totalPrice
    })
    setOrderPlaced(true)
    setOpenPlaceOrder(false)
  }

  return (
    <div className='p-4 mt-14 lg:ml-48'>
      <div className='text-center text-lg my-3'>
        {data.length === 0 && !loading && (
          <p className='bg-white py-5'>No Data</p>
        )}
      </div>

      <div className='flex flex-col lg:flex-row gap-10 p-4'>
        {/* Product List */}
        <div className='w-full max-w-3xl space-y-4 p-4'>
          {loading ? (
            loadingCart?.map((el, index) => (
              <div
                key={el + "AddToCartLoading" + index}
                className='w-full h-32 bg-gradient-to-r from-gray-50 to-gray-100 animate-pulse rounded-lg shadow-sm'
              />
            ))
          ) : (
            data.map((product) => (
              <div
                key={product?._id}
                className='group relative w-full bg-white h-28 p-2 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'
              >
                <div className='flex gap-4 '>
                  {/* Product Image */}
                  <div className='w-24 h-24 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden flex items-center justify-center'>
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </div>

                  {/* Product Details */}
                  <div className='flex-1 flex flex-col justify-between'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <h2 className='text-lg font-semibold text-gray-900 line-clamp-1'>
                          {product?.productId?.productName}
                        </h2>
                        <p className='text-sm text-gray-500 capitalize'>
                          {product?.productId?.category}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteCartProduct(product?._id)}
                        className='text-gray-400 hover:text-red-600 transition-colors p-1 -mt-2 -mr-2'
                      >
                        <MdDelete className='w-5 h-5' />
                      </button>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-4'>
                        <p className='text-lg font-semibold text-red-600'>
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>

                        {/* Quantity Controls */}
                        <div className='flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1'>
                          <button
                            onClick={() => decraseQty(product?._id, product?.quantity)}
                            className='w-7 h-7 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:border-red-600 hover:text-red-600 transition-all'
                          >
                            -
                          </button>
                          <span className='w-6 text-center font-medium'>
                            {product?.quantity}
                          </span>
                          <button
                            onClick={() => increaseQty(product?._id, product?.quantity)}
                            className='w-7 h-7 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:border-red-600 hover:text-red-600 transition-all'
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <p className='text-lg font-bold text-gray-900'>
                        {displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        

      {/* Order Summary */}
      {data[0] && (
        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
          <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
            <h2 className='bg-red-700 text-white px-8 py-2 font-semibold text-lg'>Order Summary</h2>

            <div className='px-6 py-4 space-y-4'>
              <div className='flex justify-between items-center pb-2 border-b border-gray-200'>
                <span className='text-gray-600 font-medium'>Total Quantity:</span>
                <span className='text-gray-900 font-semibold'>{totalQty}</span>
              </div>

              <div className='flex justify-between items-center pb-2 border-b border-gray-200'>
                <span className='text-gray-600 font-medium'>Subtotal:</span>
                <span className='text-gray-900 font-semibold'>{displayINRCurrency(totalPrice)}</span>
              </div>

              <div className='pt-2'>
                {orderPlaced ? (
                  <button
                    className='w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white 
                              py-3 px-4 rounded-lg font-semibold shadow-md transition-all duration-200 transform hover:scale-[1.02]'
                    onClick={handlePayment}
                  >
                    Secure Checkout →
                  </button>
                ) : (
                  <button
                    className={`w-full py-2 px-6 rounded-lg font-semibold shadow-md transition-all duration-200 transform hover:scale-[1.02]
                                  ${confirmedDetails.qty > 0
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white'}`}
                    onClick={() => setOpenPlaceOrder(true)}
                  >
                    {confirmedDetails.qty > 0 ? 'Update & Re-Place Order' : 'Review & Place Order'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

      {
    openPlaceOrder && (
      <PlaceOrder
        onClose={() => setOpenPlaceOrder(false)}
        onConfirmOrder={confirmOrder}
        totalPrice={totalPrice}
        totalQty={totalQty}
      />
    )
  }
    </div >
  )
}

export default CartProduct