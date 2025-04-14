import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setLoading] = useState(false)

  const categoryLoading = new Array(13).fill(null)

  const fetchCategoryProduct = async () => {
    const response = await fetch(SummaryApi.categoryProduct.url)
    const dataResponse = await response.json()
    setLoading(false)
    setCategoryProduct(dataResponse.data)

  }

  useEffect(() => {
    fetchCategoryProduct();
  }, [])

  return (
    <div className='container mx-auto'>
      <div className="relative md:left-[-2rem] lg:left-[-3rem] sm:left-[-4rem] sm:w-[calc(100%+r3em)] md:w-[calc(100%+5rem)] lg:w-[calc(100%+7rem)] pl-3">
        {/* <div className='flex items-center p-4 gap-4 justify-between overflow-scroll scrollbar-none'> */}
        <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 py-2 scrollbar-none">
          {
            loading ? (
              categoryLoading.map((el, index) => (
                <div
                  key={index}
                  className="w-16 h-16 md:w-20  md:h-20 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
              ))
            ) :
              (
                categoryProduct.map((product, index) => {
                  return (
                    <Link key={product.category}
                      to={`/product-category/${product.category}`}
                      className="flex-shrink-0 space-y-2 mr-9 " >

                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 hover:bg-gray-200 rounded-full overflow-hidden flex items-center justify-center shadow-sm transition ">

                        <img src={product?.productImage?.[0]}
                          alt={product?.category || "Category"}
                          className="h-full w-full object-cover hover:scale-110 transition-transform mix-blend-multiply duration-300"/>
                      </div>

                      <p className="text-sm md:text-base font-medium text-center capitalize">
                        {product?.category}
                      </p>
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
export default CategoryList
