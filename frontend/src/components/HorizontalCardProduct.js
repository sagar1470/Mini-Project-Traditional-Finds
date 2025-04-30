import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct.js'
import displayNPRCurrency from '../helpers/displayCurrency.js'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart.js'

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingList = new Array(13).fill(null)

  const [scroll, setScroll] = useState(0)
  const scrollElement = useRef()

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)

    setData(categoryProduct?.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300
  }
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }


  return (
    <div className='min-w-full mx-auto my-6 relative'>
      <div>
   
        {/* <h2 className='text-2xl font-semibold py-4'>{heading}</h2> */}
        <h2 className='text-2xl font-semibold py-4 bg-gradient-to-r from-red-600 to-red-400 text-transparent bg-clip-text relative group'>
          {heading}
          <span className='absolute bottom-3 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full'></span>
        </h2>


        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement} >

          <button className='bg-white z-10 shadow-md rounded-full p-1 absolute hidden md:block left-0 text-lg' onClick={scrollLeft}><FaAngleLeft /></button>
          <button className='bg-white z-10 shadow-md rounded-full p-1 absolute hidden md:block  right-0 text-lg' onClick={scrollRight}><FaAngleRight /></button>
          {loading ? (
            loadingList.map((product, index) => {
              return (
                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                  <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                  </div>
                  <div className='p-4 grid w-full gap-2'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                    <div className='flex gap-3 w-full'>
                      <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                      <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                    </div>
                    <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                  </div>
                </div>
              )
            })
          ) : (

            data.map((product, index) => {
              return (
                // <Link to={"product/"+product?._id} className='w-full min-w-[280px] max-w-[280px] md:min-w-[320px] h-36 bg-white rounded-sm shadow-sm flex'>
                //   <div className='bg-slate-300 h-full min-w-[120px] md:min-w-[145px]'>
                //     <img src={product.productImage[0]} alt='' className='h-full min-w-full object-cover mix-blend-multiply hover:scale-105 transition-all' />
                //   </div>

                //   <div className='p-2 md:grid md:p-4 grid'>
                //     <h2 className='font-medium text-base text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                //     <p className='capitalize text-slate-500'>{product.category}</p>

                //     <div className='flex gap-3 text-base sm:text-sm'>
                //       <p className='text-red-600 font-medium '>{displayNPRCurrency(product?.sellingPrice)}</p>
                //       <p className='text-slate-500 line-through'>{displayNPRCurrency(product?.price)}</p>
                //     </div>

                //     <button className='bg-red-600 text-sm hover:bg-red-700 text-white px-3 py-0.5 rounded-full 'onClick={(e)=>{addToCart(e, product?._id)}}>
                //       Add to Cart
                //     </button>

                //   </div>
                // </Link>


                <Link
                  key={product._id || index}
                  to={"product/" + product?._id}
                  className='min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] h-36 flex bg-gradient-to-br from-rose-800/60 via-sky-200 to-rose-800/60 border border-gray-200 rounded-xl shadow-md overflow-hidden flex-shrink-0 transition-transform hover:-translate-y-1 hover:shadow-lg'
                >
                  {/* Image Section with Border */}
                  <div className='h-full w-1/2 overflow-hidden border-r-2 border-gray-300 '>
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className='w-full h-full object-cover transition-transform duration-300 hover:scale-110 '
                    />
                  </div>

                  {/* Text Section with Stronger Gradient and Padding */}
                  <div className='flex flex-col justify-between p-4 w-1/2 bg-gradient-to-t from-white/90 via-white/90 to-transparent'>
                    {/* Product Name and Category */}
                    <div>
                      <h2 className='text-base md:text-lg font-semibold text-gray-800 line-clamp-2'>
                        {product?.productName}
                      </h2>
                      <p className='text-xs text-gray-500 capitalize'>{product.category}</p>
                    </div>

                    {/* Price Section */}
                    <div className='flex justify-between items-center text-sm'>
                      <p className='text-green-600 font-semibold'>{displayNPRCurrency(product?.sellingPrice)}</p>
                      <p className='text-gray-400 line-through'>{displayNPRCurrency(product?.price)}</p>
                    </div>

                    {/* Add to Cart Button with Orange Color */}
                    <button
                      className='mt-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-medium px-4 py-1 rounded-full transition-all'
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(e, product?._id)
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>


              )
            })
          )
          }


        </div>
      </div>
    </div>
  )
}

export default HorizontalCardProduct