import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct.js'
import displayNPRCurrency from '../helpers/displayCurrency.js'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart.js'
import { FiStar } from 'react-icons/fi'
import { BsCart } from 'react-icons/bs'

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingList = new Array(4).fill(null)
  const scrollElement = useRef()

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)
    setData(categoryProduct?.data)
  }

  useEffect(() => { fetchData() }, [])

  const scrollRight = () => scrollElement.current.scrollBy({ left: 300, behavior: 'smooth' })
  const scrollLeft = () => scrollElement.current.scrollBy({ left: -300, behavior: 'smooth' })

  return (
    <div className=' mx-auto relative group'>
      {/* Section Header */}
      <div className='flex justify-between items-end mb-8 px-4'>
        <div>
          <h2 className='text-3xl font-bold text-stone-800'>{heading}</h2>
          <div className='h-1 w-24 bg-amber-500 mt-2 rounded-full' />
        </div>
        <div className='hidden md:flex gap-4'>
          <button onClick={scrollLeft} className='p-2 rounded-full bg-white shadow-lg hover:shadow-xl text-stone-700 hover:text-amber-600 transition-all'>
            <FaAngleLeft className='text-2xl' />
          </button>
          <button onClick={scrollRight} className='p-2 rounded-full bg-white shadow-lg hover:shadow-xl text-stone-700 hover:text-amber-600 transition-all'>
            <FaAngleRight className='text-2xl' />
          </button>
        </div>
      </div>

      {/* Product Cards Container */}
      <div 
        ref={scrollElement}
        className='flex gap-6 overflow-x-auto scrollbar-none px-4 pb-4'
      >
        {loading ? (
          loadingList.map((_, index) => (
            <div key={index} className='min-w-[300px] bg-white rounded-2xl shadow-lg animate-pulse'>
              <div className='h-64 bg-gray-200 rounded-t-2xl' />
              <div className='p-6 space-y-4'>
                <div className='h-6 bg-gray-200 rounded-full w-3/4' />
                <div className='h-4 bg-gray-200 rounded-full w-1/2' />
                <div className='h-10 bg-gray-200 rounded-full' />
              </div>
            </div>
          ))
        ) : (
          data.map((product, index) => (
            <Link 
              key={product._id}
              to={`/product/${product._id}`}
              className='group min-w-[300px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden'
            >
              {/* Image Section */}
              <div className='relative h-64 overflow-hidden'>
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  loading='lazy'
                />
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/20 to-stone-900/60' />
                <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium text-stone-800 shadow-sm'>
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className='p-6 bg-gradient-to-b from-white via-gray-50 to-white/90'>
                <h3 className='text-xl font-bold text-stone-800 mb-2 line-clamp-2'>
                  {product.productName}
                </h3>

                {/* Rating */}
                <div className='flex items-center mb-4'>
                  <div className='flex text-amber-500'>
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className='w-4 h-4 fill-current' />
                    ))}
                  </div>
                  <span className='text-sm text-stone-500 ml-2'>(24 reviews)</span>
                </div>

                {/* Pricing */}
                <div className='flex justify-between items-center mb-6'>
                  <div>
                    <p className='text-2xl font-bold text-green-600'>
                      {displayNPRCurrency(product.sellingPrice)}
                    </p>
                    <p className='text-stone-400 line-through text-sm'>
                      {displayNPRCurrency(product.price)}
                    </p>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    addToCart(e, product._id)
                  }}
                  className='w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2'
                >
                  <BsCart className='text-lg' />
                  Add to Cart
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default VerticalCardProduct