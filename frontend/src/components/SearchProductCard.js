import React, { useContext, useEffect, useRef, useState } from 'react'
import displayNPRCurrency from '../helpers/displayCurrency.js'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart.js'
import { FiStar } from 'react-icons/fi'
import { BsCart } from 'react-icons/bs'
import Context from '../context/index.js'
import scrollTop from '../helpers/scrollTop.js'


const SearchProductCard = ({loading, data = []}) => {

    const loadingList = new Array(5).fill(null)


    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e, id)=>{
      await addToCart(e, id)
      await fetchUserAddToCart()
    }


  return (
    <div       
    className=' grid grid-cols-[repeat(auto-fit,minmax(300px,300px))] md:gap-6 overflow-x-scroll scrollbar-none mx-4 p-4 justify-between pt-0 pl-5 pb-4'
    >
    {loading ? (
      loadingList.map((product, index) => (
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
          to={"/product/"+product?._id}
          onClick={scrollTop}
          className='group min-w-[300px] bg-white mt-4 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden'
        >
          {/* Image Section */}
          <div className='relative h-64 flex justify-center overflow-hidden'>
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
                 handleAddToCart(e, product?._id)
              }}
              className='w-full bg-amber-600  hover:bg-amber-700 text-white py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2'
            >
              <BsCart className='text-lg' />
              Add to Cart
            </button>
           
          </div>
        </Link>
      ))
    )}
  </div>
  )
}

export default SearchProductCard