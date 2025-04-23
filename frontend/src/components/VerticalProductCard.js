import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct.js'
import displayNPRCurrency from '../helpers/displayCurrency.js'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart.js'

const VerticalCardProduct = ({ category, heading }) => {
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

  const scrollRight = ()=>{
         scrollElement.current.scrollLeft += 300
  }
  const scrollLeft = ()=>{
         scrollElement.current.scrollLeft -= 300
  }


  return (
    <div className='container mx-auto my-6 relative'>
      <div className="  relative md:left-[0rem] lg:left-[-3rem] sm:left-[-4rem] sm:w-[calc(100%+3rem)] md:w-[calc(100%+5rem)] lg:w-[calc(100%+7rem)]">

        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>


        <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement} >

          <button className='bg-white z-10 shadow-md rounded-full p-1 absolute hidden md:block left-0 text-lg' onClick={scrollLeft}><FaAngleLeft /></button>
          <button className='bg-white z-10 shadow-md rounded-full p-1 absolute hidden md:block  right-0 text-lg' onClick={scrollRight}><FaAngleRight /></button>
          {
            loading ? (
              loadingList.map((product,index)=>{
                return(
                    <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                        <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                        </div>
                        <div className='p-4 grid gap-3'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                            <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                            </div>
                            <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                        </div>
                    </div>
                )
            })
            ):(
                data.map((product, index) => {
                return (
                  <Link to={"product/"+product?._id} className='w-full min-w-[280px] max-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow-sm'>
                    <div className='bg-slate-300 h-52 min-w-[280px] md:min-w-[145px] flex justify-center items-center overflow-hidden'>
                      <img src={product.productImage[0]} alt='' className='h-full min-w-full object-scale-down mix-blend-multiply hover:scale-105 transition-all' />
                    </div>
  
                    <div className='p-2 md:grid md:p-4 grid gap-3'>
                      <h2 className='font-medium text-base text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                      <p className='capitalize text-slate-500'>{product.category}</p>
  
                      <div className='flex gap-3 text-base sm:text-sm'>
                        <p className='text-red-600 font-medium '>{displayNPRCurrency(product?.sellingPrice)}</p>
                        <p className='text-slate-500 line-through'>{displayNPRCurrency(product?.price)}</p>
                      </div>
  
                      <button className='bg-red-600 text-sm hover:bg-red-700 text-white px-3 py-0.5 rounded-full ' onClick={(e)=>{addToCart(e, product?._id)}}>
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
export default VerticalCardProduct